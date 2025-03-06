
import { useState } from "react";
import { Link } from "react-router-dom";
import { Property } from "@/types";
import { cn } from "@/lib/utils";
import { MapPin, BedDouble, Bath, Move, Heart } from "lucide-react";

interface PropertyCardProps {
  property: Property;
  className?: string;
}

const PropertyCard = ({ property, className }: PropertyCardProps) => {
  const [isLoading, setIsLoading] = useState(true);
  const [isFavorite, setIsFavorite] = useState(false);

  const handleImageLoad = () => {
    setIsLoading(false);
  };

  const toggleFavorite = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsFavorite(!isFavorite);
  };

  return (
    <Link 
      to={`/property/${property.id}`} 
      className={cn(
        "group flex flex-col bg-white rounded-xl overflow-hidden shadow-sm hover:shadow-md transition-all duration-300",
        className
      )}
    >
      {/* Image */}
      <div className="aspect-[4/3] relative overflow-hidden">
        {isLoading && (
          <div className="absolute inset-0 bg-gray-200 animate-pulse" />
        )}
        <img
          src={property.images[0]}
          alt={property.title}
          className={cn(
            "h-full w-full object-cover transition-all duration-500 group-hover:scale-105",
            isLoading ? "opacity-0" : "opacity-100"
          )}
          onLoad={handleImageLoad}
        />
        <div className="absolute top-3 left-3 bg-brand-blue/90 text-white text-xs font-medium py-1 px-2 rounded">
          {property.type.charAt(0).toUpperCase() + property.type.slice(1)}
        </div>
        <button
          onClick={toggleFavorite}
          className="absolute top-3 right-3 h-8 w-8 bg-white/90 rounded-full flex items-center justify-center transition-colors hover:bg-white"
        >
          <Heart
            size={18}
            className={cn(
              "transition-colors",
              isFavorite ? "fill-brand-crimson text-brand-crimson" : "text-gray-500"
            )}
          />
        </button>
        <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/60 to-transparent h-20 pointer-events-none" />
      </div>

      {/* Content */}
      <div className="flex flex-col flex-grow p-4">
        <div className="flex justify-between items-start mb-2">
          <h3 className="text-lg font-semibold text-gray-800 line-clamp-1">
            {property.title}
          </h3>
          <p className="text-brand-crimson font-bold whitespace-nowrap ml-2">
            {property.currency} {property.price.toLocaleString()}
          </p>
        </div>

        <div className="flex items-center text-gray-500 text-sm mb-3">
          <MapPin size={14} className="mr-1" />
          <span className="truncate">{property.address}, {property.city}</span>
        </div>

        <p className="text-gray-600 text-sm line-clamp-2 mb-4 flex-grow">
          {property.description}
        </p>

        <div className="border-t border-gray-100 pt-3 mt-auto">
          <div className="flex justify-between">
            <div className="flex items-center text-gray-600">
              <BedDouble size={16} className="mr-1" />
              <span className="text-sm">{property.bedrooms} Beds</span>
            </div>
            <div className="flex items-center text-gray-600">
              <Bath size={16} className="mr-1" />
              <span className="text-sm">{property.bathrooms} Baths</span>
            </div>
            <div className="flex items-center text-gray-600">
              <Move size={16} className="mr-1" />
              <span className="text-sm">{property.area} {property.areaUnit}</span>
            </div>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default PropertyCard;
