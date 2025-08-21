import { useState } from 'react';
import { Search, Filter, FileText, ExternalLink, Download, Upload, MapPin } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useToast } from '@/hooks/use-toast';

const Schemes = () => {
  const { toast } = useToast();
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [selectedState, setSelectedState] = useState('all');

  const centralSchemes = [
    {
      id: 1,
      name: 'PM-KISAN (Pradhan Mantri Kisan Samman Nidhi)',
      category: 'Direct Benefit',
      description: 'Income support of ₹6,000 per year to eligible farmer families',
      benefits: ['₹2,000 every 4 months', 'Direct bank transfer', 'No application needed'],
      eligibility: 'Small and marginal farmers with cultivable land',
      applicationLink: 'https://pmkisan.gov.in',
      status: 'active',
      lastUpdated: '2024-01-15'
    },
    {
      id: 2,
      name: 'Soil Health Card Scheme',
      category: 'Soil Management',
      description: 'Provides soil health cards to farmers for nutrient management',
      benefits: ['Free soil testing', 'Nutrient recommendations', 'Improved crop yield'],
      eligibility: 'All farmers with agricultural land',
      applicationLink: 'https://soilhealth.dac.gov.in',
      status: 'active',
      lastUpdated: '2024-01-10'
    },
    {
      id: 3,
      name: 'Pradhan Mantri Krishi Sinchai Yojana (PMKSY)',
      category: 'Irrigation',
      description: 'Irrigation support and water conservation for sustainable agriculture',
      benefits: ['Subsidized drip irrigation', 'Water conservation', 'Increased water efficiency'],
      eligibility: 'Farmers with irrigation infrastructure needs',
      applicationLink: 'https://pmksy.gov.in',
      status: 'active',
      lastUpdated: '2024-01-08'
    },
    {
      id: 4,
      name: 'National Agriculture Market (e-NAM)',
      category: 'Marketing',
      description: 'Online trading platform for agricultural commodities',
      benefits: ['Better price discovery', 'Transparent trading', 'Reduced transaction costs'],
      eligibility: 'Registered farmers and traders',
      applicationLink: 'https://enam.gov.in',
      status: 'active',
      lastUpdated: '2024-01-12'
    }
  ];

  const stateSchemes = [
    {
      id: 5,
      name: 'Delhi Mukhyamantri Kisan Aay Badhotari Yojana',
      state: 'Delhi',
      category: 'Income Support',
      description: 'Additional income support for Delhi farmers',
      benefits: ['₹5,000 per acre per crop season', 'Direct cash transfer', 'Crop diversification support'],
      eligibility: 'Farmers with land in Delhi',
      status: 'active',
      lastUpdated: '2024-01-05'
    },
    {
      id: 6,
      name: 'Maharashtra Jalyukt Shivar Abhiyan',
      state: 'Maharashtra',
      category: 'Water Conservation',
      description: 'Water conservation and drought mitigation program',
      benefits: ['Watershed development', 'Water harvesting structures', 'Drought resilience'],
      eligibility: 'Villages in Maharashtra with water scarcity',
      status: 'active',
      lastUpdated: '2024-01-03'
    },
    {
      id: 7,
      name: 'Tamil Nadu Farmers Producer Organizations Scheme',
      state: 'Tamil Nadu',
      category: 'Farmer Groups',
      description: 'Support for formation and strengthening of FPOs',
      benefits: ['₹15 lakh funding per FPO', 'Technical support', 'Market linkage'],
      eligibility: 'Farmer groups in Tamil Nadu',
      status: 'active',
      lastUpdated: '2024-01-07'
    }
  ];

  const categories = [
    { value: 'all', label: 'All Categories' },
    { value: 'Direct Benefit', label: 'Direct Benefit' },
    { value: 'Irrigation', label: 'Irrigation' },
    { value: 'Soil Management', label: 'Soil Management' },
    { value: 'Marketing', label: 'Marketing' },
    { value: 'Income Support', label: 'Income Support' },
    { value: 'Water Conservation', label: 'Water Conservation' },
    { value: 'Farmer Groups', label: 'Farmer Groups' }
  ];

  const states = [
    { value: 'all', label: 'All States' },
    { value: 'Delhi', label: 'Delhi' },
    { value: 'Maharashtra', label: 'Maharashtra' },
    { value: 'Tamil Nadu', label: 'Tamil Nadu' },
    { value: 'Punjab', label: 'Punjab' },
    { value: 'Haryana', label: 'Haryana' },
    { value: 'Uttar Pradesh', label: 'Uttar Pradesh' }
  ];

  const filteredCentralSchemes = centralSchemes.filter(scheme => {
    const matchesSearch = scheme.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         scheme.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === 'all' || scheme.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const filteredStateSchemes = stateSchemes.filter(scheme => {
    const matchesSearch = scheme.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         scheme.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === 'all' || scheme.category === selectedCategory;
    const matchesState = selectedState === 'all' || scheme.state === selectedState;
    return matchesSearch && matchesCategory && matchesState;
  });

  const handleApplyScheme = (schemeName: string, link?: string) => {
    if (link) {
      window.open(link, '_blank');
    } else {
      toast({
        title: "Application Started",
        description: `Your application for ${schemeName} has been initiated.`,
        variant: "default",
      });
    }
  };

  const handleUploadDocument = () => {
    toast({
      title: "Document Upload",
      description: "Document upload feature will be available soon.",
      variant: "default",
    });
  };

  return (
    <div className="min-h-screen gradient-earth py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-8">
          <h1 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
            Government Schemes
          </h1>
          <p className="text-xl text-muted-foreground">
            Explore central and state government agricultural schemes and subsidies
          </p>
        </div>

        {/* Filters */}
        <Card className="shadow-medium border-border mb-8">
          <CardContent className="p-6">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              <div className="space-y-2">
                <label className="text-sm font-medium text-foreground">Search Schemes</label>
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
                  <Input
                    placeholder="Search by name or keyword..."
                    className="pl-10"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                  />
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium text-foreground">Category</label>
                <Select value={selectedCategory} onValueChange={setSelectedCategory}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {categories.map(cat => (
                      <SelectItem key={cat.value} value={cat.value}>{cat.label}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium text-foreground">State</label>
                <Select value={selectedState} onValueChange={setSelectedState}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {states.map(state => (
                      <SelectItem key={state.value} value={state.value}>{state.label}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium text-foreground">Upload Custom Scheme</label>
                <Button variant="outline" className="w-full" onClick={handleUploadDocument}>
                  <Upload className="w-4 h-4 mr-2" />
                  Upload PDF
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Schemes Tabs */}
        <Tabs defaultValue="central" className="w-full">
          <TabsList className="grid w-full grid-cols-2 mb-6">
            <TabsTrigger value="central">Central Government Schemes</TabsTrigger>
            <TabsTrigger value="state">State Government Schemes</TabsTrigger>
          </TabsList>

          <TabsContent value="central">
            <div className="space-y-6">
              <div className="flex justify-between items-center">
                <h2 className="text-xl font-bold text-foreground">Central Government Schemes</h2>
                <Badge variant="secondary">{filteredCentralSchemes.length} schemes found</Badge>
              </div>

              <div className="grid gap-6">
                {filteredCentralSchemes.map((scheme) => (
                  <Card key={scheme.id} className="shadow-medium border-border">
                    <CardHeader>
                      <div className="flex justify-between items-start">
                        <div className="flex-1">
                          <CardTitle className="text-lg text-foreground mb-2">{scheme.name}</CardTitle>
                          <CardDescription>{scheme.description}</CardDescription>
                        </div>
                        <div className="flex flex-col gap-2 ml-4">
                          <Badge className="bg-success text-success-foreground">Active</Badge>
                          <Badge variant="outline">{scheme.category}</Badge>
                        </div>
                      </div>
                    </CardHeader>
                    <CardContent>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div>
                          <h4 className="font-semibold text-foreground mb-2">Key Benefits</h4>
                          <ul className="space-y-1">
                            {scheme.benefits.map((benefit, idx) => (
                              <li key={idx} className="text-sm text-muted-foreground flex items-center gap-2">
                                <div className="w-1.5 h-1.5 bg-primary rounded-full"></div>
                                {benefit}
                              </li>
                            ))}
                          </ul>
                        </div>

                        <div>
                          <h4 className="font-semibold text-foreground mb-2">Eligibility</h4>
                          <p className="text-sm text-muted-foreground mb-3">{scheme.eligibility}</p>
                          <p className="text-xs text-muted-foreground">
                            Last Updated: {new Date(scheme.lastUpdated).toLocaleDateString()}
                          </p>
                        </div>
                      </div>

                      <div className="flex gap-2 mt-6">
                        <Button 
                          className="flex-1"
                          onClick={() => handleApplyScheme(scheme.name, scheme.applicationLink)}
                        >
                          <ExternalLink className="w-4 h-4 mr-2" />
                          Apply Online
                        </Button>
                        <Button variant="outline" size="sm">
                          <FileText className="w-4 h-4 mr-2" />
                          Details
                        </Button>
                        <Button variant="outline" size="sm">
                          <Download className="w-4 h-4 mr-2" />
                          Download
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          </TabsContent>

          <TabsContent value="state">
            <div className="space-y-6">
              <div className="flex justify-between items-center">
                <h2 className="text-xl font-bold text-foreground">State Government Schemes</h2>
                <Badge variant="secondary">{filteredStateSchemes.length} schemes found</Badge>
              </div>

              <div className="grid gap-6">
                {filteredStateSchemes.map((scheme) => (
                  <Card key={scheme.id} className="shadow-medium border-border">
                    <CardHeader>
                      <div className="flex justify-between items-start">
                        <div className="flex-1">
                          <CardTitle className="text-lg text-foreground mb-2">{scheme.name}</CardTitle>
                          <CardDescription>{scheme.description}</CardDescription>
                        </div>
                        <div className="flex flex-col gap-2 ml-4">
                          <Badge className="bg-success text-success-foreground">Active</Badge>
                          <Badge variant="outline">{scheme.category}</Badge>
                          <Badge variant="secondary" className="flex items-center gap-1">
                            <MapPin className="w-3 h-3" />
                            {scheme.state}
                          </Badge>
                        </div>
                      </div>
                    </CardHeader>
                    <CardContent>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div>
                          <h4 className="font-semibold text-foreground mb-2">Key Benefits</h4>
                          <ul className="space-y-1">
                            {scheme.benefits.map((benefit, idx) => (
                              <li key={idx} className="text-sm text-muted-foreground flex items-center gap-2">
                                <div className="w-1.5 h-1.5 bg-primary rounded-full"></div>
                                {benefit}
                              </li>
                            ))}
                          </ul>
                        </div>

                        <div>
                          <h4 className="font-semibold text-foreground mb-2">Eligibility</h4>
                          <p className="text-sm text-muted-foreground mb-3">{scheme.eligibility}</p>
                          <p className="text-xs text-muted-foreground">
                            Last Updated: {new Date(scheme.lastUpdated).toLocaleDateString()}
                          </p>
                        </div>
                      </div>

                      <div className="flex gap-2 mt-6">
                        <Button 
                          className="flex-1"
                          onClick={() => handleApplyScheme(scheme.name)}
                        >
                          <ExternalLink className="w-4 h-4 mr-2" />
                          Apply Now
                        </Button>
                        <Button variant="outline" size="sm">
                          <FileText className="w-4 h-4 mr-2" />
                          Details
                        </Button>
                        <Button variant="outline" size="sm">
                          <Download className="w-4 h-4 mr-2" />
                          Download
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          </TabsContent>
        </Tabs>

        {/* Quick Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mt-12">
          <Card className="shadow-soft border-border text-center">
            <CardContent className="p-6">
              <div className="text-2xl font-bold text-primary mb-2">{centralSchemes.length}</div>
              <div className="text-sm text-muted-foreground">Central Schemes</div>
            </CardContent>
          </Card>

          <Card className="shadow-soft border-border text-center">
            <CardContent className="p-6">
              <div className="text-2xl font-bold text-secondary mb-2">{stateSchemes.length}</div>
              <div className="text-sm text-muted-foreground">State Schemes</div>
            </CardContent>
          </Card>

          <Card className="shadow-soft border-border text-center">
            <CardContent className="p-6">
              <div className="text-2xl font-bold text-accent mb-2">₹45,000 Cr</div>
              <div className="text-sm text-muted-foreground">Total Budget 2024-25</div>
            </CardContent>
          </Card>

          <Card className="shadow-soft border-border text-center">
            <CardContent className="p-6">
              <div className="text-2xl font-bold text-success mb-2">12 Cr+</div>
              <div className="text-sm text-muted-foreground">Farmers Benefited</div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Schemes;