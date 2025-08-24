import { useEffect, useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import {
  Cloud,
  Sun,
  CloudRain,
  Thermometer,
  Droplets,
  Wind,
  Eye,
  MapPin,
  Calendar,
  Lightbulb
} from 'lucide-react';
import { Link } from "react-router-dom";

const WEATHER_API_KEY = "7f57cb26151efde910bd11bfa1e1d66f"; // <-- Replace with your API key
const CITY = "Delhi";
const COUNTRY = "IN";

const Weather = () => {
  const [pincode, setPincode] = useState("110001");
  const [currentWeather, setCurrentWeather] = useState<any>(null);
  const [forecast, setForecast] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);

  // Helper to get city from pincode using an API (example: Zippopotam or India Post API)
  const getCityFromPincode = async (pin: string) => {
    const res = await fetch(`https://api.postalpincode.in/pincode/${pin}`);
    const data = await res.json();
    if (data[0].Status === "Success") {
      let city = data[0].PostOffice[0].District;
      // Fix for Delhi region
      if (city.includes("Delhi")) {
        city = "Delhi";
      }
      return city;
    }
    return null;
  };

  const fetchWeather = async (pin: string) => {
    setLoading(true);
    const city = await getCityFromPincode(pin);
    if (!city) {
      alert("Invalid pincode or city not found.");
      setLoading(false);
      return;
    }
    // Fetch weather for the city
    const currentRes = await fetch(
      `https://api.openweathermap.org/data/2.5/weather?q=${city},IN&units=metric&appid=${WEATHER_API_KEY}`
    );
    const currentData = await currentRes.json();

    if (!currentData || !currentData.sys) {
      setLoading(false);
      alert("Weather data not found for this location.");
      return;
    }

    const forecastRes = await fetch(
      `https://api.openweathermap.org/data/2.5/forecast?q=${city},IN&units=metric&appid=${WEATHER_API_KEY}`
    );
    const forecastData = await forecastRes.json();

    setCurrentWeather({
      location: `${currentData.name}, ${currentData.sys.country}`,
      temperature: Math.round(currentData.main.temp),
      condition: currentData.weather[0].main,
      humidity: currentData.main.humidity,
      windSpeed: currentData.wind.speed,
      visibility: currentData.visibility / 1000,
      uvIndex: 6,
      pincode: pin,
    });

    // Group forecast by day
    const daily: any = {};
    forecastData.list.forEach((item: any) => {
      const date = new Date(item.dt_txt);
      const day = date.toLocaleDateString("en-US", { weekday: "short" });
      if (!daily[day]) {
        daily[day] = {
          day,
          high: item.main.temp_max,
          low: item.main.temp_min,
          condition: item.weather[0].main,
          precipitation: item.pop ? Math.round(item.pop * 100) : 0,
          icon: item.weather[0].main === "Rain"
            ? CloudRain
            : item.weather[0].main === "Clouds"
              ? Cloud
              : Sun,
        };
      } else {
        daily[day].high = Math.max(daily[day].high, item.main.temp_max);
        daily[day].low = Math.min(daily[day].low, item.main.temp_min);
      }
    });
    setForecast(Object.values(daily).slice(0, 5));
    setLoading(false);
  };

  // Initial fetch for default pincode
  useEffect(() => {
    fetchWeather(pincode);
  }, []);

  const recommendations = [
    {
      title: 'Check for Rain',
      description: 'Rain in forecast - plan irrigation and field work accordingly.',
      type: 'info'
    },
    {
      title: 'UV Protection Needed',
      description: 'High UV index - use protective clothing during peak hours (11 AM - 3 PM).',
      type: 'warning'
    },
    {
      title: 'Good for Field Work',
      description: 'Mild temperature and low wind - ideal for planting and harvesting.',
      type: 'success'
    },
  ];

  if (loading || !currentWeather) return <div className="text-center py-20">Loading weather data...</div>;

  return (
    <div className="min-h-screen gradient-earth py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-8">
          <h1 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
            Weather Forecast
          </h1>
          <p className="text-xl text-muted-foreground">
            5-day weather prediction with agricultural recommendations
          </p>
          <div className="flex flex-col items-center gap-2 mt-4">
            <label htmlFor="pincode" className="text-base text-muted-foreground font-medium mb-1">
              Enter your city pincode
            </label>
            <div className="flex gap-2">
              <input
                id="pincode"
                type="text"
                value={pincode}
                onChange={e => setPincode(e.target.value)}
                placeholder="e.g. 110001"
                className="border px-4 py-2 rounded"
              />
              <button
                onClick={() => fetchWeather(pincode)}
                className="bg-green-600 text-white px-4 py-2 rounded"
              >
                Get Weather
              </button>
            </div>
          </div>
        </div>

        {/* Current Weather */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-8">
          <div className="lg:col-span-2">
            <Card className="shadow-medium border-border gradient-secondary text-white">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-white">
                  <MapPin className="w-5 h-5" />
                  Current Weather - {currentWeather.location}
                </CardTitle>
                <CardDescription className="text-white/80">
                  PIN: {currentWeather.pincode}
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex items-center justify-between mb-6">
                  <div>
                    <div className="text-4xl md:text-6xl font-bold mb-2">
                      {currentWeather.temperature}°C
                    </div>
                    <div className="text-xl text-white/90">
                      {currentWeather.condition}
                    </div>
                  </div>
                  <Cloud className="w-16 h-16 text-white/80" />
                </div>

                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  <div className="text-center">
                    <Droplets className="w-6 h-6 mx-auto mb-2 text-white/80" />
                    <div className="text-lg font-semibold">{currentWeather.humidity}%</div>
                    <div className="text-sm text-white/80">Humidity</div>
                  </div>
                  <div className="text-center">
                    <Wind className="w-6 h-6 mx-auto mb-2 text-white/80" />
                    <div className="text-lg font-semibold">{currentWeather.windSpeed} km/h</div>
                    <div className="text-sm text-white/80">Wind</div>
                  </div>
                  <div className="text-center">
                    <Eye className="w-6 h-6 mx-auto mb-2 text-white/80" />
                    <div className="text-lg font-semibold">{currentWeather.visibility} km</div>
                    <div className="text-sm text-white/80">Visibility</div>
                  </div>
                  <div className="text-center">
                    <Sun className="w-6 h-6 mx-auto mb-2 text-white/80" />
                    <div className="text-lg font-semibold">{currentWeather.uvIndex}</div>
                    <div className="text-sm text-white/80">UV Index</div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Agricultural Recommendations */}
          <div>
            <Card className="shadow-medium border-border">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Lightbulb className="w-5 h-5 text-accent" />
                  Farm Recommendations
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {recommendations.map((rec, index) => (
                  <div key={index} className="space-y-2">
                    <div className="flex items-start gap-2">
                      <Badge
                        variant={rec.type === 'success' ? 'default' : rec.type === 'warning' ? 'destructive' : 'secondary'}
                        className="mt-1"
                      >
                        {rec.type === 'success' ? '✓' : rec.type === 'warning' ? '⚠' : 'ℹ'}
                      </Badge>
                      <div>
                        <h4 className="font-semibold text-sm text-foreground">{rec.title}</h4>
                        <p className="text-xs text-muted-foreground">{rec.description}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>
          </div>
        </div>

        {/* 5-Day Forecast */}
        <Card className="shadow-medium border-border">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Calendar className="w-5 h-5 text-primary" />
              5-Day Forecast
            </CardTitle>
            <CardDescription>
              Extended weather outlook for better farm planning
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
              {forecast.map((day, index) => (
                <div key={index} className="text-center p-4 rounded-lg bg-muted/50 hover:bg-muted transition-smooth">
                  <div className="font-semibold text-foreground mb-2">{day.day}</div>
                  <day.icon className="w-8 h-8 mx-auto mb-3 text-primary" />
                  <div className="space-y-1">
                    <div className="flex justify-center gap-2 text-sm">
                      <span className="font-semibold text-foreground">{Math.round(day.high)}°</span>
                      <span className="text-muted-foreground">{Math.round(day.low)}°</span>
                    </div>
                    <div className="text-xs text-muted-foreground">{day.condition}</div>
                    <div className="flex items-center justify-center gap-1 text-xs text-secondary">
                      <Droplets className="w-3 h-3" />
                      {day.precipitation}%
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Detailed Metrics */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mt-8">
          <Card className="shadow-soft border-border">
            <CardContent className="p-6 text-center">
              <Thermometer className="w-8 h-8 mx-auto mb-3 text-primary" />
              <div className="text-2xl font-bold text-foreground mb-1">{currentWeather.temperature}°C</div>
              <div className="text-sm text-muted-foreground">Feels like {currentWeather.temperature + 3}°C</div>
            </CardContent>
          </Card>

          <Card className="shadow-soft border-border">
            <CardContent className="p-6 text-center">
              <Droplets className="w-8 h-8 mx-auto mb-3 text-secondary" />
              <div className="text-2xl font-bold text-foreground mb-1">{currentWeather.humidity}%</div>
              <div className="text-sm text-muted-foreground">Optimal for crops</div>
            </CardContent>
          </Card>

          <Card className="shadow-soft border-border">
            <CardContent className="p-6 text-center">
              <Wind className="w-8 h-8 mx-auto mb-3 text-accent" />
              <div className="text-2xl font-bold text-foreground mb-1">{currentWeather.windSpeed} km/h</div>
              <div className="text-sm text-muted-foreground">Light breeze</div>
            </CardContent>
          </Card>

          <Card className="shadow-soft border-border">
            <CardContent className="p-6 text-center">
              <Sun className="w-8 h-8 mx-auto mb-3 text-warning" />
              <div className="text-2xl font-bold text-foreground mb-1">{currentWeather.uvIndex} UV</div>
              <div className="text-sm text-muted-foreground">High exposure</div>
            </CardContent>
          </Card>
        </div>

        {/* Navigation Buttons */}
        <div className="flex justify-center gap-6 mt-8">
          <Link to="/pest-detection">
            <button className="bg-blue-400 text-white px-8 py-4 rounded-lg flex items-center gap-2 font-semibold text-lg shadow hover:bg-blue-500 transition">
              <span role="img" aria-label="Pest">🦗</span>
              Quick Pest Detection
            </button>
          </Link>
          <Link to="/weather">
            <button className="bg-green-700 text-white px-8 py-4 rounded-lg flex items-center gap-2 font-semibold text-lg shadow hover:bg-green-800 transition">
              <span role="img" aria-label="Weather">☁️</span>
              Check Weather
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Weather;