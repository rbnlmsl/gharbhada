
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { AuthProvider } from "@/context/AuthContext";
import { Toaster } from "@/components/ui/toaster";

import Index from "@/pages/Index";
import PropertiesPage from "@/pages/PropertiesPage";
import PropertyDetail from "@/pages/PropertyDetail";
import PropertyUpload from "@/pages/PropertyUpload";
import PropertyEdit from "@/pages/PropertyEdit";
import Auth from "@/pages/Auth";
import NotFound from "@/pages/NotFound";

import "@/App.css";

const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <AuthProvider>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Index />} />
            <Route path="/properties" element={<PropertiesPage />} />
            <Route path="/property/:id" element={<PropertyDetail />} />
            <Route path="/property/upload" element={<PropertyUpload />} />
            <Route path="/property/edit/:id" element={<PropertyEdit />} />
            <Route path="/auth" element={<Auth />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
          <Toaster />
        </BrowserRouter>
      </AuthProvider>
    </QueryClientProvider>
  );
}

export default App;
