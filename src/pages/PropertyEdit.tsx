import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { supabase, typedPropertyQuery } from "@/integrations/supabase/client";
import { PropertyRow } from "@/types/property-types";
import { useAuth } from "@/context/AuthContext";
import { useToast } from "@/hooks/use-toast";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import PropertyForm from "@/components/PropertyForm";

const PropertyEdit = () => {
  const { id } = useParams<{ id: string }>();
  const { user, userProfile, loading: authLoading } = useAuth();
  const navigate = useNavigate();
  const { toast } = useToast();
  const [isAuthorized, setIsAuthorized] = useState(false);

  // Fetch property data
  const { data: property, isLoading, error } = useQuery({
    queryKey: ['property', id],
    queryFn: async () => {
      const { data, error } = await typedPropertyQuery()
        .select('*')
        .eq('id', id)
        .single();
        
      if (error) throw error;
      return data;
    },
    enabled: !!id && !!user,
  });

  // Check if user is authorized to edit this property
  useEffect(() => {
    if (!authLoading && !user) {
      // Not logged in
      navigate('/auth');
      return;
    }
    
    if (property && user) {
      if (property.agent_id === user.id) {
        setIsAuthorized(true);
      } else {
        toast({
          title: "Unauthorized",
          description: "You don't have permission to edit this property.",
          variant: "destructive",
        });
        navigate('/property/' + id);
      }
    }
  }, [property, user, authLoading, id, navigate, toast]);

  if (authLoading || isLoading) {
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

  if (error || !property) {
    return (
      <div className="min-h-screen flex flex-col bg-gray-50">
        <Navbar />
        <div className="container mx-auto px-4 py-8 flex-grow">
          <div className="bg-white p-8 rounded-lg shadow-md text-center">
            <h1 className="text-2xl font-bold text-red-500 mb-4">Property Not Found</h1>
            <p className="text-gray-600 mb-6">
              We couldn't find the property you're trying to edit.
            </p>
            <button 
              onClick={() => navigate('/')}
              className="px-4 py-2 bg-primary text-white rounded-md hover:bg-primary/90"
            >
              Return to Homepage
            </button>
          </div>
        </div>
        <Footer />
      </div>
    );
  }

  if (!isAuthorized) {
    return (
      <div className="min-h-screen flex flex-col bg-gray-50">
        <Navbar />
        <div className="container mx-auto px-4 py-8 flex-grow flex items-center justify-center">
          <div className="text-center">
            <p className="text-gray-500">Checking permissions...</p>
          </div>
        </div>
        <Footer />
      </div>
    );
  }

  // Convert database schema to component props
  const formattedProperty = property ? {
    ...property,
    zipCode: property.zip_code,
    areaUnit: property.area_unit,
  } : null;

  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <Navbar />
      <div className="container mx-auto px-4 py-8 flex-grow">
        <div className="max-w-4xl mx-auto">
          <div className="bg-white p-6 md:p-8 rounded-xl shadow">
            <h1 className="text-2xl md:text-3xl font-bold text-gray-900 mb-6">Edit Property</h1>
            <p className="text-gray-600 mb-8">
              Update your property information below.
            </p>
            
            <PropertyForm 
              editMode={true} 
              propertyId={id} 
              initialData={formattedProperty} 
            />
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default PropertyEdit;
