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

    displayData(data);
};
const getWheathercoord = async (coordis) => {
    const lon = coordis.longitude;
    const lat = coordis.latitude;

    const res = await fetch(apiUrl2 + "lat=" + lat + "&lon=" + lon + "&appid=" + apiKey + "&lang=sp&units=metric");

    const data = await res.json();
    const send = data;

    displayData(send);
};

/* window.onload = () => {
    getWheathercoord();
}; */
searchcity.addEventListener("submit", e => {
    e.preventDefault();

    getWheatherData(search.value);
});

const options = {
    enableHighAccuracy: true,
    timeout: 5000,
    maximumAge: 0
};

function success(pos) {
    const crd = pos.coords;

    getWheathercoord(crd);
}

function error(err) {
    console.warn(`ERROR(${err.code}): ${err.message}`);
    getWheatherData("Cordoba, es");
}

navigator.geolocation.getCurrentPosition(success, error, options);
