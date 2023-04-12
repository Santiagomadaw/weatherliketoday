/* API Openweathermap */
/* Captura de los elementos del dom para su posterior
modificacion */

const container = document.getElementById("container");
const searchcity = document.getElementById("searchcity");
const search = document.getElementById("search");
const tempcelcius = document.getElementById("tempcelcius");
const weathericon = document.getElementById("weathericon");
const description = document.getElementById("description");
const zone = document.getElementById("zone");
const date = document.getElementById("date");
const min = document.getElementById("min");
const max = document.getElementById("max");

const displayData = (objeto) => {
    const dt = new Date(objeto.dt * 1000);
    const sr = new Date(objeto.sys.sunrise * 1000);
    const ss = new Date(objeto.sys.sunset * 1000);
    const h = dt.getHours().toString().padStart(2, "0");
    const m = dt.getMinutes().toString().padStart(2, "0");
    date.textContent = `${h}:${m}`;

    console.log(sr);
    console.log(objeto.dt > objeto.sys.sunrise);
    console.log(dt);
    console.log(objeto.dt > objeto.sys.sunset);
    console.log(ss);

    if (objeto.dt > objeto.sys.sunrise && objeto.dt < objeto.sys.sunset) {
        container.classList.remove("night");
        container.classList.add("day");
        console.log("dia");
    } else {
        container.classList.remove("day");
        container.classList.add("night");

        console.log("noche");
    };
    zone.textContent = objeto.name;

    tempcelcius.textContent = Math.floor(objeto.main.temp);
    description.textContent = objeto.weather[0].description;
    min.textContent = Math.floor(objeto.main.temp_min);
    max.textContent = Math.floor(objeto.main.temp_max);
    const icon = objeto.weather[0].icon;
    weathericon.innerHTML = `<img src="./icons/${icon}.png"></img>`;
};

/* const displayBackground = () => {

}; */
const apiKey = "a00065117a35d1c18108761088dca9fa";
const apiUrl = "https://api.openweathermap.org/data/2.5/weather?lang=sp&units=metric";
const apiUrl2 = "https://api.openweathermap.org/data/2.5/weather?";
const getWheatherData = async (city) => {
    const res = await fetch(apiUrl + "&appid=" + apiKey + "&q=" + city, options);
    const data = await res.json();

    displayData(data);
    console.log(data);
};
const getWheathercoord = async (coordis) => {
    const lon = coordis.longitude;
    const lat = coordis.latitude;

    const res = await fetch(apiUrl2 + "lat=" + lat + "&lon=" + lon + "&appid=" + apiKey + "&lang=sp&units=metric");

    const data = await res.json();
    const send = data;
    console.log(data);

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
    console.log(pos.coords);
    getWheathercoord(crd);
}

function error(err) {
    console.warn(`ERROR(${err.code}): ${err.message}`);
    getWheatherData("Cordoba, es");
}

navigator.geolocation.getCurrentPosition(success, error, options);
