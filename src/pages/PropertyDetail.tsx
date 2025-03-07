import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useAuth } from "@/context/AuthContext";
import { useToast } from "@/hooks/use-toast";
import { typedPropertyQuery } from "@/integrations/supabase/client";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { MapPin, BedDouble, Bath, Move, Home, CheckCircle, XCircle, Edit, Trash2 } from "lucide-react";

const PropertyDetail = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { user } = useAuth();
  const { toast } = useToast();

  const [property, setProperty] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [isPropertyOwner, setIsPropertyOwner] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    const fetchProperty = async () => {
      try {
        setIsLoading(true);
        
        const { data: property, error } = await typedPropertyQuery()
          .select('*')
          .eq('id', id)
          .single();
        
        if (error) {
          throw error;
        }
        
        if (!property) {
          throw new Error("Property not found");
        }
        
        setProperty(property);
        setIsPropertyOwner(user?.id === property.agent_id);
      } catch (error: any) {
        console.error("Error fetching property:", error);
        setError(error.message);
      } finally {
        setIsLoading(false);
      }
    };

    if (id) {
      fetchProperty();
    }
  }, [id, user]);

  const handleDelete = async () => {
    try {
      setIsDeleting(true);
      
      const { error } = await typedPropertyQuery()
        .delete()
        .eq('id', id);
      
      if (error) throw error;
      
      toast({
        title: "Property deleted",
        description: "The property has been successfully deleted."
      });
      
      navigate('/properties');
    } catch (error: any) {
      console.error("Error deleting property:", error);
      toast({
        title: "Error deleting property",
        description: error.message,
        variant: "destructive"
      });
    } finally {
      setIsDeleting(false);
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen flex flex-col bg-gray-50">
        <Navbar />
        <div className="container mx-auto px-4 py-8 flex-grow flex items-center justify-center">
          <div className="text-center">
            <div className="animate-spin h-8 w-8 border-4 border-primary border-t-transparent rounded-full inline-block mb-4"></div>
            <p className="text-gray-500">Loading property details...</p>
          </div>
        </div>
        <Footer />
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex flex-col bg-gray-50">
        <Navbar />
        <div className="container mx-auto px-4 py-8 flex-grow">
          <div className="bg-white p-6 rounded-xl shadow-sm">
            <h1 className="text-2xl font-bold text-red-600 mb-4">Error</h1>
            <p className="text-gray-700">{error}</p>
            <button 
              onClick={() => navigate('/properties')}
              className="mt-4 px-4 py-2 bg-primary text-white rounded-md"
            >
              Go Back to Properties
            </button>
          </div>
        </div>
        <Footer />
      </div>
    );
  }

  if (!property) {
    return (
      <div className="min-h-screen flex flex-col bg-gray-50">
        <Navbar />
        <div className="container mx-auto px-4 py-8 flex-grow">
          <div className="bg-white p-6 rounded-xl shadow-sm">
            <h1 className="text-2xl font-bold text-gray-800 mb-4">Property Not Found</h1>
            <p className="text-gray-700">The requested property could not be found.</p>
            <button 
              onClick={() => navigate('/properties')}
              className="mt-4 px-4 py-2 bg-primary text-white rounded-md"
            >
              Go Back to Properties
            </button>
          </div>
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <Navbar />
      <div className="container mx-auto px-4 py-8 flex-grow">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Property Images */}
          <div>
            {property.images && property.images.length > 0 ? (
              <div className="relative">
                <img
                  src={property.images[0]}
                  alt={property.title}
                  className="w-full h-64 object-cover rounded-xl shadow-md"
                />
                {property.images.length > 1 && (
                  <div className="absolute top-2 right-2 bg-black bg-opacity-50 text-white rounded-full px-3 py-1 text-sm">
                    + {property.images.length - 1} more
                  </div>
                )}
              </div>
            ) : (
              <div className="bg-gray-200 h-64 rounded-xl flex items-center justify-center text-gray-500 shadow-md">
                No Image Available
              </div>
            )}
          </div>

          {/* Property Details */}
          <div className="space-y-4">
            <div className="flex justify-between items-center">
              <h1 className="text-2xl font-bold text-gray-900">{property.title}</h1>
              {property.published ? (
                <div className="flex items-center text-green-600">
                  <CheckCircle className="mr-1 w-5 h-5" />
                  Published
                </div>
              ) : (
                <div className="flex items-center text-red-600">
                  <XCircle className="mr-1 w-5 h-5" />
                  Unpublished
                </div>
              )}
            </div>
            
            <div className="text-gray-600 flex items-center">
              <MapPin className="mr-2 w-4 h-4" />
              {property.address}, {property.city}, {property.zip_code}, {property.country}
            </div>

            <div className="flex items-center space-x-4">
              <div className="flex items-center">
                <BedDouble className="mr-2 w-4 h-4" />
                {property.bedrooms} Bedrooms
              </div>
              <div className="flex items-center">
                <Bath className="mr-2 w-4 h-4" />
                {property.bathrooms} Bathrooms
              </div>
              <div className="flex items-center">
                <Move className="mr-2 w-4 h-4" />
                {property.area} {property.area_unit}
              </div>
            </div>

            <div className="text-gray-700">
              <h2 className="text-lg font-semibold mb-2">Description</h2>
              <p>{property.description}</p>
            </div>

            <div>
              <h2 className="text-lg font-semibold mb-2">Features</h2>
              {property.features && property.features.length > 0 ? (
                <ul className="list-disc list-inside text-gray-600">
                  {property.features.map((feature: string, index: number) => (
                    <li key={index}>{feature}</li>
                  ))}
                </ul>
              ) : (
                <p className="text-gray-500">No features listed.</p>
              )}
            </div>

            <div className="flex justify-between items-center">
              <div>
                <h2 className="text-xl font-bold text-gray-900">
                  {property.currency} {property.price}
                </h2>
                <p className="text-gray-500">Price</p>
              </div>
              
              {isPropertyOwner && (
                <div className="space-x-2">
                  <Button 
                    variant="outline"
                    size="sm"
                    onClick={() => navigate(`/property/edit/${id}`)}
                  >
                    <Edit className="mr-2 w-4 h-4" />
                    Edit
                  </Button>
                  <Button 
                    variant="destructive"
                    size="sm"
                    onClick={handleDelete}
                    disabled={isDeleting}
                  >
                    {isDeleting ? (
                      <>
                        <span className="animate-spin mr-2">●</span>
                        Deleting...
                      </>
                    ) : (
                      <>
                        <Trash2 className="mr-2 w-4 h-4" />
                        Delete
                      </>
                    )}
                  </Button>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default PropertyDetail;
