import React, { useState } from 'react';
import { Thermometer, Droplets, Wind, CloudRain, AlertTriangle } from 'lucide-react';
import { ForestScene } from './components/ForestScene';
import { predictFireRisk } from './lib/model';

function App() {
  const [temperature, setTemperature] = useState(25);
  const [humidity, setHumidity] = useState(50);
  const [windSpeed, setWindSpeed] = useState(10);
  const [rainfall, setRainfall] = useState(0);
  const [riskLevel, setRiskLevel] = useState(0);

  const handlePredict = () => {
    const risk = predictFireRisk(temperature, humidity, windSpeed, rainfall);
    setRiskLevel(risk);
  };

  const getRiskColor = () => {
    if (riskLevel < 0.33) return 'text-green-500';
    if (riskLevel < 0.66) return 'text-yellow-500';
    return 'text-red-500';
  };

  const getRiskText = () => {
    if (riskLevel < 0.33) return 'Low Risk';
    if (riskLevel < 0.66) return 'Medium Risk';
    return 'High Risk';
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-900 to-gray-800 text-white">
      <div className="container mx-auto px-4 py-8">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold mb-2">Forest Fire Risk Prediction</h1>
          <p className="text-gray-400">Enter environmental conditions to predict fire risk</p>
        </div>

        <div className="grid md:grid-cols-2 gap-8">
          <div className="bg-gray-800 p-6 rounded-lg shadow-xl">
            <div className="space-y-6">
              <div>
                <label className="flex items-center gap-2 mb-2">
                  <Thermometer className="text-red-400" />
                  Temperature (°C)
                </label>
                <input
                  type="range"
                  min="0"
                  max="50"
                  value={temperature}
                  onChange={(e) => setTemperature(Number(e.target.value))}
                  className="w-full"
                />
                <span className="text-sm text-gray-400">{temperature}°C</span>
              </div>

              <div>
                <label className="flex items-center gap-2 mb-2">
                  <Droplets className="text-blue-400" />
                  Humidity (%)
                </label>
                <input
                  type="range"
                  min="0"
                  max="100"
                  value={humidity}
                  onChange={(e) => setHumidity(Number(e.target.value))}
                  className="w-full"
                />
                <span className="text-sm text-gray-400">{humidity}%</span>
              </div>

              <div>
                <label className="flex items-center gap-2 mb-2">
                  <Wind className="text-gray-400" />
                  Wind Speed (km/h)
                </label>
                <input
                  type="range"
                  min="0"
                  max="100"
                  value={windSpeed}
                  onChange={(e) => setWindSpeed(Number(e.target.value))}
                  className="w-full"
                />
                <span className="text-sm text-gray-400">{windSpeed} km/h</span>
              </div>

              <div>
                <label className="flex items-center gap-2 mb-2">
                  <CloudRain className="text-blue-400" />
                  Rainfall (mm)
                </label>
                <input
                  type="range"
                  min="0"
                  max="100"
                  value={rainfall}
                  onChange={(e) => setRainfall(Number(e.target.value))}
                  className="w-full"
                />
                <span className="text-sm text-gray-400">{rainfall} mm</span>
              </div>

              <button
                onClick={handlePredict}
                className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded transition-colors"
              >
                Predict Risk
              </button>
            </div>

            {riskLevel > 0 && (
              <div className="mt-6 p-4 bg-gray-700 rounded-lg">
                <div className="flex items-center gap-2 mb-2">
                  <AlertTriangle className={getRiskColor()} />
                  <h3 className="text-xl font-bold">Risk Assessment</h3>
                </div>
                <p className={`text-2xl font-bold ${getRiskColor()}`}>
                  {getRiskText()}
                </p>
                <p className="text-sm text-gray-400 mt-2">
                  Risk Score: {(riskLevel * 100).toFixed(1)}%
                </p>
              </div>
            )}
          </div>

          <div className="bg-gray-800 p-6 rounded-lg shadow-xl">
            <ForestScene riskLevel={riskLevel} />
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;