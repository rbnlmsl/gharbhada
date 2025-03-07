
// Type definition for property table rows
export type PropertyRow = {
  id: string;
  title: string;
  description: string;
  price: number;
  currency: string;
  address: string;
  city: string;
  zip_code: string;
  country: string;
  type: 'apartment' | 'house' | 'condo' | 'villa' | 'office';
  bedrooms: number;
  bathrooms: number;
  area: number;
  area_unit: string;
  features: string[];
  images: string[];
  agent_id: string;
  published: boolean;
  created_at: string;
  updated_at: string;
};
