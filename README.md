# PP-Cam Dashboard

PP-Cam Dashboard is an Angular-based web application designed to stream video from multiple RTSP cameras using WebSockets. The backend is powered by Node.js and uses `ffmpeg` for video processing and `node-rtsp-stream` for WebSocket streaming.

## Table of Contents

- [Project Overview](#project-overview)
- [Features](#features)
- [Prerequisites](#prerequisites)
- [Installation](#installation)
- [Configuration](#configuration)
- [Running the Application](#running-the-application)
- [Usage](#usage)
- [Troubleshooting](#troubleshooting)
- [License](#license)

## Project Overview

The PP-Cam Dashboard allows users to view live streams from multiple RTSP cameras through a web interface. The server streams the video data from the cameras to the clients using WebSockets, providing real-time video feeds.

## Features

- **Multiple Camera Support**: Stream video from multiple RTSP cameras.
- **WebSocket Streaming**: Efficient streaming using WebSockets for low-latency video feeds.
- **Responsive UI**: Built with Angular to provide a user-friendly interface.
- **Configurable**: Easy configuration via JSON files for camera setup.

## Prerequisites

Before you begin, ensure you have met the following requirements:

- **Node.js**: Version 14.x or higher
- **npm**: Version 6.x or higher
- **ffmpeg**: Installed and accessible from the command line

To install `ffmpeg`, follow the instructions on the [FFmpeg official website](https://ffmpeg.org/download.html).

## Installation

1. **Clone the Repository**:
   ```bash
   git clone https://github.com/adampenn/pp-cam.git
   cd pp-cam
   ```

2. **Reset Git Environment** (If needed):
   If you need to reset the Git environment due to previous issues:
   
   ```bash
   rm -rf .git
   git init
   ```

3. **Set Up New Repository** (If needed):
   If you've reset Git, you'll need to set up your repository again:
   
   ```bash
   echo -e "node_modules/\ndist/\n.env\npp-cam-api/cameraConfig.json\n" > .gitignore
   git add .gitignore
   git commit -m "Add .gitignore"
   ```

   If you have a remote repository, connect it:

   ```bash
   git remote add origin https://github.com/adampenn/pp-cam.git
   ```

   Push your changes:

   ```bash
   git push -u origin main
   ```

4. **Install Backend Dependencies**:
   ```bash
   cd pp-cam-api
   npm install
   ```

5. **Install Frontend Dependencies**:
   ```bash
   cd ../pp-cam-dash
   npm install
   ```

## Configuration

1. **Configure Cameras**:
   - Create a `cameraConfig.json` file in the `pp-cam-api` directory based on the example configuration:
   
   ```json
   {
     "locations": [
       {
         "locationName": "Example Location",
         "cameras": [
           {
             "id": "exampleCamera1",
             "name": "Example Camera 1",
             "rtspUrl": "rtsp://your-camera-rtsp-url"
           }
         ]
       }
     ]
   }
   ```

   > **Note**: Do not push `cameraConfig.json` to the repository if it contains sensitive information. Use a `.gitignore` to prevent this file from being committed.

2. **Set Environment Variables** (Optional):
   - Create a `.env` file in the `pp-cam-api` directory to set any environment variables if needed.

## Running the Application

1. **Start the Backend Server**:
   - Open a terminal and navigate to the `pp-cam-api` directory:
   ```bash
   cd pp-cam-api
   node server.js
   ```
   This will start the server and the WebSocket on the specified port.

2. **Run `ffmpeg` for Streaming**:
   - Open a new terminal and run `ffmpeg` to start streaming:
   ```bash
   ffmpeg -loglevel verbose -i rtsp://your-camera-rtsp-url -f mpegts -codec:v mpeg1video -s 640x480 -b:v 1000k -bf 0 -muxdelay 0.001 tcp://localhost:3000
   ```
   Make sure to replace `rtsp://your-camera-rtsp-url` with the actual RTSP URL of your camera.

3. **Start the Frontend Application**:
   - Open a new terminal and navigate to the `pp-cam-dash` directory:
   ```bash
   cd ../pp-cam-dash
   ng serve
   ```
   This will start the Angular application and serve it on `http://localhost:4200`.

## Usage

1. **Access the Application**:
   - Open your browser and navigate to `http://localhost:4200`.
   - Use the interface to select and view live camera streams.

## Troubleshooting

- **Black Screen on Canvas**:
  - Ensure that the WebSocket server is running and listening on the correct port.
  - Verify that `ffmpeg` is streaming correctly to the server.
  - Check the browser's console and network tab for errors or WebSocket data transfer issues.

- **WebSocket Connection Issues**:
  - Make sure the server is set up to accept WebSocket connections and that the ports match between `ffmpeg` and the WebSocket server.
  - Check if any firewall or network settings might be blocking the connection.

- **`ffmpeg` Errors**:
  - Use `-loglevel verbose` with `ffmpeg` to get detailed output and diagnose any issues with the stream.

## License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for details.