import { useState } from 'react';
import { Upload, Camera, Search, CheckCircle, XCircle, AlertTriangle } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { useToast } from '@/hooks/use-toast';

const PestDetection = () => {
  const { toast } = useToast();
  const [selectedPlant, setSelectedPlant] = useState('');
  const [uploadedImage, setUploadedImage] = useState<string | null>(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [results, setResults] = useState<any>(null);

  const plantOptions = [
    'Tomato', 'Rice', 'Wheat', 'Cotton', 'Sugarcane', 'Maize', 'Potato', 
    'Onion', 'Banana', 'Mango', 'Groundnut', 'Mustard', 'Turmeric', 
    'Chili', 'Jute', 'Tobacco', 'Pulses', 'Millets'
  ];

  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        setUploadedImage(e.target?.result as string);
        setResults(null);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleAnalyze = () => {
    if (!selectedPlant || !uploadedImage) {
      toast({
        title: "Missing Information",
        description: "Please select a plant type and upload an image.",
        variant: "destructive",
      });
      return;
    }

    setIsAnalyzing(true);
    
    // Simulate AI analysis
    setTimeout(() => {
      setResults({
        disease: 'Leaf Blight',
        confidence: 87,
        severity: 'Moderate',
        description: 'Leaf blight is a common fungal disease affecting tomato plants, typically caused by excessive moisture and poor air circulation.',
        treatment: [
          'Remove affected leaves immediately',
          'Apply copper-based fungicide spray',
          'Improve air circulation around plants',
          'Reduce watering frequency',
          'Use drip irrigation instead of overhead watering'
        ],
        prevention: [
          'Plant disease-resistant varieties',
          'Ensure proper spacing between plants',
          'Rotate crops annually',
          'Avoid working with wet plants',
          'Apply mulch to prevent soil splash'
        ]
      });
      setIsAnalyzing(false);
    }, 3000);
  };

  const handleFeedback = (helpful: boolean) => {
    toast({
      title: helpful ? "Thank you!" : "Feedback Received",
      description: helpful 
        ? "Your feedback helps us improve our detection accuracy." 
        : "We'll work on improving our recommendations.",
      variant: "default",
    });
  };

  return (
    <div className="min-h-screen gradient-earth py-8">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-8">
          <h1 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
            AI Pest & Disease Detection
          </h1>
          <p className="text-xl text-muted-foreground">
            Upload a photo of your plant's leaves for instant disease identification and treatment recommendations
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Upload Section */}
          <div className="space-y-6">
            <Card className="shadow-medium border-border">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Search className="w-5 h-5 text-primary" />
                  Plant Analysis
                </CardTitle>
                <CardDescription>
                  Select your plant type and upload a clear image of the affected leaves
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-2">
                  <label className="text-sm font-medium text-foreground">Plant Type</label>
                  <Select value={selectedPlant} onValueChange={setSelectedPlant}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select the type of plant" />
                    </SelectTrigger>
                    <SelectContent>
                      {plantOptions.map((plant) => (
                        <SelectItem key={plant} value={plant.toLowerCase()}>
                          {plant}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-4">
                  <label className="text-sm font-medium text-foreground">Upload Image</label>
                  <div className="border-2 border-dashed border-border rounded-lg p-8 text-center hover:border-primary/50 transition-smooth">
                    {uploadedImage ? (
                      <div className="space-y-4">
                        <img
                          src={uploadedImage}
                          alt="Uploaded plant"
                          className="max-w-full h-48 object-contain mx-auto rounded-lg"
                        />
                        <Button
                          variant="outline"
                          onClick={() => setUploadedImage(null)}
                        >
                          Change Image
                        </Button>
                      </div>
                    ) : (
                      <div className="space-y-4">
                        <Camera className="w-12 h-12 mx-auto text-muted-foreground" />
                        <div>
                          <p className="text-lg font-medium text-foreground mb-2">
                            Upload Plant Photo
                          </p>
                          <p className="text-sm text-muted-foreground mb-4">
                            Take a clear photo of the affected leaves in good lighting
                          </p>
                          <input
                            type="file"
                            accept="image/*"
                            onChange={handleImageUpload}
                            className="hidden"
                            id="image-upload"
                          />
                          <label htmlFor="image-upload">
                            <Button variant="outline" className="cursor-pointer" asChild>
                              <span>
                                <Upload className="w-4 h-4 mr-2" />
                                Choose Image
                              </span>
                            </Button>
                          </label>
                        </div>
                      </div>
                    )}
                  </div>
                </div>

                <Button
                  onClick={handleAnalyze}
                  disabled={!selectedPlant || !uploadedImage || isAnalyzing}
                  className="w-full"
                  size="lg"
                >
                  {isAnalyzing ? (
                    <>
                      <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                      Analyzing...
                    </>
                  ) : (
                    <>
                      <Search className="w-4 h-4 mr-2" />
                      Analyze Plant
                    </>
                  )}
                </Button>
              </CardContent>
            </Card>
          </div>

          {/* Results Section */}
          <div className="space-y-6">
            {results ? (
              <>
                <Card className="shadow-medium border-border">
                  <CardHeader>
                    <CardTitle className="flex items-center justify-between">
                      <span className="flex items-center gap-2">
                        <AlertTriangle className="w-5 h-5 text-warning" />
                        Detection Results
                      </span>
                      <Badge variant={results.severity === 'High' ? 'destructive' : results.severity === 'Moderate' ? 'secondary' : 'default'}>
                        {results.severity} Severity
                      </Badge>
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div>
                      <h3 className="text-lg font-semibold text-foreground mb-2">
                        {results.disease}
                      </h3>
                      <p className="text-sm text-muted-foreground mb-3">
                        Confidence: {results.confidence}%
                      </p>
                      <p className="text-foreground">{results.description}</p>
                    </div>
                  </CardContent>
                </Card>

                <Card className="shadow-medium border-border">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2 text-success">
                      <CheckCircle className="w-5 h-5" />
                      Treatment Recommendations
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <ul className="space-y-2">
                      {results.treatment.map((step: string, index: number) => (
                        <li key={index} className="flex items-start gap-2">
                          <span className="flex-shrink-0 w-6 h-6 bg-success text-success-foreground rounded-full flex items-center justify-center text-xs font-bold mt-0.5">
                            {index + 1}
                          </span>
                          <span className="text-sm text-foreground">{step}</span>
                        </li>
                      ))}
                    </ul>
                  </CardContent>
                </Card>

                <Card className="shadow-medium border-border">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2 text-primary">
                      <CheckCircle className="w-5 h-5" />
                      Prevention Tips
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <ul className="space-y-2">
                      {results.prevention.map((tip: string, index: number) => (
                        <li key={index} className="flex items-start gap-2">
                          <CheckCircle className="w-4 h-4 text-primary mt-0.5 flex-shrink-0" />
                          <span className="text-sm text-foreground">{tip}</span>
                        </li>
                      ))}
                    </ul>
                  </CardContent>
                </Card>

                <Card className="shadow-medium border-border">
                  <CardHeader>
                    <CardTitle className="text-center">Was this helpful?</CardTitle>
                  </CardHeader>
                  <CardContent className="flex gap-4 justify-center">
                    <Button
                      variant="outline"
                      onClick={() => handleFeedback(true)}
                      className="flex items-center gap-2"
                    >
                      <CheckCircle className="w-4 h-4" />
                      Yes, helpful
                    </Button>
                    <Button
                      variant="outline"
                      onClick={() => handleFeedback(false)}
                      className="flex items-center gap-2"
                    >
                      <XCircle className="w-4 h-4" />
                      Needs improvement
                    </Button>
                  </CardContent>
                </Card>
              </>
            ) : (
              <Card className="shadow-medium border-border">
                <CardContent className="p-12 text-center">
                  <Search className="w-16 h-16 mx-auto mb-4 text-muted-foreground" />
                  <h3 className="text-xl font-semibold text-foreground mb-2">
                    Ready to Analyze
                  </h3>
                  <p className="text-muted-foreground">
                    Select a plant type and upload an image to get started with AI-powered pest and disease detection.
                  </p>
                </CardContent>
              </Card>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default PestDetection;