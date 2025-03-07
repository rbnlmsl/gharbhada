import { Property, PropertyFilter } from "@/types";

/**
 * Filters properties by exact property type
 */
export const filterByPropertyType = (properties: Property[], propertyType?: string): Property[] => {
  if (!propertyType || propertyType === 'any') return properties;
  
  return properties.filter(property => 
    property.type.toLowerCase() === propertyType.toLowerCase()
  );
};

/**
 * Filters properties by location - prioritizes exact city match
 */
export const filterByLocation = (properties: Property[], location?: string): Property[] => {
  if (!location) return properties;
  
  // First try to find exact city matches (case insensitive)
  const cityMatches = properties.filter(property => 
    property.city.toLowerCase() === location.toLowerCase()
  );
  
  // If we found exact city matches, return those
  if (cityMatches.length > 0) {
    return cityMatches;
  }
  
  // Otherwise, fall back to address matching
  return properties.filter(property => 
    property.address.toLowerCase().includes(location.toLowerCase())
  );
};

/**
 * Filters properties by minimum price
 */
export const filterByMinPrice = (properties: Property[], priceMin?: number): Property[] => {
  if (!priceMin) return properties;
  
  return properties.filter(property => property.price >= priceMin);
};

/**
 * Filters properties by maximum price
 */
export const filterByMaxPrice = (properties: Property[], priceMax?: number): Property[] => {
  if (!priceMax) return properties;
  
  return properties.filter(property => property.price <= priceMax);
};

/**
 * Filters properties by minimum number of bedrooms
 */
export const filterByBedrooms = (properties: Property[], bedrooms?: number): Property[] => {
  if (!bedrooms) return properties;
  
  return properties.filter(property => property.bedrooms >= bedrooms);
};

/**
 * Filters properties by minimum number of bathrooms
 */
export const filterByBathrooms = (properties: Property[], bathrooms?: number): Property[] => {
  if (!bathrooms) return properties;
  
  return properties.filter(property => property.bathrooms >= bathrooms);
};

/**
 * Filters properties by features
 */
export const filterByFeatures = (properties: Property[], features?: string[]): Property[] => {
  if (!features || features.length === 0) return properties;
  
  return properties.filter(property => 
    features.every(feature => property.features.includes(feature))
  );
};
