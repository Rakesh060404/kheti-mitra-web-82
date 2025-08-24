import { useState } from 'react';
import { Shield, Calculator, FileText } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';

const Insurance = () => {
  const [cropType, setCropType] = useState('');
  const [landSize, setLandSize] = useState('');
  const [calculatedPremium, setCalculatedPremium] = useState<number | null>(null);

  const insuranceSchemes = [
    {
      name: 'Pradhan Mantri Fasal Bima Yojana (PMFBY)',
      coverage: 'Comprehensive crop insurance',
      premium: '2% for Kharif, 1.5% for Rabi crops',
      maxCoverage: '100% of sum insured',
      features: ['Weather risk coverage', 'Post-harvest losses', 'Prevented sowing'],
      status: 'active',
    },
    {
      name: 'Weather Based Crop Insurance',
      coverage: 'Weather parameter based',
      premium: '3-5% of sum insured',
      maxCoverage: '90% of sum insured',
      features: ['Rainfall index', 'Temperature protection', 'Quick settlement'],
      status: 'active',
    },
    {
      name: 'Coconut Palm Insurance Scheme',
      coverage: 'Coconut trees protection',
      premium: '9% of sum insured',
      maxCoverage: '₹7,500 per tree',
      features: ['Natural calamity coverage', 'Fire protection', 'Disease coverage'],
      status: 'specialized',
    },
  ];

  const calculatePremium = () => {
    if (!cropType || !landSize) return;

    const baseRate = cropType.includes('kharif') ? 2 : 1.5;
    const coveragePerAcre = 50000; // Base coverage
    const acres = parseFloat(landSize);

    const totalCoverage = acres * coveragePerAcre;
    const premium = (totalCoverage * baseRate) / 100;

    setCalculatedPremium(Math.round(premium));
  };

  return (
    <div className="min-h-screen gradient-earth py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-8">
          <h1 className="text-3xl md:text-4xl font-bold text-foreground mb-4">Agricultural Insurance Services</h1>
          <p className="text-xl text-muted-foreground">Get insurance guidance, calculate premiums, and explore crop protection schemes</p>
        </div>

        {/* Premium Calculator & PMFBY Info */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Premium Calculator */}
          <Card className="shadow-medium border-border">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Calculator className="w-5 h-5 text-accent" />
                Premium Calculator
              </CardTitle>
              <CardDescription>Calculate your crop insurance premium</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <label className="text-sm font-medium">Crop Type</label>
                <Select value={cropType} onValueChange={setCropType}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select crop" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="kharif-rice">Kharif - Rice</SelectItem>
                    <SelectItem value="kharif-cotton">Kharif - Cotton</SelectItem>
                    <SelectItem value="rabi-wheat">Rabi - Wheat</SelectItem>
                    <SelectItem value="rabi-mustard">Rabi - Mustard</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium">Land Size (Acres)</label>
                <Input type="number" placeholder="Enter acres" value={landSize} onChange={(e) => setLandSize(e.target.value)} />
              </div>

              <Button onClick={calculatePremium} className="w-full">
                Calculate Premium
              </Button>

              {calculatedPremium && (
                <Card className="gradient-harvest text-white">
                  <CardContent className="p-4 text-center">
                    <p className="text-sm text-white/80 mb-1">Your Premium</p>
                    <p className="text-xl font-bold">₹{calculatedPremium.toLocaleString()}</p>
                    <p className="text-xs text-white/70 mt-1">Government pays 85% of total premium</p>
                  </CardContent>
                </Card>
              )}
            </CardContent>
          </Card>

          {/* PMFBY Info */}
          <Card className="shadow-soft border-border gradient-primary text-white">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-white">
                <Shield className="w-5 h-5" />
                PMFBY Highlights
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="flex justify-between">
                <span className="text-white/80">Farmer Premium:</span>
                <span className="font-semibold">1.5-2% only</span>
              </div>
              <div className="flex justify-between">
                <span className="text-white/80">Coverage:</span>
                <span className="font-semibold">100% sum insured</span>
              </div>
              <div className="flex justify-between">
                <span className="text-white/80">Claim Settlement:</span>
                <span className="font-semibold">Within 2 months</span>
              </div>
              <Button variant="secondary" size="sm" className="w-full mt-4">
                <FileText className="w-4 h-4 mr-2" />
                Apply for PMFBY
              </Button>
            </CardContent>
          </Card>
        </div>

        {/* Insurance Schemes */}
        <div className="mt-12">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl font-bold text-foreground">Available Insurance Schemes</h2>
            <Badge variant="secondary">{insuranceSchemes.length} schemes</Badge>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {insuranceSchemes.map((scheme, index) => (
              <Card key={index} className="shadow-medium border-border">
                <CardHeader>
                  <div className="flex justify-between items-start mb-2">
                    <Badge
                      variant={scheme.status === 'active' ? 'default' : 'secondary'}
                      className={scheme.status === 'active' ? 'bg-success text-success-foreground' : ''}
                    >
                      {scheme.status === 'active' ? 'Active' : 'Specialized'}
                    </Badge>
                  </div>
                  <CardTitle className="text-lg">{scheme.name}</CardTitle>
                  <CardDescription>{scheme.coverage}</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3 mb-4">
                    <div>
                      <p className="text-sm text-muted-foreground">Premium Rate</p>
                      <p className="font-semibold text-primary">{scheme.premium}</p>
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground">Max Coverage</p>
                      <p className="font-semibold text-foreground">{scheme.maxCoverage}</p>
                    </div>
                  </div>

                  <div className="space-y-2">
                    {scheme.features.map((feature, idx) => (
                      <div key={idx} className="flex items-center gap-2 text-sm">
                        <Shield className="w-3 h-3 text-success" />
                        <span className="text-muted-foreground">{feature}</span>
                      </div>
                    ))}
                  </div>

                  <Button className="w-full mt-4" variant="outline">
                    Learn More
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Insurance;