
import { Property } from "../types";

export const properties: Property[] = [
  {
    id: "prop-1",
    title: "Modern Apartment with City View",
    description: "Stunning apartment with panoramic views of the city skyline, featuring modern fixtures, high ceilings, and ample natural light. The spacious layout includes a gourmet kitchen with stainless steel appliances, a large living area, and a master suite with a walk-in closet. The building offers amenities such as a fitness center, rooftop terrace, and 24-hour concierge service.",
    price: 35000,
    currency: "NPR",
    address: "123 Skyline Avenue",
    city: "Kathmandu",
    zipCode: "44600",
    country: "Nepal",
    type: "apartment",
    bedrooms: 2,
    bathrooms: 2,
    area: 1200,
    areaUnit: "sq ft",
    features: ["Air Conditioning", "Balcony", "Gym", "Parking", "Security", "Elevator"],
    images: [
      "https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80",
      "https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80",
      "https://images.unsplash.com/photo-1484154218962-a197022b5858?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2074&q=80"
    ],
    agent: {
      id: "agent-1",
      name: "Aarav Sharma",
      email: "aarav.sharma@gharbhada.com.np",
      phone: "+977 9801234567",
      image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=774&q=80"
    },
    published: true,
    createdAt: "2023-12-15T08:30:00Z",
    updatedAt: "2023-12-15T08:30:00Z"
  },
  {
    id: "prop-2",
    title: "Spacious Family Home in Quiet Neighborhood",
    description: "Beautiful family home located in a peaceful residential area, featuring spacious rooms and modern amenities. The property includes a large garden, perfect for family gatherings. The interior offers a contemporary kitchen, generous living spaces, and comfortable bedrooms. Nearby schools, parks, and shopping centers make this an ideal family home.",
    price: 55000,
    currency: "NPR",
    address: "456 Tranquil Lane",
    city: "Pokhara",
    zipCode: "33700",
    country: "Nepal",
    type: "house",
    bedrooms: 4,
    bathrooms: 3,
    area: 2500,
    areaUnit: "sq ft",
    features: ["Garden", "Garage", "Central Heating", "Storage", "Fireplace", "Patio"],
    images: [
      "https://images.unsplash.com/photo-1564013799919-ab600027ffc6?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80",
      "https://images.unsplash.com/photo-1598928506311-c55ded91a20c?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80",
      "https://images.unsplash.com/photo-1600585152220-90363fe7e115?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80"
    ],
    agent: {
      id: "agent-2",
      name: "Sita Rai",
      email: "sita.rai@gharbhada.com.np",
      phone: "+977 9841234567",
      image: "https://images.unsplash.com/photo-1580489944761-15a19d654956?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80"
    },
    published: true,
    createdAt: "2023-12-10T10:15:00Z",
    updatedAt: "2023-12-12T14:30:00Z"
  },
  {
    id: "prop-3",
    title: "Luxury Condo with Mountain Views",
    description: "Exquisite luxury condominium offering breathtaking views of the Himalayan mountains. This premium property features high-end finishes, spacious rooms, and a private balcony perfect for enjoying the scenic surroundings. The development includes exclusive amenities such as a swimming pool, spa, and private parking. An ideal retreat for those seeking comfort and natural beauty.",
    price: 65000,
    currency: "NPR",
    address: "789 Mountain View Road",
    city: "Kathmandu",
    zipCode: "44600",
    country: "Nepal",
    type: "condo",
    bedrooms: 3,
    bathrooms: 2,
    area: 1800,
    areaUnit: "sq ft",
    features: ["Pool", "Spa", "Mountain View", "Security", "Elevator", "Balcony"],
    images: [
      "https://images.unsplash.com/photo-1567496898669-ee935f5f647a?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2071&q=80",
      "https://images.unsplash.com/photo-1462396881884-de2c07cb95ed?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80",
      "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80"
    ],
    agent: {
      id: "agent-3",
      name: "Rajiv Thapa",
      email: "rajiv.thapa@gharbhada.com.np",
      phone: "+977 9861234567",
      image: "https://images.unsplash.com/photo-1508214751196-bcfd4ca60f91?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80"
    },
    published: true,
    createdAt: "2023-12-05T09:45:00Z",
    updatedAt: "2023-12-07T11:20:00Z"
  },
  {
    id: "prop-4",
    title: "Cozy Studio Apartment near City Center",
    description: "Charming studio apartment ideally located within walking distance to the vibrant city center. Perfect for singles or young professionals, the space is efficiently designed to maximize comfort and functionality. The property features modern amenities, a compact kitchen, and stylish fixtures. Excellent location with easy access to public transportation, restaurants, and shopping.",
    price: 18000,
    currency: "NPR",
    address: "101 Urban Street",
    city: "Lalitpur",
    zipCode: "44700",
    country: "Nepal",
    type: "apartment",
    bedrooms: 1,
    bathrooms: 1,
    area: 550,
    areaUnit: "sq ft",
    features: ["City View", "Air Conditioning", "Furnished", "Security", "Internet", "Laundry"],
    images: [
      "https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2080&q=80",
      "https://images.unsplash.com/photo-1630699144867-37acec97df5a?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80",
      "https://images.unsplash.com/photo-1486304873000-235643847519?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2074&q=80"
    ],
    agent: {
      id: "agent-4",
      name: "Maya Gurung",
      email: "maya.gurung@gharbhada.com.np",
      phone: "+977 9851234567",
      image: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=776&q=80"
    },
    published: true,
    createdAt: "2023-12-01T14:00:00Z",
    updatedAt: "2023-12-03T09:10:00Z"
  },
  {
    id: "prop-5",
    title: "Traditional Newari Home with Modern Amenities",
    description: "Experience authentic Nepali living in this beautifully restored Newari home. The property combines traditional architecture with modern comforts, creating a unique and charming living space. Featuring intricately carved wooden windows, a central courtyard, and original brick work alongside contemporary facilities. Located in a historic district, offering a genuine cultural experience with all necessary modern conveniences.",
    price: 45000,
    currency: "NPR",
    address: "246 Heritage Lane",
    city: "Bhaktapur",
    zipCode: "44800",
    country: "Nepal",
    type: "house",
    bedrooms: 3,
    bathrooms: 2,
    area: 1600,
    areaUnit: "sq ft",
    features: ["Courtyard", "Garden", "Traditional Architecture", "Furnished", "Parking", "Storage"],
    images: [
      "https://images.unsplash.com/photo-1615876234886-fd9a39fda97f?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2232&q=80",
      "https://images.unsplash.com/photo-1588012886079-8b9768bd0495?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80",
      "https://images.unsplash.com/photo-1566908829550-e6551b00979b?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2069&q=80"
    ],
    agent: {
      id: "agent-5",
      name: "Binod Shrestha",
      email: "binod.shrestha@gharbhada.com.np",
      phone: "+977 9811234567",
      image: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=774&q=80"
    },
    published: true,
    createdAt: "2023-11-25T12:30:00Z",
    updatedAt: "2023-11-28T15:45:00Z"
  },
  {
    id: "prop-6",
    title: "Contemporary Commercial Office Space",
    description: "Premium office space located in the heart of the business district. This modern commercial property is perfect for companies looking for a professional environment with excellent connectivity and amenities. The office features an open floor plan, high-speed internet, conference rooms, and a reception area. The building provides 24/7 security, ample parking, and proximity to major business centers.",
    price: 85000,
    currency: "NPR",
    address: "789 Business Avenue",
    city: "Kathmandu",
    zipCode: "44600",
    country: "Nepal",
    type: "office",
    bedrooms: 0,
    bathrooms: 2,
    area: 2800,
    areaUnit: "sq ft",
    features: ["Conference Room", "High-speed Internet", "Reception Area", "Parking", "Security", "Elevator"],
    images: [
      "https://images.unsplash.com/photo-1497366754035-f200968a6e72?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2069&q=80",
      "https://images.unsplash.com/photo-1497366811353-6870744d04b2?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2069&q=80",
      "https://images.unsplash.com/photo-1556761175-5973dc0f32e7?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2232&q=80"
    ],
    agent: {
      id: "agent-6",
      name: "Prashant Joshi",
      email: "prashant.joshi@gharbhada.com.np",
      phone: "+977 9831234567",
      image: "https://images.unsplash.com/photo-1599566150163-29194dcaad36?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=774&q=80"
    },
    published: true,
    createdAt: "2023-11-20T11:00:00Z",
    updatedAt: "2023-11-22T16:15:00Z"
  }
];

export function getPropertyById(id: string): Property | undefined {
  return properties.find(property => property.id === id);
}

export function getFilteredProperties(filter: {
  location?: string;
  priceMin?: number;
  priceMax?: number;
  bedrooms?: number;
  propertyType?: string;
}): Property[] {
  return properties.filter(property => {
    if (filter.location && 
        !property.city.toLowerCase().includes(filter.location.toLowerCase()) && 
        !property.address.toLowerCase().includes(filter.location.toLowerCase())) {
      return false;
    }
    if (filter.priceMin && property.price < filter.priceMin) {
      return false;
    }
    if (filter.priceMax && property.price > filter.priceMax) {
      return false;
    }
    if (filter.bedrooms && property.bedrooms < filter.bedrooms) {
      return false;
    }
    if (filter.propertyType && property.type !== filter.propertyType) {
      return false;
    }
    return true;
  });
}
