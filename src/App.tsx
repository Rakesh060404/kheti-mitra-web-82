import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { AuthProvider } from '@/hooks/useAuth';
import Navigation from "./components/Navigation";
import Dashboard from "./pages/Dashboard";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Profile from "./pages/Profile";
import Weather from "./pages/Weather";
import PestDetection from "./pages/PestDetection";
import MarketPrices from "./pages/MarketPrices";
import Loans from "./pages/Loans";
import Insurance from "./pages/Insurance";
import Schemes from "./pages/Schemes";
import Chatbot from "./pages/Chatbot";
import NotFound from "./pages/NotFound";
import ProtectedRoute from "./components/ProtectedRoute";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <AuthProvider>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <Router>
          <div className="min-h-screen bg-background">
            <Navigation />
            <Routes>
              <Route path="/login" element={<Login />} />
              <Route path="/signup" element={<Signup />} />
              <Route
                path="/"
                element={
                  <ProtectedRoute>
                    <Dashboard />
                  </ProtectedRoute>
                }
              />
              <Route path="/profile" element={<Profile />} />
              <Route path="/weather" element={<Weather />} />
              <Route path="/pest-detection" element={<PestDetection />} />
              <Route path="/market-prices" element={<MarketPrices />} />
              <Route path="/loans" element={<Loans />} />
              <Route path="/insurance" element={<Insurance />} />
              <Route path="/schemes" element={<Schemes />} />
              <Route path="/chatbot" element={<Chatbot />} />
              {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
              <Route path="*" element={<NotFound />} />
            </Routes>
          </div>
        </Router>
      </TooltipProvider>
    </AuthProvider>
  </QueryClientProvider>
);

export default App;