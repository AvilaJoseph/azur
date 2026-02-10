# Azur

## Real-Time Data Visualization with Azure IoT & React

Azur is a web application built with **React** that visualizes real-time data streamed from a **Phasberry IoT simulator** through **Azure IoT Hub**.

This project demonstrates an end-to-end IoT workflow, from device simulation to cloud ingestion and real-time data visualization in a modern frontend application.

---

## 🧩 Project Overview

A Phasberry simulator emulates an IoT device sending telemetry data to **Azure IoT Hub**.  
The incoming messages are processed and displayed in real time using interactive charts within the React application.

This repository is ideal for exploring IoT architectures, cloud integration, and real-time frontend visualization.

---

## ⚙️ Technologies Used

- **React** – Interactive and real-time web interface
- **Azure IoT Hub** – Secure device-to-cloud communication
- **Phasberry IoT Simulator** – IoT telemetry emulation
- **JavaScript (ES6+)**
- **HTML5 / CSS3**

---

## 📊 Features

- Real-time data visualization
- Interactive charts and dashboards
- Responsive UI
- Cloud-based IoT integration
- Modular and scalable frontend architecture

---

## 🚀 Getting Started

### Prerequisites

Before running this project, make sure you have:

- Node.js (v18 or later recommended)
- An active **Azure account**
- An **Azure IoT Hub** configured
- A **Phasberry IoT simulator** (local or external)

---

## 🔧 Azure IoT Configuration

### 1. Create your Azure IoT Hub

- Create an IoT Hub from the Azure Portal
- Register a new device
- Obtain:
  - IoT Hub hostname
  - Device ID
  - Device connection string

> ⚠️ Each user must configure their **own Azure IoT Hub and device**.  
> Credentials should never be committed to the repository.

---

### 2. Environment Variables

Create a `.env` file in the root of the project:

```env
REACT_APP_IOT_HUB_HOSTNAME=your-iot-hub.azure-devices.net
REACT_APP_DEVICE_ID=your-device-id
