// public/js/map.js

// no require – coordinates and mapToken come from the page
maptilersdk.config.apiKey = maptilerToken;

const map = new maptilersdk.Map({
    container: 'map',
    // use the newer v2 style explicitly to avoid deprecation warnings
    style: 'streets-v2',
    center: coordinates,   // passed in from show.ejs
    zoom: 12
});

new maptilersdk.Marker({ color: 'red' })
    .setLngLat(coordinates)
    .addTo(map);
