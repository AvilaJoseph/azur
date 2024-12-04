require('dotenv').config();
const express = require('express');
const http = require('http');
const WebSocket = require('ws');
const { EventHubConsumerClient } = require('@azure/event-hubs');

const app = express();
const server = http.createServer(app);
const wss = new WebSocket.Server({ server });

const eventHubConnectionString = process.env.EVENTHUB_CONNECTION_STRING;
const eventHubConsumerGroup = process.env.EVENT_HUB_CONSUMER_GROUP;
const port = process.env.PORT || 3001;

// Habilitar CORS para el desarrollo
app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
  next();
});

// Manejar conexiones WebSocket
wss.on('connection', (ws) => {
  console.log('Cliente conectado');

  ws.on('close', () => {
    console.log('Cliente desconectado');
  });
});

// Broadcast a todos los clientes conectados
const broadcast = (data) => {
  wss.clients.forEach((client) => {
    if (client.readyState === WebSocket.OPEN) {
      client.send(JSON.stringify(data));
    }
  });
};

// Conectar a Event Hub
async function startEventHubConsumer() {
  try {
    const consumerClient = new EventHubConsumerClient(
      eventHubConsumerGroup,
      eventHubConnectionString
    );

    console.log('Conectado a Event Hub, esperando mensajes...');

    const subscription = await consumerClient.subscribe({
      processEvents: async (events, context) => {
        for (let event of events) {
          const message = {
            deviceId: event.systemProperties['iothub-connection-device-id'],
            timestamp: new Date().toISOString(),
            data: event.body
          };

          console.log('Mensaje recibido:', message);
          broadcast(message);
        }
      },
      processError: async (err, context) => {
        console.error('Error al procesar mensaje:', err);
      }
    });

    return subscription;
  } catch (err) {
    console.error('Error al conectar con Event Hub:', err);
    throw err;
  }
}

// Iniciar el servidor
server.listen(port, () => {
  console.log(`Servidor escuchando en puerto ${port}`);
  startEventHubConsumer().catch((err) => {
    console.error('Error al iniciar el consumidor:', err);
  });
});