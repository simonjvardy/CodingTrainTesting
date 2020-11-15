// Constructing the Map and Map tiles
// ISS Map function code snippet from leaflet.js containing the method setView with lat & lon as an array and the zoom level
const issMapContainer = L.map('issMap').setView([0, 0], 1);

// Attribution for the use of the OpenStreetMaps Foundation map tiles
//Code adapted from https://leafletjs.com/examples/quick-start/
const attribution = 'Map Data &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors';

// Code adapted from https://leafletjs.com/reference-1.7.1.html#tilelayer 
const mapTilesURL = 'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}{r}.png';
const mapTiles = L.tileLayer(mapTilesURL, { attribution });
mapTiles.addTo(issMapContainer);

// Creating a custom Map Marker icon
// Code adapted from https://leafletjs.com/examples/custom-icons/
const issMapIcon = L.icon({
    iconUrl: '../assets/img/International_Space_Station_200.png',
    iconSize:     [50, 32], // size of the icon
    iconAnchor:   [25, 16], // point of the icon which will correspond to marker's location
});

// Code adapted from https://leafletjs.com/examples/custom-icons/
const ISSMapMarker = L.marker([0, 0], { icon: issMapIcon }).addTo(issMapContainer);

// Where The ISS At? API Endpoints
const iss_api_url_metric = 'https://api.wheretheiss.at/v1/satellites/25544';
const iss_api_url_imperial = 'https://api.wheretheiss.at/v1/satellites/25544?units=miles';

async function getISSDataInMetricUnits() {
    const response = await fetch(iss_api_url_metric);
    const data = await response.json();

    // console.log() the data object properties
    //console.log(data);
    //console.log(data.name);
    //console.log(data.latitude);
    //console.log(data.longitude);
    //console.log(data.altitude);

    // even better, take the data object and place them into an object of separate variables and console.log() the variables
    const {name, latitude, longitude, altitude} = data;
    //console.log(name);
    //console.log(latitude);
    //console.log(longitude);
    //console.log(altitude);

    // Code adapted from https://leafletjs.com/reference-1.7.1.html#marker
    // Changes the marker position to the given point - in this case the latitude & longitude values
    ISSMapMarker.setLatLng([latitude, longitude]);

    // Code adapted from https://leafletjs.com/reference-1.7.1.html#marker
    // Changes the circle position to the given point - - in this case the latitude & longitude values
    // ISSFootprint.setLatLng([latitude, longitude]);


    // Add this into DOM elements
    document.getElementById('name').textContent = name;
    document.getElementById('lat').textContent = latitude;
    document.getElementById('lon').textContent = longitude;
    document.getElementById('alt').textContent = altitude;

}

async function getISSDataInImperialUnits() {
    const response = await fetch(iss_api_url_imperial);
    const data = await response.json();
    console.log(data);
}

getISSDataInMetricUnits();
getISSDataInImperialUnits();
