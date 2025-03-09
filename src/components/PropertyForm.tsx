import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/context/AuthContext";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { MapPin, DollarSign, BedDouble, Bath, Move, Upload, X } from "lucide-react";

interface PropertyFormProps {
  editMode?: boolean;
  propertyId?: string;
  initialData?: any;
}

const PropertyForm = ({ editMode = false, propertyId, initialData }: PropertyFormProps) => {
  const navigate = useNavigate();
  const { user, userProfile } = useAuth();
  const { toast } = useToast();

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [images, setImages] = useState<File[]>([]);
  const [imageUrls, setImageUrls] = useState<string[]>(initialData?.images || []);
  const [imagePreviewUrls, setImagePreviewUrls] = useState<string[]>([]);

  // Form state
  const [formData, setFormData] = useState({
    title: initialData?.title || "",
    type: initialData?.type || "apartment",
    address: initialData?.address || "",
    city: initialData?.city || "",
    zipCode: initialData?.zipCode || "",
    country: initialData?.country || "Nepal",
    description: initialData?.description || "",
    price: initialData?.price || "",
    currency: initialData?.currency || "NPR",
    bedrooms: initialData?.bedrooms || "1",
    bathrooms: initialData?.bathrooms || "1",
    area: initialData?.area || "",
    areaUnit: initialData?.areaUnit || "sq ft",
    features: initialData?.features || [],
  });

  // Handle text input changes
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  // Handle select changes
  const handleSelectChange = (name: string, value: string) => {
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  // Handle features input (comma separated)
  const handleFeaturesChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const featuresText = e.target.value;
    const featuresArray = featuresText
      .split(",")
      .map((feature) => feature.trim())
      .filter((feature) => feature.length > 0);
    
    setFormData((prev) => ({ ...prev, features: featuresArray }));
  };

  // Handle image selection
  const handleImageSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files) return;
    
    const newFiles = Array.from(e.target.files);
    setImages((prev) => [...prev, ...newFiles]);
    
    // Create and set preview URLs
    const newPreviewUrls = newFiles.map((file) => URL.createObjectURL(file));
    setImagePreviewUrls((prev) => [...prev, ...newPreviewUrls]);
  };

  // Remove image
  const removeImage = (index: number) => {
    setImages((prev) => prev.filter((_, i) => i !== index));
    
    // Revoke the object URL to avoid memory leaks
    URL.revokeObjectURL(imagePreviewUrls[index]);
    setImagePreviewUrls((prev) => prev.filter((_, i) => i !== index));
  };

  // Remove existing image (for edit mode)
  const removeExistingImage = (index: number) => {
    setImageUrls((prev) => prev.filter((_, i) => i !== index));
  };

  // Upload images to Supabase Storage and get their URLs
  const uploadImages = async () => {
    if (images.length === 0) return [];

    const imagePromises = images.map(async (image, index) => {
      const fileExt = image.name.split('.').pop();
      const filePath = `${user?.id}/${Date.now()}-${index}.${fileExt}`;

      const { data, error } = await supabase.storage
        .from('property-images')
        .upload(filePath, image);

      if (error) {
        console.error('Error uploading image:', error);
        throw error;
      }

      // Get the public URL for the image
      const { data: { publicUrl } } = supabase.storage
        .from('property-images')
        .getPublicUrl(data.path);

      // Update progress
      setUploadProgress(Math.round(((index + 1) / images.length) * 100));
      
      return publicUrl;
    });

    try {
      const uploadedUrls = await Promise.all(imagePromises);
      return [...imageUrls, ...uploadedUrls];
    } catch (error) {
      console.error('Error uploading images:', error);
      toast({
        title: "Error uploading images",
        description: "There was a problem uploading your images. Please try again.",
        variant: "destructive",
      });
      return imageUrls; // Return existing URLs on error
    }
  };

  // Submit form
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!user || !userProfile) {
      toast({
        title: "Authentication required",
        description: "You must be logged in as a landlord or agent to list a property.",
        variant: "destructive",
      });
      return;
    }

    try {
      setIsSubmitting(true);

      // Upload images and get their URLs
      const allImageUrls = await uploadImages();

      // Prepare data for insertion/update
      const propertyData = {
        title: formData.title,
        description: formData.description,
        price: parseFloat(formData.price),
        currency: formData.currency,
        address: formData.address,
        city: formData.city,
        zip_code: formData.zipCode,
        country: formData.country,
        type: formData.type,
        bedrooms: parseInt(formData.bedrooms),
        bathrooms: parseInt(formData.bathrooms),
        area: parseFloat(formData.area),
        area_unit: formData.areaUnit,
        features: formData.features,
        images: allImageUrls,
        agent_id: user.id,
        published: true,
      };

      let result;
      if (editMode && propertyId) {
        // Update existing property
        const { data, error } = await supabase
          .from("properties")
          .update(propertyData)
          .eq('id', propertyId)
          .select()
          .single();

        if (error) throw error;
        result = data;
      } else {
        // Insert new property
        const { data, error } = await supabase
          .from("properties")
          .insert(propertyData)
          .select()
          .single();

        if (error) throw error;
        result = data;
      }

      toast({
        title: editMode ? "Property updated" : "Property listed",
        description: editMode 
          ? "Your property has been successfully updated." 
          : "Your property has been successfully listed.",
      });

      // Navigate to the property details page or dashboard
      navigate(`/property/${result.id}`);
    } catch (error: any) {
      console.error('Error submitting property:', error);
      toast({
        title: "Error",
        description: error.message || "There was a problem submitting your property.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  if (!user || !userProfile) {
    return (
      <div className="text-center p-8">
        <h2 className="text-2xl font-bold mb-4">Authentication Required</h2>
        <p className="mb-4">You must be logged in as a landlord or agent to list a property.</p>
        <Button onClick={() => navigate('/auth')}>Sign In</Button>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-8">
      <div className="grid gap-6 md:grid-cols-2">
        {/* Basic Information */}
        <div className="space-y-4 md:col-span-2">
          <h3 className="text-lg font-semibold">Basic Information</h3>
          
          <div>
            <Label htmlFor="title">Property Title*</Label>
            <Input
              id="title"
              name="title"
              value={formData.title}
              onChange={handleInputChange}
              placeholder="E.g. Modern 2 Bedroom Apartment in Thamel"
              required
            />
          </div>

          <div>
            <Label htmlFor="type">Property Type*</Label>
            <Select 
              name="type" 
              value={formData.type} 
              onValueChange={(value) => handleSelectChange("type", value)}
            >
              <SelectTrigger>
                <SelectValue placeholder="Select Property Type" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="apartment">Apartment</SelectItem>
                <SelectItem value="house">House</SelectItem>
                <SelectItem value="condo">Condo</SelectItem>
                <SelectItem value="villa">Villa</SelectItem>
                <SelectItem value="office">Office</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div>
            <Label htmlFor="description">Description*</Label>
            <Textarea
              id="description"
              name="description"
              value={formData.description}
              onChange={handleInputChange}
              placeholder="Describe your property, including key features and amenities..."
              rows={5}
              required
            />
          </div>
        </div>

        {/* Location */}
        <div className="space-y-4 md:col-span-2">
          <h3 className="text-lg font-semibold">Location</h3>
          
          <div>
            <Label htmlFor="address">Address*</Label>
            <div className="relative">
              <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500" size={18} />
              <Input
                id="address"
                name="address"
                value={formData.address}
                onChange={handleInputChange}
                placeholder="Street address"
                className="pl-10"
                required
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label htmlFor="city">City*</Label>
              <Input
                id="city"
                name="city"
                value={formData.city}
                onChange={handleInputChange}
                placeholder="City"
                required
              />
            </div>
            <div>
              <Label htmlFor="zipCode">ZIP Code</Label>
              <Input
                id="zipCode"
                name="zipCode"
                value={formData.zipCode}
                onChange={handleInputChange}
                placeholder="ZIP Code"
              />
            </div>
          </div>

          <div>
            <Label htmlFor="country">Country*</Label>
            <Input
              id="country"
              name="country"
              value={formData.country}
              onChange={handleInputChange}
              placeholder="Country"
              required
            />
          </div>
        </div>

        {/* Details */}
        <div className="space-y-4 md:col-span-2">
          <h3 className="text-lg font-semibold">Property Details</h3>
          
          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label htmlFor="price">Price*</Label>
              <div className="relative">
                <DollarSign className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500" size={18} />
                <Input
                  id="price"
                  name="price"
                  type="number"
                  value={formData.price}
                  onChange={handleInputChange}
                  placeholder="Price"
                  className="pl-10"
                  required
                />
              </div>
            </div>
            <div>
              <Label htmlFor="currency">Currency*</Label>
              <Select 
                name="currency" 
                value={formData.currency} 
                onValueChange={(value) => handleSelectChange("currency", value)}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Currency" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="NPR">NPR</SelectItem>
                  <SelectItem value="USD">USD</SelectItem>
                  <SelectItem value="EUR">EUR</SelectItem>
                  <SelectItem value="GBP">GBP</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
            <div>
              <Label htmlFor="bedrooms">Bedrooms*</Label>
              <div className="relative">
                <BedDouble className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500" size={18} />
                <Select 
                  name="bedrooms" 
                  value={formData.bedrooms} 
                  onValueChange={(value) => handleSelectChange("bedrooms", value)}
                >
                  <SelectTrigger className="pl-10">
                    <SelectValue placeholder="Bedrooms" />
                  </SelectTrigger>
                  <SelectContent>
                    {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((num) => (
                      <SelectItem key={num} value={num.toString()}>{num}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>
            <div>
              <Label htmlFor="bathrooms">Bathrooms*</Label>
              <div className="relative">
                <Bath className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500" size={18} />
                <Select 
                  name="bathrooms" 
                  value={formData.bathrooms} 
                  onValueChange={(value) => handleSelectChange("bathrooms", value)}
                >
                  <SelectTrigger className="pl-10">
                    <SelectValue placeholder="Bathrooms" />
                  </SelectTrigger>
                  <SelectContent>
                    {[1, 2, 3, 4, 5, 6, 7, 8].map((num) => (
                      <SelectItem key={num} value={num.toString()}>{num}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>
            <div className="col-span-2 md:col-span-1">
              <Label htmlFor="area">Area*</Label>
              <div className="flex">
                <div className="relative flex-grow">
                  <Move className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500" size={18} />
                  <Input
                    id="area"
                    name="area"
                    type="number"
                    value={formData.area}
                    onChange={handleInputChange}
                    placeholder="Area"
                    className="pl-10 rounded-r-none"
                    required
                  />
                </div>
                <Select 
                  name="areaUnit" 
                  value={formData.areaUnit} 
                  onValueChange={(value) => handleSelectChange("areaUnit", value)}
                >
                  <SelectTrigger className="w-24 rounded-l-none border-l-0">
                    <SelectValue placeholder="Unit" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="sq ft">sq ft</SelectItem>
                    <SelectItem value="sq m">sq m</SelectItem>
                    <SelectItem value="acres">acres</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </div>

          <div>
            <Label htmlFor="features">Features (comma separated)</Label>
            <Textarea
              id="features"
              name="features"
              value={formData.features.join(", ")}
              onChange={handleFeaturesChange}
              placeholder="E.g. Air Conditioning, Swimming Pool, Garden, Parking..."
              rows={3}
            />
          </div>
        </div>

        {/* Images */}
        <div className="space-y-4 md:col-span-2">
          <h3 className="text-lg font-semibold">Property Images</h3>
          
          <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center">
            <input
              type="file"
              id="images"
              className="hidden"
              multiple
              accept="image/*"
              onChange={handleImageSelect}
            />
            <label htmlFor="images" className="cursor-pointer">
              <div className="flex flex-col items-center justify-center">
                <Upload size={40} className="text-gray-400 mb-2" />
                <p className="text-gray-600 font-medium">Click to upload images</p>
                <p className="text-gray-400 text-sm">or drag and drop</p>
                <p className="text-gray-400 text-xs mt-2">PNG, JPG, or WEBP (max. 5MB each)</p>
              </div>
            </label>
          </div>

          {/* Image previews */}
          {(imagePreviewUrls.length > 0 || imageUrls.length > 0) && (
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4 mt-4">
              {/* Existing images (for edit mode) */}
              {imageUrls.map((url, index) => (
                <div key={`existing-${index}`} className="relative group aspect-square">
                  <img
                    src={url}
                    alt={`Property ${index + 1}`}
                    className="h-full w-full object-cover rounded-lg"
                  />
                  <button
                    type="button"
                    onClick={() => removeExistingImage(index)}
                    className="absolute top-2 right-2 bg-white/90 p-1 rounded-full text-red-500 opacity-0 group-hover:opacity-100 transition-opacity"
                  >
                    <X size={16} />
                  </button>
                </div>
              ))}
              
              {/* New image previews */}
              {imagePreviewUrls.map((url, index) => (
                <div key={`preview-${index}`} className="relative group aspect-square">
                  <img
                    src={url}
                    alt={`New upload ${index + 1}`}
                    className="h-full w-full object-cover rounded-lg"
                  />
                  <div className="absolute inset-0 bg-black/10 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity" />
                  <button
                    type="button"
                    onClick={() => removeImage(index)}
                    className="absolute top-2 right-2 bg-white/90 p-1 rounded-full text-red-500 opacity-0 group-hover:opacity-100 transition-opacity"
                  >
                    <X size={16} />
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Submit button */}
      <div className="flex justify-end space-x-4">
        <Button
          type="button"
          variant="outline"
          onClick={() => navigate(-1)}
          disabled={isSubmitting}
        >
          Cancel
        </Button>
        <Button type="submit" disabled={isSubmitting}>
          {isSubmitting ? (
            <>
              <span className="animate-spin mr-2">●</span>
              {uploadProgress > 0 ? `Uploading (${uploadProgress}%)` : "Submitting..."}
            </>
          ) : (
            editMode ? "Update Property" : "List Property"
          )}
        </Button>
      </div>
    </form>
  );
};

export default PropertyForm;
