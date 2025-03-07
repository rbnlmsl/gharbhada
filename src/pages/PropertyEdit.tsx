
import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useAuth } from "@/context/AuthContext";
import { typedPropertyQuery } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import PropertyForm from "@/components/PropertyForm";

const PropertyEdit = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { user, userProfile, loading } = useAuth();
  const { toast } = useToast();
  const [property, setProperty] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchProperty = async () => {
      try {
        const { data, error } = await typedPropertyQuery()
          .select('*')
          .eq('id', id)
          .single();
        
        if (error) throw error;
        if (!data) throw new Error("Property not found");
        
        // Check if current user is the owner of the property
        if (user && data.agent_id !== user.id) {
          toast({
            title: "Unauthorized",
            description: "You don't have permission to edit this property.",
            variant: "destructive",
          });
          navigate(`/property/${id}`);
          return;
        }
        
        setProperty(data);
      } catch (error: any) {
        console.error("Error fetching property:", error);
        setError(error.message);
        toast({
          title: "Error",
          description: error.message,
          variant: "destructive",
        });
      } finally {
        setIsLoading(false);
      }
    };

    // Redirect if user is not logged in
    if (!loading) {
      if (!user) {
        toast({
          title: "Authentication Required",
          description: "You need to sign in to edit a property.",
          variant: "destructive",
        });
        navigate('/auth');
      } else if (userProfile && userProfile.role !== 'landlord' && userProfile.role !== 'agent') {
        toast({
          title: "Unauthorized",
          description: "Only landlords and agents can edit properties.",
          variant: "destructive",
        });
        navigate('/');
      } else if (id) {
        fetchProperty();
      }
    }
  }, [id, user, userProfile, loading, navigate, toast]);

  if (loading || isLoading) {
    return (
      <div className="min-h-screen flex flex-col bg-gray-50">
        <Navbar />
        <div className="container mx-auto px-4 py-8 flex-grow flex items-center justify-center">
          <div className="text-center">
            <div className="animate-spin h-8 w-8 border-4 border-primary border-t-transparent rounded-full inline-block mb-4"></div>
            <p className="text-gray-500">Loading...</p>
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

  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <Navbar />
      <div className="container mx-auto px-4 py-8 flex-grow">
        <div className="max-w-4xl mx-auto">
          <div className="bg-white p-6 md:p-8 rounded-xl shadow">
            <h1 className="text-2xl md:text-3xl font-bold text-gray-900 mb-6">Edit Property</h1>
            {property && (
              <PropertyForm 
                editMode={true}
                propertyId={id}
                initialData={{
                  title: property.title,
                  type: property.type,
                  address: property.address,
                  city: property.city,
                  zipCode: property.zip_code,
                  country: property.country,
                  description: property.description,
                  price: property.price.toString(),
                  currency: property.currency,
                  bedrooms: property.bedrooms.toString(),
                  bathrooms: property.bathrooms.toString(),
                  area: property.area.toString(),
                  areaUnit: property.area_unit,
                  features: property.features || [],
                  images: property.images || [],
                }}
              />
            )}
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default PropertyEdit;
