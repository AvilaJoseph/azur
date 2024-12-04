import React, { useState, useEffect } from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { Thermometer, Droplets } from 'lucide-react';

const WEBSOCKET_URL = 'ws://localhost:3001';

const IoTDashboard = () => {
  const [sensorData, setSensorData] = useState([]);
  const [isConnected, setIsConnected] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const ws = new WebSocket(WEBSOCKET_URL);

    ws.onopen = () => {
      console.log('Conectado al servidor WebSocket');
      setIsConnected(true);
      setError(null);
    };

    ws.onmessage = (event) => {
      const message = JSON.parse(event.data);
      console.log('Mensaje recibido:', message);
      
      setSensorData(prev => {
        const newData = [...prev, {
          timestamp: new Date(message.timestamp).toLocaleTimeString(),
          temperature: message.data.temperature,
          humidity: message.data.humidity
        }].slice(-20); // Mantener solo los últimos 20 puntos
        return newData;
      });
    };

    ws.onerror = (error) => {
      console.error('Error de WebSocket:', error);
      setError('Error de conexión con el servidor');
      setIsConnected(false);
    };

    ws.onclose = () => {
      console.log('Desconectado del servidor WebSocket');
      setIsConnected(false);
    };

    return () => {
      ws.close();
    };
  }, []);

  const getLatestReadings = () => {
    if (sensorData.length === 0) return { temperature: '--', humidity: '--' };
    const latest = sensorData[sensorData.length - 1];
    return {
      temperature: latest.temperature?.toFixed(1) || '--',
      humidity: latest.humidity?.toFixed(1) || '--'
    };
  };

  const latest = getLatestReadings();

  return (
    <div className="p-6 max-w-6xl mx-auto">
      <div className="mb-6">
        <h1 className="text-3xl font-bold mb-2">IoT Sensor Dashboard</h1>
        <h4>Hecho por Joseph Avila</h4>
        <div className="flex items-center gap-2">
          <div className={`w-3 h-3 rounded-full ${isConnected ? 'bg-green-500' : 'bg-red-500'}`} />
          <span>{isConnected ? 'Conectado' : 'Desconectado'}</span>
        </div>
        {error && (
          <div className="mt-2 text-red-500">{error}</div>
        )}
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
              <YAxis yAxisId="temp" domain={[0, 50]} label={{ value: 'Temperatura (°C)', angle: -90, position: 'insideLeft' }} />
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