# leaflet-challenge
##Background##

The United States Geological Survey, or USGS for short, is responsible for providing scientific data about natural hazards, the health of our ecosystems and environment, and the impacts of climate and land-use change. Their scientists develop new methods and tools to supply timely, relevant, and useful information about the Earth and its processes.
The USGS is interested in building a new set of tools that will allow them to visualize their earthquake data. They collect a massive amount of data from all over the world each day, but they lack a meaningful way of displaying it. In this challenge, you have been tasked with developing a way to visualize USGS data that will allow them to better educate the public and other government organizations (and hopefully secure more funding) on issues facing our planet.


##Instructions##

Part 1: Create the Earthquake Visualization

The earthquake dataset is from USGS. Visit the link http://earthquake.usgs.gov/earthquakes/feed/v1.0/geojson.php

The map is based on "All Earthquakes from the Past 7 Days", you can change the url in logic.js to change map visulization. 

Import and visualize the data by the following:
Using Leaflet, create a map that plots all the earthquakes from your dataset based on their longitude and latitude.
The data markers reflect the magnitude of the earthquake by their size and the depth of the earthquake by color. Earthquakes with higher magnitudes should appear larger, and earthquakes with greater depth should appear darker in color.
The map also includes popups that provide additional information about the earthquake when its associated marker is clicked.


