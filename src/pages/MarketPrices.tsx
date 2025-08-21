import { useState } from 'react';
import { TrendingUp, TrendingDown, Search, MapPin, Calendar } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';

const MarketPrices = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedMarket, setSelectedMarket] = useState('delhi');

  const marketData = [
    { crop: 'Rice (Basmati)', currentPrice: 4200, previousPrice: 4100, unit: 'per quintal', trend: 'up', change: 2.4 },
    { crop: 'Wheat', currentPrice: 2150, previousPrice: 2200, unit: 'per quintal', trend: 'down', change: -2.3 },
    { crop: 'Tomato', currentPrice: 1800, previousPrice: 1600, unit: 'per quintal', trend: 'up', change: 12.5 },
    { crop: 'Onion', currentPrice: 2500, previousPrice: 2800, unit: 'per quintal', trend: 'down', change: -10.7 },
    { crop: 'Potato', currentPrice: 1200, previousPrice: 1150, unit: 'per quintal', trend: 'up', change: 4.3 },
    { crop: 'Cotton', currentPrice: 5800, previousPrice: 5750, unit: 'per quintal', trend: 'up', change: 0.9 },
    { crop: 'Sugarcane', currentPrice: 350, previousPrice: 340, unit: 'per quintal', trend: 'up', change: 2.9 },
    { crop: 'Maize', currentPrice: 1850, previousPrice: 1900, unit: 'per quintal', trend: 'down', change: -2.6 },
  ];

  const topGainers = marketData
    .filter(item => item.trend === 'up')
    .sort((a, b) => b.change - a.change)
    .slice(0, 3);

  const topLosers = marketData
    .filter(item => item.trend === 'down')
    .sort((a, b) => a.change - b.change)
    .slice(0, 3);

  const filteredData = marketData.filter(item =>
    item.crop.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="min-h-screen gradient-earth py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-8">
          <h1 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
            Market Prices
          </h1>
          <p className="text-xl text-muted-foreground">
            Real-time wholesale prices and market trends for major crops
          </p>
        </div>

        {/* Filters and Search */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
          <Card className="shadow-soft border-border">
            <CardContent className="p-4">
              <div className="flex items-center gap-2 mb-2">
                <Search className="w-4 h-4 text-muted-foreground" />
                <span className="text-sm font-medium">Search Commodity</span>
              </div>
              <Input
                placeholder="Search by crop name..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </CardContent>
          </Card>

          <Card className="shadow-soft border-border">
            <CardContent className="p-4">
              <div className="flex items-center gap-2 mb-2">
                <MapPin className="w-4 h-4 text-muted-foreground" />
                <span className="text-sm font-medium">Market Location</span>
              </div>
              <Select value={selectedMarket} onValueChange={setSelectedMarket}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="delhi">Delhi (Azadpur)</SelectItem>
                  <SelectItem value="mumbai">Mumbai (Vashi)</SelectItem>
                  <SelectItem value="kolkata">Kolkata (Mechhua)</SelectItem>
                  <SelectItem value="chennai">Chennai (Koyambedu)</SelectItem>
                </SelectContent>
              </Select>
            </CardContent>
          </Card>

          <Card className="shadow-soft border-border">
            <CardContent className="p-4">
              <div className="flex items-center gap-2 mb-2">
                <Calendar className="w-4 h-4 text-muted-foreground" />
                <span className="text-sm font-medium">Last Updated</span>
              </div>
              <p className="text-sm text-foreground font-medium">
                Today, 2:30 PM
              </p>
            </CardContent>
          </Card>
        </div>

        {/* Market Summary */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
          <Card className="shadow-medium border-border gradient-primary text-white">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-white">
                <TrendingUp className="w-5 h-5" />
                Top Gainers
              </CardTitle>
              <CardDescription className="text-white/80">
                Crops with highest price increases
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {topGainers.map((item, index) => (
                  <div key={index} className="flex justify-between items-center">
                    <div>
                      <p className="font-semibold text-white">{item.crop}</p>
                      <p className="text-sm text-white/80">₹{item.currentPrice} {item.unit}</p>
                    </div>
                    <Badge className="bg-green-500 text-white">
                      +{item.change.toFixed(1)}%
                    </Badge>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          <Card className="shadow-medium border-border gradient-secondary text-white">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-white">
                <TrendingDown className="w-5 h-5" />
                Top Decliners
              </CardTitle>
              <CardDescription className="text-white/80">
                Crops with significant price drops
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {topLosers.map((item, index) => (
                  <div key={index} className="flex justify-between items-center">
                    <div>
                      <p className="font-semibold text-white">{item.crop}</p>
                      <p className="text-sm text-white/80">₹{item.currentPrice} {item.unit}</p>
                    </div>
                    <Badge className="bg-red-500 text-white">
                      {item.change.toFixed(1)}%
                    </Badge>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Price Table */}
        <Card className="shadow-medium border-border">
          <CardHeader>
            <CardTitle>Current Market Prices - Delhi (Azadpur)</CardTitle>
            <CardDescription>
              Wholesale prices updated every 4 hours during market hours
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-border">
                    <th className="text-left py-3 px-4 font-semibold text-foreground">Commodity</th>
                    <th className="text-right py-3 px-4 font-semibold text-foreground">Current Price</th>
                    <th className="text-right py-3 px-4 font-semibold text-foreground">Previous Price</th>
                    <th className="text-right py-3 px-4 font-semibold text-foreground">Change</th>
                    <th className="text-center py-3 px-4 font-semibold text-foreground">Trend</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredData.map((item, index) => (
                    <tr key={index} className="border-b border-border hover:bg-muted/30 transition-smooth">
                      <td className="py-4 px-4">
                        <div>
                          <p className="font-medium text-foreground">{item.crop}</p>
                          <p className="text-sm text-muted-foreground">{item.unit}</p>
                        </div>
                      </td>
                      <td className="text-right py-4 px-4">
                        <p className="font-semibold text-foreground">₹{item.currentPrice}</p>
                      </td>
                      <td className="text-right py-4 px-4">
                        <p className="text-muted-foreground">₹{item.previousPrice}</p>
                      </td>
                      <td className="text-right py-4 px-4">
                        <Badge
                          variant={item.trend === 'up' ? 'default' : 'destructive'}
                          className={item.trend === 'up' ? 'bg-success text-success-foreground' : ''}
                        >
                          {item.trend === 'up' ? '+' : ''}{item.change.toFixed(1)}%
                        </Badge>
                      </td>
                      <td className="text-center py-4 px-4">
                        {item.trend === 'up' ? (
                          <TrendingUp className="w-5 h-5 text-success mx-auto" />
                        ) : (
                          <TrendingDown className="w-5 h-5 text-destructive mx-auto" />
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </CardContent>
        </Card>

        {/* Market Insights */}
        <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-6">
          <Card className="shadow-soft border-border">
            <CardContent className="p-6 text-center">
              <div className="text-2xl font-bold text-foreground mb-2">₹2,285</div>
              <div className="text-sm text-muted-foreground">Average Price Index</div>
              <Badge className="mt-2 bg-success text-success-foreground">+3.2%</Badge>
            </CardContent>
          </Card>

          <Card className="shadow-soft border-border">
            <CardContent className="p-6 text-center">
              <div className="text-2xl font-bold text-foreground mb-2">8</div>
              <div className="text-sm text-muted-foreground">Commodities Tracked</div>
              <Badge className="mt-2" variant="secondary">Live Data</Badge>
            </CardContent>
          </Card>

          <Card className="shadow-soft border-border">
            <CardContent className="p-6 text-center">
              <div className="text-2xl font-bold text-foreground mb-2">4hrs</div>
              <div className="text-sm text-muted-foreground">Update Frequency</div>
              <Badge className="mt-2 bg-warning text-warning-foreground">Real-time</Badge>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default MarketPrices;