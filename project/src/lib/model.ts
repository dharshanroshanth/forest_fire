import * as tf from '@tensorflow/tfjs';

// Normalize input features
const normalizeInput = (
  temperature: number,
  humidity: number,
  windSpeed: number,
  rainfall: number
) => {
  // Simple min-max normalization based on typical ranges
  const normalizedTemp = (temperature - 0) / (50 - 0);
  const normalizedHumidity = humidity / 100;
  const normalizedWind = windSpeed / 100;
  const normalizedRain = rainfall / 100;

  return tf.tensor2d([[
    normalizedTemp,
    normalizedHumidity,
    normalizedWind,
    normalizedRain
  ]]);
};

export const predictFireRisk = (
  temperature: number,
  humidity: number,
  windSpeed: number,
  rainfall: number
): number => {
  // Simplified risk calculation based on environmental factors
  const tempWeight = 0.4;
  const humidityWeight = -0.3;
  const windWeight = 0.2;
  const rainWeight = -0.1;

  const normalizedTemp = temperature / 50;
  const normalizedHumidity = humidity / 100;
  const normalizedWind = windSpeed / 100;
  const normalizedRain = rainfall / 100;

  const risk = (
    normalizedTemp * tempWeight +
    normalizedHumidity * humidityWeight +
    normalizedWind * windWeight +
    normalizedRain * rainWeight
  );

  // Ensure risk is between 0 and 1
  return Math.max(0, Math.min(1, risk + 0.5));
};