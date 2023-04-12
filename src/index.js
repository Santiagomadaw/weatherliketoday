/* API Openweathermap */
/* Captura de los elementos del dom para su posterior
modificacion */

/* const container = document.getElementById("container"); */
const searchcity = document.getElementById("searchcity");
const search = document.getElementById("search");
const tempcelcius = document.getElementById("tempcelcius");
const weathericon = document.getElementById("weathericon");
const description = document.getElementById("description");
const zone = document.getElementById("zone");
/* const date = document.getElementById("date"); */
const min = document.getElementById("min");
const max = document.getElementById("max");

const displayData = (objeto) => {
    zone.textContent = objeto.name;
    console.log("que pasa qui¿");
    console.log(objeto.name);

    tempcelcius.textContent = Math.floor(objeto.main.temp);
    description.textContent = objeto.weather[0].description;
    min.textContent = Math.floor(objeto.main.temp_min);
    max.textContent = Math.floor(objeto.main.temp_max);
    const icon = objeto.weather[0].icon;
    weathericon.innerHTML = `<img src="./icons/${icon}.png"></img>`;
    console.log(icon);
};

/* const displayBackground = () => {

}; */
const apiKey = "a00065117a35d1c18108761088dca9fa";
const apiUrl = "https://api.openweathermap.org/data/2.5/weather?lang=sp&units=metric";
const apiUrl2 = "https://api.openweathermap.org/data/2.5/weather?";
const getWheatherData = async (city) => {
    const res = await fetch(apiUrl + "&appid=" + apiKey + "&q=" + city);
    const data = await res.json();
    console.log(data);
    displayData(data);
};
const getWheathercoord = async (coordis) => {
    const lon = coordis.longitude;
    const lat = coordis.latitude;
    console.log("hola");
    console.log(lat);
    const res = await fetch(apiUrl2 + "lat=" + lat + "&lon=" + lon + "&appid=" + apiKey + "&lang=sp&units=metric");
    console.log("hola");
    console.log(lat);
    const data = await res.json();
    const send = data;
    console.log(send);
    displayData(send);
};

/* window.onload = () => {
    getWheathercoord();
}; */
searchcity.addEventListener("submit", e => {
    e.preventDefault();
    console.log(search.valeu);
    getWheatherData(search.value);
});

const options = {
    enableHighAccuracy: true,
    timeout: 5000,
    maximumAge: 0
};

function success(pos) {
    const crd = pos.coords;

    console.log("Tu ubicación actual es:");
    console.log(`Latitud : ${crd.latitude}`);
    console.log(`Longitud: ${crd.longitude}`);
    console.log(`Más o menos ${crd.accuracy} metros.`);

    getWheathercoord(crd);
}

function error(err) {
    console.warn(`ERROR(${err.code}): ${err.message}`);
    getWheatherData("Cordoba, es");
}

navigator.geolocation.getCurrentPosition(success, error, options);
