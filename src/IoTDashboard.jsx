import React, { useState, useEffect } from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { Thermometer, Droplets } from 'lucide-react';

const IoTDashboard = () => {
  const [sensorData, setSensorData] = useState([]);
  const [isConnected, setIsConnected] = useState(false);
  const [error, setError] = useState(null);

  // Simular datos del sensor para desarrollo
  useEffect(() => {
    const interval = setInterval(() => {
      const newReading = {
        timestamp: new Date().toLocaleTimeString(),
        temperature: 20 + Math.random() * 5,
        humidity: 50 + Math.random() * 10
      };
      
      setSensorData(prev => {
        const updated = [...prev, newReading];
        return updated.slice(-20); // Mantener solo los últimos 20 puntos
      });
    }, 2000);

    return () => clearInterval(interval);
  }, []);

  const getLatestReadings = () => {
    if (sensorData.length === 0) return { temperature: '--', humidity: '--' };
    const latest = sensorData[sensorData.length - 1];
    return {
      temperature: latest.temperature.toFixed(1),
      humidity: latest.humidity.toFixed(1)
    };
  };

  const latest = getLatestReadings();

  return (
    <div className="p-6 max-w-6xl mx-auto">
      <div className="mb-6">
        <h1 className="text-3xl font-bold mb-2">IoT Sensor Dashboard</h1>
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 rounded-full bg-green-500" />
          <span>Simulación Activa</span>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
        <div className="bg-white p-6 rounded-lg shadow">
          <div className="flex items-center gap-2 mb-4">
            <Thermometer className="w-6 h-6 text-blue-500" />
            <h2 className="text-xl font-semibold">Temperatura</h2>
          </div>
          <div className="text-4xl font-bold text-blue-600">{latest.temperature}°C</div>
        </div>

        <div className="bg-white p-6 rounded-lg shadow">
          <div className="flex items-center gap-2 mb-4">
            <Droplets className="w-6 h-6 text-green-500" />
            <h2 className="text-xl font-semibold">Humedad</h2>
          </div>
          <div className="text-4xl font-bold text-green-600">{latest.humidity}%</div>
        </div>
      </div>

      <div className="bg-white p-6 rounded-lg shadow">
        <h2 className="text-xl font-semibold mb-4">Gráfico en Tiempo Real</h2>
        <div className="h-96">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={sensorData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="timestamp" />
              <YAxis yAxisId="temp" domain={[15, 30]} label={{ value: 'Temperatura (°C)', angle: -90, position: 'insideLeft' }} />
              <YAxis yAxisId="humidity" orientation="right" domain={[0, 100]} label={{ value: 'Humedad (%)', angle: 90, position: 'insideRight' }} />
              <Tooltip />
              <Legend />
              <Line yAxisId="temp" type="monotone" dataKey="temperature" stroke="#3b82f6" name="Temperatura" />
              <Line yAxisId="humidity" type="monotone" dataKey="humidity" stroke="#22c55e" name="Humedad" />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
};

export default IoTDashboard;