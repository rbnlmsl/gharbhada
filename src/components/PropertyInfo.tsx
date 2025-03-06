
import { BedDouble, Bath, Move, MapPin, Tag, Bookmark, Share2, CheckCircle2 } from "lucide-react";
import { Property } from "@/types";

interface PropertyInfoProps {
  property: Property;
}

const PropertyInfo = ({ property }: PropertyInfoProps) => {
  return (
    <div className="space-y-6">
      <div className="bg-white rounded-xl p-6 shadow-sm">
        <div className="flex justify-between items-start mb-4">
          <div>
            <h1 className="text-2xl md:text-3xl font-bold text-gray-900">{property.title}</h1>
            <div className="flex items-center mt-2 text-gray-600">
              <MapPin size={18} className="mr-1" />
              <span>{property.address}, {property.city}, {property.country}</span>
            </div>
          </div>
          <div className="text-right">
            <div className="text-brand-crimson text-2xl md:text-3xl font-bold">
              {property.currency} {property.price.toLocaleString()}
            </div>
            <div className="text-gray-500 text-sm">Per Month</div>
          </div>
        </div>

        {/* Property Details */}
        <div className="flex flex-wrap gap-4 md:gap-6 mt-6 border-t border-gray-100 pt-6">
          <div className="flex items-center">
            <div className="w-12 h-12 rounded-full bg-brand-blue/10 flex items-center justify-center mr-3">
              <BedDouble className="h-6 w-6 text-brand-blue" />
            </div>
            <div>
              <p className="text-gray-500 text-sm">Bedrooms</p>
              <p className="font-semibold">{property.bedrooms}</p>
            </div>
          </div>
          
          <div className="flex items-center">
            <div className="w-12 h-12 rounded-full bg-brand-blue/10 flex items-center justify-center mr-3">
              <Bath className="h-6 w-6 text-brand-blue" />
            </div>
            <div>
              <p className="text-gray-500 text-sm">Bathrooms</p>
              <p className="font-semibold">{property.bathrooms}</p>
            </div>
          </div>
          
          <div className="flex items-center">
            <div className="w-12 h-12 rounded-full bg-brand-blue/10 flex items-center justify-center mr-3">
              <Move className="h-6 w-6 text-brand-blue" />
            </div>
            <div>
              <p className="text-gray-500 text-sm">Area</p>
              <p className="font-semibold">{property.area} {property.areaUnit}</p>
            </div>
          </div>
          
          <div className="flex items-center">
            <div className="w-12 h-12 rounded-full bg-brand-blue/10 flex items-center justify-center mr-3">
              <Tag className="h-6 w-6 text-brand-blue" />
            </div>
            <div>
              <p className="text-gray-500 text-sm">Type</p>
              <p className="font-semibold capitalize">{property.type}</p>
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex gap-4 mt-6">
          <button className="flex items-center bg-brand-crimson text-white px-4 py-2 rounded-md hover:bg-brand-crimson/90 transition-colors">
            <span>Contact Agent</span>
          </button>
          <button className="flex items-center bg-white border border-gray-200 text-gray-700 px-4 py-2 rounded-md hover:bg-gray-50 transition-colors">
            <Bookmark className="mr-2 h-4 w-4" />
            <span>Save</span>
          </button>
          <button className="flex items-center bg-white border border-gray-200 text-gray-700 px-4 py-2 rounded-md hover:bg-gray-50 transition-colors">
            <Share2 className="mr-2 h-4 w-4" />
            <span>Share</span>
          </button>
        </div>
      </div>

      {/* Description */}
      <div className="bg-white rounded-xl p-6 shadow-sm">
        <h2 className="text-xl font-bold text-gray-900 mb-4">Description</h2>
        <p className="text-gray-700 whitespace-pre-line leading-relaxed">
          {property.description}
        </p>
      </div>

      {/* Features */}
      <div className="bg-white rounded-xl p-6 shadow-sm">
        <h2 className="text-xl font-bold text-gray-900 mb-4">Features & Amenities</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {property.features.map((feature, index) => (
            <div key={index} className="flex items-center">
              <CheckCircle2 className="h-5 w-5 text-brand-blue mr-2" />
              <span className="text-gray-700">{feature}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Agent Information */}
      <div className="bg-white rounded-xl p-6 shadow-sm">
        <h2 className="text-xl font-bold text-gray-900 mb-4">Contact Agent</h2>
        <div className="flex items-center">
          <div className="mr-4">
            <div className="h-16 w-16 rounded-full overflow-hidden">
              <img 
                src={property.agent.image || 'https://via.placeholder.com/100'} 
                alt={property.agent.name}
                className="h-full w-full object-cover"
              />
            </div>
          </div>
          <div>
            <h3 className="font-semibold text-lg">{property.agent.name}</h3>
            <p className="text-gray-600">{property.agent.email}</p>
            <p className="text-gray-600">{property.agent.phone}</p>
          </div>
        </div>
        <div className="mt-4">
          <button className="w-full bg-brand-blue text-white py-3 rounded-md hover:bg-brand-blue/90 transition-colors">
            Send Message
          </button>
        </div>
      </div>
    </div>
  );
};

export default PropertyInfo;
