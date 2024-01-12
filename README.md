# Dog Park Monitor

## Overview

This project implements an IoT solution for digitising the usage of dog parks. The system utilizes an ESP32 microcontroller, IR sensors, and an LED to provide real-time information about the availability of dog parks. The aim is to simplify and effectivise the use and eliminate manual indication of dog park availability.

## Features

- **Real-time Availability:** Quickly identify whether a dog park is available or occupied.
- **User-Friendly Interface:** A web-based frontend offers an intuitive interface for users to check park status.
- **Physical Visualization:** The system provides physical visualization of park availability using LED indicators.

## Technologies Used

- **ESP32 Microcontroller:** Controls the data collection and communication with sensors.
- **IR Sensors:** Detects movement in and out of the park for status indication.
- **LED Lamp:** Physically visualizes the status of each park.
- **Node.js Backend:** Handles incoming data and manages the server-side logic.
- **React Frontend:** Displays real-time park status through a user-friendly web interface.
- **PostgreSQL Database:** Stores historical data for future analysis and visualization.

## How It Works

The ESP32, equipped with IR sensors, continuously monitors the entrance of the dog park. The collected data is transmitted to a Node.js backend hosted on a Rock Pi 4 SE. The backend processes the data and updates a PostgreSQL database. The React frontend fetches and displays this data, providing users with instant information on park availability.

## Challenges and Improvements

- **IR Sensor Reliability:** The system may face challenges with IR sensor reliability in outdoor sunlight.
- **Mobile Network Connectivity:** The use of mobile networks for data transmission via hotspot is not ideal.
- **Scalability:** Transition to a cloud-based server structure for enhanced scalability and security.
- **GSM Module:** Introducing a GSM module could help with mobile network connection simplicity.

## Security

There is in it's current state a lack of security, due to the server setup. Cloud-based solution could streamline the connections and security and maintain that while scaling.

## Result for end-user

