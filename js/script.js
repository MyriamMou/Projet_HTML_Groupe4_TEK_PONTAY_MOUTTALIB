const efrei = [48.7889, 2.3631];

const map = L.map('map').setView(efrei, 15);

L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
  maxZoom: 19,
  attribution: '&copy; OpenStreetMap contributors'
}).addTo(map);

const marker = L.marker(efrei).addTo(map);

marker.bindPopup(
  "<b><br></b>Villejuif, France"
).openPopup();

map.on('click', function (e) {
  L.popup()
    .setLatLng(e.latlng)
    .setContent("You clicked: " + e.latlng.toString())
    .openOn(map);
});
setTimeout(() => {
  map.invalidateSize();
}, 200);