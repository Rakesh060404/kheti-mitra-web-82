import { useState } from 'react';
import { User, MapPin, Sprout, Save, LogOut } from 'lucide-react';
import { useAuth } from '@/hooks/useAuth';
import AuthForm from '@/components/auth/AuthForm';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Checkbox } from '@/components/ui/checkbox';
import { useToast } from '@/hooks/use-toast';

const Profile = () => {
  const { toast } = useToast();
  const { user, loading, signOut } = useAuth();

  if (loading) {
    return (
      <div className="min-h-screen gradient-earth flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary mx-auto"></div>
          <p className="mt-2 text-muted-foreground">Loading...</p>
        </div>
      </div>
    );
  }

  if (!user) {
    return <AuthForm />;
  }
  const [formData, setFormData] = useState({
    name: 'Rajesh Kumar',
    email: 'rajesh.kumar@example.com',
    phone: '+91 9876543210',
    pincode: '110001',
    landSize: '5',
    selectedCrops: ['rice', 'wheat'],
  });

  const cropOptions = [
    'Tomato', 'Rice', 'Wheat', 'Cotton', 'Sugarcane', 'Maize', 'Potato', 
    'Onion', 'Banana', 'Mango', 'Groundnut', 'Mustard', 'Turmeric', 
    'Chili', 'Jute', 'Tobacco', 'Pulses', 'Millets'
  ];

  const handleSave = () => {
    toast({
      title: "Profile Updated",
      description: "Your profile information has been saved successfully.",
      variant: "default",
    });
  };

  const handleCropChange = (crop: string, checked: boolean) => {
    setFormData(prev => ({
      ...prev,
      selectedCrops: checked 
        ? [...prev.selectedCrops, crop.toLowerCase()]
        : prev.selectedCrops.filter(c => c !== crop.toLowerCase())
    }));
  };

  return (
    <div className="min-h-screen gradient-earth py-8">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-8">
          <h1 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
            Farmer Profile
          </h1>
          <p className="text-xl text-muted-foreground">
            Keep your information updated for personalized recommendations
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Personal Information */}
          <div className="lg:col-span-2">
            <Card className="shadow-medium border-border">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <User className="w-5 h-5 text-primary" />
                  Personal Information
                </CardTitle>
                <CardDescription>
                  Update your basic profile information
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="name">Full Name</Label>
                    <Input
                      id="name"
                      value={formData.name}
                      onChange={(e) => setFormData({...formData, name: e.target.value})}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="email">Email</Label>
                    <Input
                      id="email"
                      type="email"
                      value={formData.email}
                      onChange={(e) => setFormData({...formData, email: e.target.value})}
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="phone">Phone Number</Label>
                    <Input
                      id="phone"
                      value={formData.phone}
                      onChange={(e) => setFormData({...formData, phone: e.target.value})}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="pincode">Pincode</Label>
                    <Input
                      id="pincode"
                      value={formData.pincode}
                      onChange={(e) => setFormData({...formData, pincode: e.target.value})}
                      placeholder="Enter your pincode"
                    />
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Farm Information */}
            <Card className="shadow-medium border-border mt-6">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <MapPin className="w-5 h-5 text-primary" />
                  Farm Information
                </CardTitle>
                <CardDescription>
                  Details about your farming land and crops
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-2">
                  <Label htmlFor="landSize">Land Size (Acres)</Label>
                  <Input
                    id="landSize"
                    type="number"
                    value={formData.landSize}
                    onChange={(e) => setFormData({...formData, landSize: e.target.value})}
                    placeholder="Enter your farm size in acres"
                  />
                </div>

                <div className="space-y-4">
                  <Label>Crops You Grow</Label>
                  <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                    {cropOptions.map((crop) => (
                      <label key={crop} className="flex items-center space-x-2 cursor-pointer">
                        <Checkbox
                          checked={formData.selectedCrops.includes(crop.toLowerCase())}
                          onCheckedChange={(checked) => handleCropChange(crop, checked as boolean)}
                        />
                        <span className="text-sm text-foreground">{crop}</span>
                      </label>
                    ))}
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Profile Summary */}
          <div className="space-y-6">
            <Card className="shadow-medium border-border gradient-primary text-white">
              <CardHeader>
                <CardTitle className="text-white">Profile Summary</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <p className="text-white/90 text-sm">Name</p>
                  <p className="font-semibold">{formData.name}</p>
                </div>
                <div>
                  <p className="text-white/90 text-sm">Location</p>
                  <p className="font-semibold">PIN: {formData.pincode}</p>
                </div>
                <div>
                  <p className="text-white/90 text-sm">Farm Size</p>
                  <p className="font-semibold">{formData.landSize} Acres</p>
                </div>
                <div>
                  <p className="text-white/90 text-sm">Crops</p>
                  <p className="font-semibold">{formData.selectedCrops.length} selected</p>
                </div>
              </CardContent>
            </Card>

            <Card className="shadow-medium border-border">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Sprout className="w-5 h-5 text-success" />
                  Quick Tips
                </CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2 text-sm text-muted-foreground">
                  <li>• Keep your pincode updated for accurate weather forecasts</li>
                  <li>• Select all crops you grow for better recommendations</li>
                  <li>• Update land size for precise fertilizer calculations</li>
                  <li>• Complete profile helps with loan eligibility</li>
                </ul>
              </CardContent>
            </Card>

            <Button 
              onClick={handleSave} 
              className="w-full mb-4" 
              size="lg"
            >
              <Save className="w-4 h-4 mr-2" />
              Save Profile
            </Button>
            
            <Button 
              onClick={signOut} 
              variant="outline" 
              className="w-full" 
              size="lg"
            >
              <LogOut className="w-4 h-4 mr-2" />
              Sign Out
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;