'use client';

import { useState, useEffect } from 'react';
import { Cloud, MapPin } from 'lucide-react';

interface WeatherData {
  location: string;
  temperature: number;
  condition: string;
  humidity: number;
  windSpeed: number;
}

export default function WeatherWidget() {
  const [weather, setWeather] = useState<WeatherData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    const fetchWeather = () => {
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(
          async (position) => {
            const { latitude, longitude } = position.coords;
            try {
              // Using Open-Meteo API (free, no API key required)
              const response = await fetch(
                `https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&current=temperature_2m,weather_code,relative_humidity_2m,weather_code,wind_speed_10m&timezone=auto`
              );
              const data = await response.json();
              const current = data.current;

              // Reverse geocoding to get location name
              const geoResponse = await fetch(
                `https://nominatim.openstreetmap.org/reverse?format=json&lat=${latitude}&lon=${longitude}`
              );
              const geoData = await geoResponse.json();
              const city = geoData.address?.city || geoData.address?.town || 'Unknown Location';

              const weatherDescriptions: { [key: number]: string } = {
                0: 'Clear',
                1: 'Partly Cloudy',
                2: 'Mostly Cloudy',
                3: 'Overcast',
                45: 'Foggy',
                48: 'Foggy',
                51: 'Light Drizzle',
                53: 'Drizzle',
                55: 'Heavy Drizzle',
                61: 'Light Rain',
                63: 'Rain',
                65: 'Heavy Rain',
                71: 'Light Snow',
                73: 'Snow',
                75: 'Heavy Snow',
                80: 'Light Showers',
                81: 'Showers',
                82: 'Heavy Showers',
                85: 'Light Snow Showers',
                86: 'Snow Showers',
                95: 'Thunderstorm',
              };

              setWeather({
                location: city,
                temperature: Math.round(current.temperature_2m),
                condition: weatherDescriptions[current.weather_code] || 'Unknown',
                humidity: current.relative_humidity_2m,
                windSpeed: Math.round(current.wind_speed_10m * 10) / 10,
              });
              setLoading(false);
            } catch (err) {
              console.error('Weather fetch error:', err);
              setError(true);
              setLoading(false);
            }
          },
          () => {
            setError(true);
            setLoading(false);
          }
        );
      } else {
        setError(true);
        setLoading(false);
      }
    };

    fetchWeather();
    // Refresh weather every 10 minutes
    const interval = setInterval(fetchWeather, 600000);
    return () => clearInterval(interval);
  }, []);

  if (loading) {
    return (
      <div className="premium-card rounded-lg sm:rounded-xl p-4 sm:p-6">
        <div className="flex items-center gap-2 mb-3 sm:mb-4">
          <Cloud className="w-5 h-5 sm:w-6 sm:h-6 text-sky-400" />
          <h3 className="text-base sm:text-lg font-bold text-white">Weather</h3>
        </div>
        <p className="text-xs sm:text-sm text-white/60">Loading...</p>
      </div>
    );
  }

  if (error || !weather) {
    return (
      <div className="premium-card rounded-lg sm:rounded-xl p-4 sm:p-6">
        <div className="flex items-center gap-2 mb-3 sm:mb-4">
          <Cloud className="w-5 h-5 sm:w-6 sm:h-6 text-sky-400" />
          <h3 className="text-base sm:text-lg font-bold text-white">Weather</h3>
        </div>
        <p className="text-xs sm:text-sm text-white/60">Enable location access to see weather</p>
      </div>
    );
  }

  return (
    <div className="premium-card rounded-lg sm:rounded-xl p-4 sm:p-6">
      <div className="flex items-center gap-2 mb-3 sm:mb-4">
        <Cloud className="w-5 h-5 sm:w-6 sm:h-6 text-sky-400" />
        <h3 className="text-base sm:text-lg font-bold text-white">Weather</h3>
      </div>

      <div className="space-y-2 sm:space-y-3">
        <div className="flex items-center gap-2">
          <MapPin className="w-4 h-4 text-white/50 flex-shrink-0" />
          <p className="text-xs sm:text-sm text-white/70 truncate">{weather.location}</p>
        </div>

        <div>
          <p className="text-3xl sm:text-4xl font-bold text-sky-400">{weather.temperature}°C</p>
          <p className="text-xs sm:text-sm text-white/80 mt-1">{weather.condition}</p>
        </div>

        <div className="grid grid-cols-2 gap-3 pt-2 sm:pt-3 border-t border-white/[0.05]">
          <div>
            <p className="text-xs text-white/60 mb-0.5 sm:mb-1">Humidity</p>
            <p className="text-base sm:text-lg font-semibold text-white/80">{weather.humidity}%</p>
          </div>
          <div>
            <p className="text-xs text-white/60 mb-0.5 sm:mb-1">Wind</p>
            <p className="text-base sm:text-lg font-semibold text-white/80">{weather.windSpeed} km/h</p>
          </div>
        </div>
      </div>
    </div>
  );
}
