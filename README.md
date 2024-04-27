# Smart Helmet Application


Mobile-AR integration for smart helmets, enhancing safety and functionality with real-time data overlays. 

## Description

Our innovative kitchen management application, developed using Angular CLI and Node.js, revolutionizes household organization with intuitive interfaces for efficient inventory control and heightened productivity. Tested and refined during the HY469 course, this mobile application seamlessly integrates with various smart devices within a smart home environment located in ITE FORTH, including fridge panels, bathroom panels, and table panels.

## Overview

Our application empowers users to effortlessly organize their shopping experiences by providing comprehensive insights into their household needs. It intelligently identifies products that require replenishment across different areas of the house, such as the kitchen and bathroom, while offering a curated smart list featuring real-time price updates from local vendors. Users can conveniently track purchased items and allocate them to designated spaces, such as the fridge, enhancing overall household efficiency. Moreover, the application offers an extensive library of recipes tailored to the ingredients available in the kitchen, inspiring culinary creativity and minimizing food waste. Additionally, users can stay informed about exclusive offers and monitor the status of household products, ensuring timely restocking and optimal utilization.

## Key Features
* **Real-Time Navigation**: Navigate with ease using a map display that provides live updates of your surroundings, ensuring efficient travel from point A to point B.
* **Weather Updates**: Stay informed about current weather conditions along your route, allowing for better planning and preparation.
* **Speed Tracking**: Monitor your speed in real-time, promoting safe and responsible driving practices.
* **Location Saving**: Save important locations for quick access and seamless navigation to frequently visited destinations.
* **Integration of External Sensors**: Utilize external sensors like alcohol detectors to enhance safety while driving, providing alerts and ensuring responsible behavior.
* **Post-Trip Analysis**: Review detailed insights and analysis of your journey after reaching your destination, facilitating continuous improvement in driving habits and decision-making.

## Screenshots

| ![Gif](Screenshots/Frontend-GoogleChrome2024-04-2711-23-00online-video-cutter.com1-ezgif.com-video-to-gif-converter.gif) | ![Shlist](Screenshots/search.png) | ![Shlist](Screenshots/maps.png) |
|:---:|:---:|:---:|
| Initialize the app | Search | Maps | 

| ![Shlist](Screenshots/saved.png) | ![Shlist](Screenshots/new_loc.png) | ![Shlist](Screenshots/type.png) 
|:---:|:---:|:---:|
| Saved Location | New Location | Type of Location | 

## Installation 

What you will need:
* NodeJS
* Angular
* MongoDB

Tested on: 
* NodeJS v18.12.1
* Angular v14.2.8
* MongoDB v4.4

### Useful commands
Before running the application and after every new node_module is installed using `npm install @package-name`, all project members must execute in both *`backend`* and *`frontend`*:
```sh
npm install
``` 

For frontend, inside *`frontend`* folder:

> Run frontend:
```sh
ng serve
```

> Run frontend (open access from other devices using server's IP):
```sh
ng serve --host 0.0.0.0
```

For backend, inside *`backend`* folder:
> Run backend:
```sh
npm run dev
```

**Do not forget**: mongod.exe (if on Windows) must be running for the Database to be used. 
