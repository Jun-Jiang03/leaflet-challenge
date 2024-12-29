// Define the URL to fetch GeoJSON data for earthquakes
const url = "https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/all_week.geojson";

// Create the map object, centered on Vancouver
const myMap = L.map("map", {
  center: [49.2827, -123.1207], // Vancouver coordinates
  zoom: 5, 
});

// Add the tile layer (background map)
L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
  attribution: "&copy; <a href='https://www.openstreetmap.org/copyright'>OpenStreetMap</a> contributors",
}).addTo(myMap);

// Fetch GeoJSON data using D3
d3.json(url).then((data) => {
  // Define a function to style each marker
  function styleInfo(feature) {
    return {
      radius: feature.properties.mag * 4, // Marker size based on magnitude
      fillColor: getColor(feature.geometry.coordinates[2]), // Color based on depth
      color: "#000",
      weight: 0.5,
      opacity: 1,
      fillOpacity: 0.8,
    };
  }

  // Function to determine marker color based on earthquake depth
  function getColor(depth) {
    return depth > 90 ? "#ff5f65" :
           depth > 70 ? "#fca35d" :
           depth > 50 ? "#fdb72a" :
           depth > 30 ? "#f7db11" :
           depth > 10 ? "#dcf400" :
                        "#a3f600";
  }

  // Create a GeoJSON layer with the earthquake data
  L.geoJson(data, {
    // Turn each feature into a circle marker
    pointToLayer: function (feature, latlng) {
      return L.circleMarker(latlng);
    },
    // Style each marker
    style: styleInfo,
    // Add popups with earthquake info
    onEachFeature: function (feature, layer) {
      layer.bindPopup(`
        <h3>${feature.properties.place}</h3>
        <hr>
        <p>Magnitude: ${feature.properties.mag}</p>
        <p>Depth: ${feature.geometry.coordinates[2]} km</p>
        <p>${new Date(feature.properties.time)}</p>
      `);
    },
  }).addTo(myMap);

 // Add a legend to the map
const legend = L.control({ position: "bottomright" });

legend.onAdd = function () {
  const div = L.DomUtil.create("div", "info legend");
  const depths = [-10, 10, 30, 50, 70, 90]; // Depth intervals
  const labels = [];

  // Loop through depth intervals and generate a label with a colored square
  for (let i = 0; i < depths.length; i++) {
    // Get the color for the current depth range
    const color = getColor(depths[i]);

    // Create a label for the legend
    div.innerHTML +=
      '<i style="background:' + color + '"></i> ' +
      depths[i] + (depths[i + 1] ? '&ndash;' + depths[i + 1] + ' km<br>' : '+ km');
  }

  return div;
};

legend.addTo(myMap);
});