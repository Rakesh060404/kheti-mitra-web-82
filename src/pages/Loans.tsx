import { useState } from 'react';
import { Calculator, CreditCard, FileText, CheckCircle, Info } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { useToast } from '@/hooks/use-toast';

const Loans = () => {
  const { toast } = useToast();
  const [loanAmount, setLoanAmount] = useState('');
  const [loanTenure, setLoanTenure] = useState('');
  const [interestRate, setInterestRate] = useState('8.5');
  const [calculatedEMI, setCalculatedEMI] = useState<number | null>(null);

  const loanSchemes = [
    {
      name: 'Kisan Credit Card (KCC)',
      provider: 'All Major Banks',
      interestRate: '7.0% - 9.0%',
      maxAmount: '₹3 Lakh',
      features: ['No collateral up to ₹1.6L', 'Flexible repayment', 'Insurance coverage'],
      eligibility: 'All farmers with cultivable land',
      status: 'active'
    },
    {
      name: 'PM-KISAN Beneficiary Loan',
      provider: 'Government Banks',
      interestRate: '6.5% - 8.0%',
      maxAmount: '₹2 Lakh',
      features: ['Subsidized interest', 'Quick processing', 'Direct benefit transfer'],
      eligibility: 'PM-KISAN beneficiaries',
      status: 'active'
    },
    {
      name: 'Agricultural Gold Loan',
      provider: 'Private & Public Banks',
      interestRate: '8.0% - 12.0%',
      maxAmount: '₹50 Lakh',
      features: ['Gold as collateral', 'Quick approval', 'Flexible tenure'],
      eligibility: 'Farmers with gold ornaments',
      status: 'active'
    },
    {
      name: 'Crop Loan',
      provider: 'Cooperative Banks',
      interestRate: '7.5% - 9.5%',
      maxAmount: '₹5 Lakh',
      features: ['Seasonal loan', 'Interest subvention', 'Crop insurance linkage'],
      eligibility: 'Farmers with land records',
      status: 'seasonal'
    },
  ];

  const calculateEMI = () => {
    if (!loanAmount || !loanTenure || !interestRate) {
      toast({
        title: "Missing Information",
        description: "Please fill all fields to calculate EMI.",
        variant: "destructive",
      });
      return;
    }

    const principal = parseFloat(loanAmount);
    const monthlyRate = parseFloat(interestRate) / 100 / 12;
    const months = parseFloat(loanTenure) * 12;

    const emi = (principal * monthlyRate * Math.pow(1 + monthlyRate, months)) / 
                 (Math.pow(1 + monthlyRate, months) - 1);
    
    setCalculatedEMI(Math.round(emi));
  };

  const applyForLoan = (schemeName: string) => {
    toast({
      title: "Application Initiated",
      description: `Your application for ${schemeName} has been initiated. You will be redirected to the bank's portal.`,
      variant: "default",
    });
  };

  return (
    <div className="min-h-screen gradient-earth py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-8">
          <h1 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
            Agricultural Loan Services
          </h1>
          <p className="text-xl text-muted-foreground">
            Explore loan options and calculate EMIs for your farming needs
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* EMI Calculator */}
          <div className="lg:col-span-1">
            <Card className="shadow-medium border-border">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Calculator className="w-5 h-5 text-primary" />
                  EMI Calculator
                </CardTitle>
                <CardDescription>
                  Calculate your monthly EMI for agricultural loans
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="loanAmount">Loan Amount (₹)</Label>
                  <Input
                    id="loanAmount"
                    type="number"
                    placeholder="e.g., 200000"
                    value={loanAmount}
                    onChange={(e) => setLoanAmount(e.target.value)}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="tenure">Loan Tenure (Years)</Label>
                  <Select value={loanTenure} onValueChange={setLoanTenure}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select tenure" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="1">1 Year</SelectItem>
                      <SelectItem value="2">2 Years</SelectItem>
                      <SelectItem value="3">3 Years</SelectItem>
                      <SelectItem value="5">5 Years</SelectItem>
                      <SelectItem value="7">7 Years</SelectItem>
                      <SelectItem value="10">10 Years</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="interestRate">Interest Rate (%)</Label>
                  <Input
                    id="interestRate"
                    type="number"
                    step="0.1"
                    value={interestRate}
                    onChange={(e) => setInterestRate(e.target.value)}
                  />
                </div>

                <Button onClick={calculateEMI} className="w-full">
                  Calculate EMI
                </Button>

                {calculatedEMI && (
                  <Card className="gradient-primary text-white">
                    <CardContent className="p-4 text-center">
                      <p className="text-sm text-white/80 mb-1">Monthly EMI</p>
                      <p className="text-2xl font-bold">₹{calculatedEMI.toLocaleString()}</p>
                      <p className="text-xs text-white/70 mt-1">
                        Total: ₹{(calculatedEMI * parseFloat(loanTenure) * 12).toLocaleString()}
                      </p>
                    </CardContent>
                  </Card>
                )}
              </CardContent>
            </Card>

            {/* Quick Tips */}
            <Card className="shadow-soft border-border mt-6">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Info className="w-5 h-5 text-accent" />
                  Loan Tips
                </CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2 text-sm text-muted-foreground">
                  <li>• Keep your credit score above 700</li>
                  <li>• Maintain proper land records</li>
                  <li>• Consider crop insurance for security</li>
                  <li>• Compare interest rates from multiple banks</li>
                  <li>• Ensure timely repayment for better terms</li>
                </ul>
              </CardContent>
            </Card>
          </div>

          {/* Loan Schemes */}
          <div className="lg:col-span-2">
            <div className="space-y-6">
              <div className="flex justify-between items-center">
                <h2 className="text-2xl font-bold text-foreground">Available Loan Schemes</h2>
                <Badge variant="secondary">{loanSchemes.length} schemes available</Badge>
              </div>

              {loanSchemes.map((scheme, index) => (
                <Card key={index} className="shadow-medium border-border">
                  <CardHeader>
                    <div className="flex justify-between items-start">
                      <div>
                        <CardTitle className="text-lg text-foreground">{scheme.name}</CardTitle>
                        <CardDescription>{scheme.provider}</CardDescription>
                      </div>
                      <Badge 
                        variant={scheme.status === 'active' ? 'default' : 'secondary'}
                        className={scheme.status === 'active' ? 'bg-success text-success-foreground' : ''}
                      >
                        {scheme.status === 'active' ? 'Active' : 'Seasonal'}
                      </Badge>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                      <div>
                        <p className="text-sm text-muted-foreground mb-1">Interest Rate</p>
                        <p className="font-semibold text-primary">{scheme.interestRate}</p>
                      </div>
                      <div>
                        <p className="text-sm text-muted-foreground mb-1">Maximum Amount</p>
                        <p className="font-semibold text-foreground">{scheme.maxAmount}</p>
                      </div>
                    </div>

                    <div className="mb-4">
                      <p className="text-sm text-muted-foreground mb-2">Key Features</p>
                      <div className="flex flex-wrap gap-2">
                        {scheme.features.map((feature, idx) => (
                          <Badge key={idx} variant="outline" className="text-xs">
                            {feature}
                          </Badge>
                        ))}
                      </div>
                    </div>

                    <div className="mb-4">
                      <p className="text-sm text-muted-foreground mb-1">Eligibility</p>
                      <p className="text-sm text-foreground">{scheme.eligibility}</p>
                    </div>

                    <div className="flex gap-2">
                      <Button 
                        onClick={() => applyForLoan(scheme.name)}
                        className="flex-1"
                      >
                        <CreditCard className="w-4 h-4 mr-2" />
                        Apply Now
                      </Button>
                      <Button variant="outline" size="sm">
                        <FileText className="w-4 h-4 mr-2" />
                        Details
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>

            {/* Eligibility Checker */}
            <Card className="shadow-medium border-border mt-8">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <CheckCircle className="w-5 h-5 text-success" />
                  Quick Eligibility Checker
                </CardTitle>
                <CardDescription>
                  Check your eligibility for agricultural loans in 2 minutes
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
                  <div className="space-y-2">
                    <Label>Land Ownership</Label>
                    <Select>
                      <SelectTrigger>
                        <SelectValue placeholder="Select type" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="owned">Owned</SelectItem>
                        <SelectItem value="leased">Leased</SelectItem>
                        <SelectItem value="sharecropper">Sharecropper</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <Label>Annual Income</Label>
                    <Select>
                      <SelectTrigger>
                        <SelectValue placeholder="Select range" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="below-2">Below ₹2 Lakhs</SelectItem>
                        <SelectItem value="2-5">₹2-5 Lakhs</SelectItem>
                        <SelectItem value="5-10">₹5-10 Lakhs</SelectItem>
                        <SelectItem value="above-10">Above ₹10 Lakhs</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <Label>Credit Score</Label>
                    <Select>
                      <SelectTrigger>
                        <SelectValue placeholder="Select range" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="excellent">750+ (Excellent)</SelectItem>
                        <SelectItem value="good">700-749 (Good)</SelectItem>
                        <SelectItem value="fair">650-699 (Fair)</SelectItem>
                        <SelectItem value="poor">Below 650 (Poor)</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <Button className="w-full md:w-auto">
                  <CheckCircle className="w-4 h-4 mr-2" />
                  Check Eligibility
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Loans;