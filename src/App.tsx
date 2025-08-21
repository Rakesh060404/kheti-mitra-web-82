import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Navigation from "./components/Navigation";
import Dashboard from "./pages/Dashboard";
import Profile from "./pages/Profile";
import Weather from "./pages/Weather";
import PestDetection from "./pages/PestDetection";
import MarketPrices from "./pages/MarketPrices";
import Loans from "./pages/Loans";
import Insurance from "./pages/Insurance";
import Schemes from "./pages/Schemes";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <div className="min-h-screen bg-background">
          <Navigation />
          <Routes>
            <Route path="/" element={<Dashboard />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/weather" element={<Weather />} />
            <Route path="/pest-detection" element={<PestDetection />} />
            <Route path="/market-prices" element={<MarketPrices />} />
            <Route path="/loans" element={<Loans />} />
            <Route path="/insurance" element={<Insurance />} />
            <Route path="/schemes" element={<Schemes />} />
            {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </div>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;