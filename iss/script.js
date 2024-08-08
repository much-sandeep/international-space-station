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
  const lat = data.latitude;
  const long = data.longitude;
  L.marker([lat, long]).addTo(mymap);
  document.getElementById("lat").textContent = lat;
  document.getElementById("long").textContent = long;
}

const entities = [
  {
    name: "Media House",
    employee: "Hardworking",
    number: 1500,
    ceo: "Muskberg",
    rating: 3.9,
    location: "Bangkok",
  },
  {
    name: "Club Cricket",
    employee: "Shenanigans",
    number: 1000,
    ceo: "Patel",
    rating: 3.5,
    location: "Islamabad",
  },
];

function populateEntities() {
  const select = document.getElementById("entitiesList");
  entities.forEach((entity, index) => {
    const option = document.createElement("option");
    option.value = index;
    option.textContent = `${entity.name} (${entity.location})`;
    select.appendChild(option);
  });
}

function showEntityOnMap(index) {
  const entity = entities[index];
  const location = { Bangkok: [13.7563, 100.5018], Islamabad: [33.6844, 73.0479] }[entity.location];
  if (location) {
    L.marker(location).addTo(mymap)
      .bindPopup(`<b>${entity.name}</b><br>CEO: ${entity.ceo}<br>Rating: ${entity.rating}`)
      .openPopup();
    mymap.setView(location, 10);
  }
}

document.getElementById("entitiesList").addEventListener("change", (event) => {
  showEntityOnMap(event.target.value);
});

getISS();
populateEntities();
