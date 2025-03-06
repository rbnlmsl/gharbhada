
import { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { Property } from "@/types";
import { ChevronRight, Home } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import PropertyGallery from "@/components/PropertyGallery";
import PropertyInfo from "@/components/PropertyInfo";
import PropertyMap from "@/components/PropertyMap";
import PropertyContact from "@/components/PropertyContact";
import PropertyFeatures from "@/components/PropertyFeatures";
import { properties } from "@/lib/mockData";

const PropertyDetail = () => {
  const { id } = useParams<{ id: string }>();
  const { toast } = useToast();
  
  // In a real app, this would fetch from an API
  const { data: property, isLoading, error } = useQuery({
    queryKey: ['property', id],
    queryFn: () => {
      // For demo purposes, we're using the mock data
      const prop = properties.find(p => p.id === id);
      if (!prop) {
        throw new Error("Property not found");
      }
      return prop;
    },
  });

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [id]);

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
            <Link to="/" className="hover:text-brand-blue transition-colors">Properties</Link>
            <ChevronRight size={16} className="mx-2" />
            <Link to="/" className="hover:text-brand-blue transition-colors">{property.city}</Link>
            <ChevronRight size={16} className="mx-2" />
            <span className="text-gray-800 font-medium truncate">{property.title}</span>
          </nav>
          
          {/* Property Title */}
          <div className="mb-6">
            <h1 className="text-2xl md:text-3xl font-bold text-gray-900">{property.title}</h1>
            <p className="text-gray-600 mt-1 flex items-center">
              <span>{property.address}, {property.city}, {property.zipCode}</span>
            </p>
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
