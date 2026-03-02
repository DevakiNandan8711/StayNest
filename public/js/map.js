maptilersdk.config.apiKey = window.mapToken || '';

// Default coordinates if something is wrong
const centerCoords = (window.coordinates && window.coordinates.length === 2)
  ? window.coordinates
  : [77.5946, 12.9716]; // Default to Bangalore if missing

const map = new maptilersdk.Map({
  container: 'map', // container's id
  style: maptilersdk.MapStyle.STREETS,
  center: centerCoords,
  zoom: 11,
});

const marker = new maptilersdk.Marker({ color: "red" })
  .setLngLat(centerCoords)
  .setPopup(
    new maptilersdk.Popup({ offset: 25 })
      .setHTML(
        `<h4>${window.locationName || 'StayNest'}</h4><p>Exact location provided after booking</p>`
      )
  )
  .addTo(map);

// Force resize to ensure map fills container properly
map.on('load', () => {
  map.resize();
});
