// public/js/map.js

// no require – coordinates and mapToken come from the page
maptilersdk.config.apiKey = mapToken;

const map = new maptilersdk.Map({
    container: 'map',
    style: maptilersdk.MapStyle.STREETS,
    center: coordinates,   // passed in from show.ejs
    zoom: 12
});

new maptilersdk.Marker({ color: 'red' })
    .setLngLat(coordinates)
    .addTo(map);
