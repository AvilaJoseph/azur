// src/App.jsx
import React from 'react';
import IoTDashboard from './IoTDashboard';

function App() {
  return (
    <div className="min-h-screen bg-gray-100 dark:bg-gray-900">
      <nav className="bg-white dark:bg-gray-800 shadow-md">
        <div className="max-w-6xl mx-auto px-4 py-3">
          <h1 className="text-xl font-bold text-gray-800 dark:text-white">
            Azure IoT Hub Monitor
          </h1>
        </div>
      </nav>
      
      <main className="px-4 py-6">
        <IoTDashboard />
      </main>
      
      <footer className="bg-white dark:bg-gray-800 shadow-md mt-8">
        <div className="max-w-6xl mx-auto px-4 py-3 text-center text-gray-600 dark:text-gray-400">
          <p>© 2024 IoT Dashboard. Powered by Azure IoT Hub</p>
        </div>
      </footer>
    </div>
  );
}

export default App;