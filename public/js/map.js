maptilersdk.config.apiKey = mapToken;

const map = new maptilersdk.Map({
  container: 'map', // container's id or the HTML element to render the map
  style: maptilersdk.MapStyle.STREETS,
  center: coordinates,
  zoom: 9,
});

const marker = new maptilersdk.Marker({ color: "red" })
  .setLngLat(coordinates)
  .setPopup(new maptilersdk.Popup({ offset: 25 }).setHTML(`<h4>${locationName}</h4><p>Exact location of booked StayNest</p>`))
  .addTo(map);
