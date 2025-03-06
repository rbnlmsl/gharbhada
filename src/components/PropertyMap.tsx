
import { useState } from "react";
import { Property } from "@/types";
import { MapPin } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

interface PropertyMapProps {
  property: Property;
}

const PropertyMap = ({ property }: PropertyMapProps) => {
  const [isMapLoaded, setIsMapLoaded] = useState(false);

  // This would be a real map in production
  // For now, we're using a placeholder image
  const mapUrl = `https://maps.googleapis.com/maps/api/staticmap?center=${encodeURIComponent(
    `${property.address}, ${property.city}`
  )}&zoom=15&size=800x400&markers=color:red%7C${encodeURIComponent(
    `${property.address}, ${property.city}`
  )}&key=YOUR_API_KEY`;

  return (
    <Card>
      <CardHeader className="pb-3">
        <CardTitle className="text-lg font-semibold flex items-center">
          <MapPin className="h-5 w-5 mr-2 text-brand-crimson" />
          Location
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="relative w-full h-[300px] bg-gray-100 rounded-md overflow-hidden">
          {/* This would be the actual map in production */}
          <div className="absolute inset-0 flex items-center justify-center bg-gray-100">
            <div className="text-center p-6">
              <MapPin className="h-12 w-12 mx-auto mb-2 text-brand-crimson" />
              <h3 className="text-lg font-medium text-gray-900 mb-1">{property.address}</h3>
              <p className="text-gray-600">{property.city}, {property.zipCode}</p>
              <p className="mt-4 text-sm text-gray-500">
                Interactive map would be displayed here in production. <br />
                The property is located in a convenient and accessible area.
              </p>
            </div>
          </div>
        </div>
        
        <div className="mt-4 grid grid-cols-2 sm:grid-cols-3 gap-4">
          <div className="bg-gray-50 p-3 rounded-md">
            <h4 className="text-sm font-medium text-gray-900">Walk Score</h4>
            <div className="mt-1 flex items-center">
              <div className="h-2 w-3/4 bg-green-200 rounded-full overflow-hidden">
                <div className="h-full bg-green-500 w-[85%]"></div>
              </div>
              <span className="ml-2 text-sm font-medium text-green-600">85</span>
            </div>
            <p className="mt-1 text-xs text-gray-500">Very Walkable</p>
          </div>
          
          <div className="bg-gray-50 p-3 rounded-md">
            <h4 className="text-sm font-medium text-gray-900">Transit Score</h4>
            <div className="mt-1 flex items-center">
              <div className="h-2 w-3/4 bg-blue-200 rounded-full overflow-hidden">
                <div className="h-full bg-blue-500 w-[70%]"></div>
              </div>
              <span className="ml-2 text-sm font-medium text-blue-600">70</span>
            </div>
            <p className="mt-1 text-xs text-gray-500">Good Transit</p>
          </div>
          
          <div className="bg-gray-50 p-3 rounded-md">
            <h4 className="text-sm font-medium text-gray-900">Bike Score</h4>
            <div className="mt-1 flex items-center">
              <div className="h-2 w-3/4 bg-yellow-200 rounded-full overflow-hidden">
                <div className="h-full bg-yellow-500 w-[60%]"></div>
              </div>
              <span className="ml-2 text-sm font-medium text-yellow-600">60</span>
            </div>
            <p className="mt-1 text-xs text-gray-500">Bikeable</p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default PropertyMap;
