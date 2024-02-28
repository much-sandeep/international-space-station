const mymap = L.map("issMap").setView([0, 0], 2);
const attri = L.tileLayer("https://tile.openstreetmap.org/{z}/{x}/{y}.png", {
  maxZoom: 19,
  attribution:
    '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>',
}).addTo(mymap);

const api_url = "https://api.wheretheiss.at/v1/satellites/25544";
async function getISS() {
  const response = await fetch(api_url);
  const data = await response.json();
  L.marker([data.latitude, data.longitude]).addTo(mymap);
  document.getElementById("lat").textContent = data.latitude;
  document.getElementById("long").textContent = data.longitude;
}
getISS();
