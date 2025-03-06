
import { useState } from "react";
import { Property } from "@/types";
import { useToast } from "@/hooks/use-toast";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card";
import { Calendar, Mail, MessageSquare, Phone, Share2 } from "lucide-react";

interface PropertyContactProps {
  agent: Property['agent'];
  property: Property;
}

const PropertyContact = ({ agent, property }: PropertyContactProps) => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [message, setMessage] = useState(
    `Hi ${agent.name}, I'm interested in this property (${property.title}). Please contact me with more information.`
  );
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { toast } = useToast();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simulate API call
    setTimeout(() => {
      toast({
        title: "Message Sent",
        description: `Your message has been sent to ${agent.name}. They will contact you shortly.`,
      });
      setIsSubmitting(false);
    }, 1000);
  };

  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: property.title,
        text: `Check out this property: ${property.title}`,
        url: window.location.href,
      }).catch(console.error);
    } else {
      // Fallback
      navigator.clipboard.writeText(window.location.href);
      toast({
        title: "Link Copied",
        description: "Property link copied to clipboard",
      });
    }
  };

  return (
    <div className="sticky top-4 space-y-6">
      <Card className="overflow-hidden">
        <CardHeader className="pb-4 bg-brand-blue text-white">
          <h3 className="text-xl font-bold">
            {property.currency} {property.price.toLocaleString()}
          </h3>
          <p className="text-white/80 text-sm">Available Now</p>
        </CardHeader>
        <CardContent className="pt-4">
          <div className="flex items-center mb-4 pb-4 border-b border-gray-100">
            <Avatar className="h-12 w-12 mr-3">
              <AvatarImage src={agent.image || '/placeholder.svg'} alt={agent.name} />
              <AvatarFallback>{agent.name.charAt(0)}</AvatarFallback>
            </Avatar>
            <div>
              <h4 className="font-medium text-gray-900">{agent.name}</h4>
              <p className="text-sm text-gray-500">Property Manager</p>
            </div>
          </div>
          
          <div className="space-y-3 mb-4">
            <Button variant="outline" className="w-full justify-start">
              <Phone className="mr-2 h-4 w-4" />
              {agent.phone}
            </Button>
            <Button variant="outline" className="w-full justify-start">
              <Mail className="mr-2 h-4 w-4" />
              {agent.email}
            </Button>
          </div>
          
          <div className="grid grid-cols-2 gap-3 mb-4">
            <Button variant="outline" className="w-full">
              <Calendar className="mr-2 h-4 w-4" />
              Schedule Tour
            </Button>
            <Button variant="outline" className="w-full" onClick={handleShare}>
              <Share2 className="mr-2 h-4 w-4" />
              Share
            </Button>
          </div>
        </CardContent>
      </Card>
      
      <Card>
        <CardHeader className="pb-2">
          <h3 className="text-lg font-semibold flex items-center">
            <MessageSquare className="h-5 w-5 mr-2 text-brand-crimson" />
            Contact Agent
          </h3>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="name">Your Name</Label>
              <Input 
                id="name" 
                value={name} 
                onChange={(e) => setName(e.target.value)} 
                placeholder="Enter your name"
                required
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="email">Email Address</Label>
              <Input 
                id="email" 
                type="email" 
                value={email} 
                onChange={(e) => setEmail(e.target.value)} 
                placeholder="Enter your email"
                required
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="phone">Phone Number</Label>
              <Input 
                id="phone" 
                value={phone} 
                onChange={(e) => setPhone(e.target.value)} 
                placeholder="Enter your phone number"
                required
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="message">Message</Label>
              <textarea 
                id="message" 
                value={message} 
                onChange={(e) => setMessage(e.target.value)} 
                rows={4}
                className="w-full px-3 py-2 text-sm border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-brand-blue"
                required
              />
            </div>
            
            <Button 
              type="submit" 
              className="w-full bg-brand-crimson hover:bg-brand-crimson/90"
              disabled={isSubmitting}
            >
              {isSubmitting ? "Sending..." : "Send Message"}
            </Button>
          </form>
        </CardContent>
        <CardFooter className="pt-0 text-xs text-gray-500">
          By submitting this form, you agree to our privacy policy and terms of service.
        </CardFooter>
      </Card>
    </div>
  );
};

export default PropertyContact;
