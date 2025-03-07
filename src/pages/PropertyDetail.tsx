
import { useState, useEffect } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { Property } from "@/types";
import { ChevronRight, Home, Edit, Trash } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { useAuth } from "@/context/AuthContext";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import PropertyGallery from "@/components/PropertyGallery";
import PropertyInfo from "@/components/PropertyInfo";
import PropertyMap from "@/components/PropertyMap";
import PropertyContact from "@/components/PropertyContact";
import PropertyFeatures from "@/components/PropertyFeatures";

const PropertyDetail = () => {
  const { id } = useParams<{ id: string }>();
  const { toast } = useToast();
  const { user } = useAuth();
  const navigate = useNavigate();
  const [isOwner, setIsOwner] = useState(false);
  
  // Fetch property data from Supabase
  const { data: property, isLoading, error } = useQuery({
    queryKey: ['property', id],
    queryFn: async () => {
      try {
        // Try to fetch from Supabase first
        const { data, error } = await supabase
          .from('properties')
          .select('*')
          .eq('id', id)
          .single();
          
        if (error) {
          console.error("Supabase error:", error);
          throw new Error("Property not found");
        }
        
        // Format the data to match our Property type
        const propertyData: Property = {
          id: data.id,
          title: data.title,
          description: data.description,
          price: data.price,
          currency: data.currency,
          address: data.address,
          city: data.city,
          zipCode: data.zip_code,
          country: data.country,
          type: data.type,
          bedrooms: data.bedrooms,
          bathrooms: data.bathrooms,
          area: data.area,
          areaUnit: data.area_unit,
          features: data.features,
          images: data.images,
          agent: {
            id: data.agent_id,
            name: "Property Owner", // This should be fetched from profiles
            email: "contact@example.com", // This should be fetched from profiles
            phone: "+1234567890", // This should be fetched from profiles
          },
          published: data.published,
          createdAt: data.created_at,
          updatedAt: data.updated_at
        };
        
        return propertyData;
      } catch (e) {
        // If Supabase fetch fails, try to get from mock data
        // This fallback can be removed once all properties are in Supabase
        const { properties } = await import("@/lib/mockData");
        const prop = properties.find(p => p.id === id);
        if (!prop) {
          throw new Error("Property not found");
        }
        return prop;
      }
    },
  });

  // Check if current user is the owner of this property
  useEffect(() => {
    if (property && user && property.agent.id === user.id) {
      setIsOwner(true);
    } else {
      setIsOwner(false);
    }
  }, [property, user]);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [id]);

  const handleDelete = async () => {
    if (!window.confirm("Are you sure you want to delete this property?")) {
      return;
    }
    
    try {
      const { error } = await supabase
        .from('properties')
        .delete()
        .eq('id', id);
        
      if (error) throw error;
      
      toast({
        title: "Property deleted",
        description: "Your property has been successfully deleted.",
      });
      
      navigate('/properties');
    } catch (error: any) {
      toast({
        title: "Error",
        description: error.message || "Failed to delete property",
        variant: "destructive",
      });
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen flex flex-col bg-gray-50">
        <Navbar />
        <div className="container mx-auto px-4 py-8 flex-grow flex items-center justify-center">
          <div className="animate-pulse text-2xl text-gray-500">Loading property details...</div>
        </div>
        <Footer />
      </div>
    );
  }

  if (error || !property) {
    return (
      <div className="min-h-screen flex flex-col bg-gray-50">
        <Navbar />
        <div className="container mx-auto px-4 py-8 flex-grow">
          <div className="bg-white p-8 rounded-lg shadow-md text-center">
            <h1 className="text-2xl font-bold text-red-500 mb-4">Property Not Found</h1>
            <p className="text-gray-600 mb-6">
              We couldn't find the property you're looking for. It may have been removed or you might have followed an incorrect link.
            </p>
            <Button asChild>
              <Link to="/">Return to Homepage</Link>
            </Button>
          </div>
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <Navbar />
      
      <main className="flex-grow">
        <div className="container mx-auto px-4 py-4 md:py-8">
          {/* Breadcrumbs */}
          <nav className="flex items-center text-sm text-gray-500 mb-4">
            <Link to="/" className="flex items-center hover:text-brand-blue transition-colors">
              <Home size={16} className="mr-1" />
              Home
            </Link>
            <ChevronRight size={16} className="mx-2" />
            <Link to="/properties" className="hover:text-brand-blue transition-colors">Properties</Link>
            <ChevronRight size={16} className="mx-2" />
            <Link to={`/properties?location=${property.city}`} className="hover:text-brand-blue transition-colors">{property.city}</Link>
            <ChevronRight size={16} className="mx-2" />
            <span className="text-gray-800 font-medium truncate">{property.title}</span>
          </nav>
          
          {/* Property Title and Owner Actions */}
          <div className="mb-6 flex justify-between items-start">
            <div>
              <h1 className="text-2xl md:text-3xl font-bold text-gray-900">{property.title}</h1>
              <p className="text-gray-600 mt-1 flex items-center">
                <span>{property.address}, {property.city}, {property.zipCode}</span>
              </p>
            </div>
            {isOwner && (
              <div className="flex gap-2">
                <Button 
                  variant="outline" 
                  size="sm"
                  onClick={() => navigate(`/property/edit/${property.id}`)}
                >
                  <Edit size={16} className="mr-1" />
                  Edit
                </Button>
                <Button 
                  variant="destructive" 
                  size="sm"
                  onClick={handleDelete}
                >
                  <Trash size={16} className="mr-1" />
                  Delete
                </Button>
              </div>
            )}
          </div>
          
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div className="lg:col-span-2">
              {/* Property Gallery */}
              <PropertyGallery images={property.images} title={property.title} />
              
              {/* Property Info */}
              <div className="mt-6">
                <PropertyInfo property={property} />
              </div>
              
              {/* Property Features */}
              <div className="mt-6">
                <PropertyFeatures property={property} />
              </div>
              
              {/* Property Map */}
              <div className="mt-6">
                <PropertyMap property={property} />
              </div>
            </div>
            
            {/* Sidebar - Contact Info */}
            <div className="lg:col-span-1">
              <PropertyContact agent={property.agent} property={property} />
            </div>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default PropertyDetail;
