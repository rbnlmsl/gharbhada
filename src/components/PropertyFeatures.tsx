
import { useState } from "react";
import { Property } from "@/types";
import { cn } from "@/lib/utils";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { CheckCircle2 } from "lucide-react";

interface PropertyFeaturesProps {
  property: Property;
}

const PropertyFeatures = ({ property }: PropertyFeaturesProps) => {
  return (
    <div className="bg-white rounded-lg shadow-sm overflow-hidden">
      <Tabs defaultValue="overview" className="w-full">
        <div className="px-6 pt-6 border-b">
          <TabsList className="grid w-full grid-cols-4 bg-gray-100">
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="features">Features</TabsTrigger>
            <TabsTrigger value="nearby">Nearby Places</TabsTrigger>
            <TabsTrigger value="additional">Additional Info</TabsTrigger>
          </TabsList>
        </div>
        
        <TabsContent value="overview" className="p-6">
          <h3 className="text-lg font-semibold mb-4">Property Overview</h3>
          <p className="text-gray-700 leading-relaxed whitespace-pre-line">{property.description}</p>
        </TabsContent>
        
        <TabsContent value="features" className="p-6">
          <h3 className="text-lg font-semibold mb-4">Property Features</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {property.features.map((feature, index) => (
              <div key={index} className="flex items-center text-gray-700">
                <CheckCircle2 size={18} className="text-brand-blue mr-2 flex-shrink-0" />
                <span>{feature}</span>
              </div>
            ))}
          </div>
        </TabsContent>
        
        <TabsContent value="nearby" className="p-6">
          <h3 className="text-lg font-semibold mb-4">Nearby Places</h3>
          <p className="text-gray-700 mb-4">
            Explore what's available in the neighborhood:
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="bg-gray-50 p-4 rounded-lg">
              <h4 className="font-medium text-gray-900 mb-2">Education</h4>
              <ul className="space-y-2 text-gray-700">
                <li className="flex items-start">
                  <span className="bg-brand-blue h-1.5 w-1.5 rounded-full mt-2 mr-2"></span>
                  <span>Local schools within 1-2 km radius</span>
                </li>
                <li className="flex items-start">
                  <span className="bg-brand-blue h-1.5 w-1.5 rounded-full mt-2 mr-2"></span>
                  <span>Universities and colleges nearby</span>
                </li>
              </ul>
            </div>
            <div className="bg-gray-50 p-4 rounded-lg">
              <h4 className="font-medium text-gray-900 mb-2">Shopping</h4>
              <ul className="space-y-2 text-gray-700">
                <li className="flex items-start">
                  <span className="bg-brand-blue h-1.5 w-1.5 rounded-full mt-2 mr-2"></span>
                  <span>Local markets and grocery stores</span>
                </li>
                <li className="flex items-start">
                  <span className="bg-brand-blue h-1.5 w-1.5 rounded-full mt-2 mr-2"></span>
                  <span>Shopping malls and retail outlets</span>
                </li>
              </ul>
            </div>
            <div className="bg-gray-50 p-4 rounded-lg">
              <h4 className="font-medium text-gray-900 mb-2">Transportation</h4>
              <ul className="space-y-2 text-gray-700">
                <li className="flex items-start">
                  <span className="bg-brand-blue h-1.5 w-1.5 rounded-full mt-2 mr-2"></span>
                  <span>Bus stops and public transport</span>
                </li>
                <li className="flex items-start">
                  <span className="bg-brand-blue h-1.5 w-1.5 rounded-full mt-2 mr-2"></span>
                  <span>Main highways and roads</span>
                </li>
              </ul>
            </div>
            <div className="bg-gray-50 p-4 rounded-lg">
              <h4 className="font-medium text-gray-900 mb-2">Recreation</h4>
              <ul className="space-y-2 text-gray-700">
                <li className="flex items-start">
                  <span className="bg-brand-blue h-1.5 w-1.5 rounded-full mt-2 mr-2"></span>
                  <span>Parks and playgrounds</span>
                </li>
                <li className="flex items-start">
                  <span className="bg-brand-blue h-1.5 w-1.5 rounded-full mt-2 mr-2"></span>
                  <span>Entertainment venues</span>
                </li>
              </ul>
            </div>
          </div>
        </TabsContent>
        
        <TabsContent value="additional" className="p-6">
          <h3 className="text-lg font-semibold mb-4">Additional Information</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <h4 className="font-medium text-gray-900 mb-2">Property Details</h4>
              <ul className="space-y-2 text-gray-700">
                <li className="flex justify-between">
                  <span className="text-gray-600">Property ID:</span>
                  <span className="font-medium">{property.id.substring(0, 8)}</span>
                </li>
                <li className="flex justify-between">
                  <span className="text-gray-600">Property Type:</span>
                  <span className="font-medium capitalize">{property.type}</span>
                </li>
                <li className="flex justify-between">
                  <span className="text-gray-600">Building Age:</span>
                  <span className="font-medium">5-10 years</span>
                </li>
                <li className="flex justify-between">
                  <span className="text-gray-600">Parking:</span>
                  <span className="font-medium">Available</span>
                </li>
              </ul>
            </div>
            <div>
              <h4 className="font-medium text-gray-900 mb-2">Availability</h4>
              <ul className="space-y-2 text-gray-700">
                <li className="flex justify-between">
                  <span className="text-gray-600">Status:</span>
                  <span className="font-medium text-green-600">Available</span>
                </li>
                <li className="flex justify-between">
                  <span className="text-gray-600">Furnished:</span>
                  <span className="font-medium">Partially</span>
                </li>
                <li className="flex justify-between">
                  <span className="text-gray-600">Listed Date:</span>
                  <span className="font-medium">{new Date(property.createdAt).toLocaleDateString()}</span>
                </li>
                <li className="flex justify-between">
                  <span className="text-gray-600">Available From:</span>
                  <span className="font-medium">Immediate</span>
                </li>
              </ul>
            </div>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default PropertyFeatures;
