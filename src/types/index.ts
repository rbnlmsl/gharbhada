
export interface Property {
  id: string;
  title: string;
  description: string;
  price: number;
  currency: string;
  address: string;
  city: string;
  zipCode: string;
  country: string;
  type: 'apartment' | 'house' | 'condo' | 'villa' | 'office';
  bedrooms: number;
  bathrooms: number;
  area: number;
  areaUnit: string;
  features: string[];
  images: string[];
  agent: {
    id: string;
    name: string;
    email: string;
    phone: string;
    image?: string;
  };
  published: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface PropertyFilter {
  location?: string;
  priceMin?: number;
  priceMax?: number;
  bedrooms?: number;
  bathrooms?: number;
  propertyType?: string;
  areaMin?: number;
  areaMax?: number;
  features?: string[];
  availability?: string;
  sortBy?: string;
}
