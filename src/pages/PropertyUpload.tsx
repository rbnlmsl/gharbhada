
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/context/AuthContext";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import PropertyForm from "@/components/PropertyForm";

const PropertyUpload = () => {
  const { user, userProfile, loading } = useAuth();
  const navigate = useNavigate();
  
  // Redirect if user is not logged in or isn't a landlord/agent
  useEffect(() => {
    if (!loading && (!user || (userProfile && userProfile.role !== 'landlord' && userProfile.role !== 'agent'))) {
      navigate('/auth');
    }
  }, [user, userProfile, loading, navigate]);

  if (loading) {
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

  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <Navbar />
      <div className="container mx-auto px-4 py-8 flex-grow">
        <div className="max-w-4xl mx-auto">
          <div className="bg-white p-6 md:p-8 rounded-xl shadow">
            <h1 className="text-2xl md:text-3xl font-bold text-gray-900 mb-6">List Your Property</h1>
            <p className="text-gray-600 mb-8">
              Fill out the form below to list your property. Fields marked with an asterisk (*) are required.
            </p>
            
            <PropertyForm />
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default PropertyUpload;
