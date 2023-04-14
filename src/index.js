/* Captura de los elementos del DOM
 */
const container = document.getElementById("container");
const searchcity = document.getElementById("searchcity");
const hum = document.getElementById("hum");
const pres = document.getElementById("pres");
const search = document.getElementById("search");
const tempcelcius = document.getElementById("tempcelcius");
const weathericon = document.getElementById("weathericon");
const description = document.getElementById("description");
const zone = document.getElementById("zone");
const botton = document.getElementById("plus");
const cristal = document.getElementById("cristal");
const date = document.getElementById("date");
const min = document.getElementById("min");
const max = document.getElementById("max");
const windV = document.getElementById("windvel");
const winang = document.getElementById("winang");
const apiKey = "a00065117a35d1c18108761088dca9fa";
const apiUrl = "https://api.openweathermap.org/data/2.5/weather?lang=sp&units=metric";
const apiUrl2 = "https://api.openweathermap.org/data/2.5/weather?";

/* uso variable global para un semaforo y las coordenadas. mirar a futuro si se puede hacer de otro modo */
let open = 0;
let noGeo = 0;
let crd;
let pos;
/* Función para modificar los elementos */

const displayData = (objeto) => {
    /* captura de hora actual, de amanecer y anochecer */

    const dt = new Date(objeto.dt * 1000);
    const sr = new Date(objeto.sys.sunrise * 1000);
    const ss = new Date(objeto.sys.sunset * 1000);

    /*  Conversion de hora cactual a formato HH:mm */

    const h = dt.getHours().toString().padStart(2, "0");
    const m = dt.getMinutes().toString().padStart(2, "0");
    date.textContent = `${h}:${m}`;

    /*     Comparacion  de hora actual con la hora de amanecer y anochecer para cambiar fondo dia y noche */

    if (objeto.dt > objeto.sys.sunrise && objeto.dt < objeto.sys.sunset) {
        container.classList.remove("night");
        container.classList.add("day");
        /* console.log("dia"); */
    } else {
        container.classList.remove("day");
        container.classList.add("night");
        /* console.log("noche"); */
    };

    /* modificacion otros elementos del Dom */

    zone.textContent = objeto.name + " " + objeto.sys.country;
    tempcelcius.textContent = Math.floor(objeto.main.temp);
    description.textContent = objeto.weather[0].description;
    min.textContent = Math.floor(objeto.main.temp_min);
    max.textContent = Math.floor(objeto.main.temp_max);
    winang.style.transform = "rotate(" + objeto.wind.deg + "deg)";

    windV.textContent = (objeto.wind.speed);
    hum.textContent = (objeto.main.humidity);
    pres.textContent = (objeto.main.pressure / 1000);
    const icon = objeto.weather[0].icon;
    weathericon.innerHTML = `<img src="./icons/${icon}.png"></img>`;
};

/* traer ip */

const getip = async (ct) => {
    try {
        const respuestaRaw = await fetch("http://ip-api.com/json/?fields=61439");
        const respuesta = await respuestaRaw.json();
        /* console.log(respuesta); */

        return respuesta;
    } catch (error) {
        const language = navigator.language.split("-")[1];
        /*         console.log(language);
                                        console.log(ct); */
        (ct == undefined) ? getWheatherData("la roda, ES") : getWheatherData(ct + ", " + language);
    }
};

/* GEOLOCALIZACION */

/* hay acceso a locaclizacion */

function success(pos) {
    crd = pos.coords;
    /*  console.log("modifico crd a "); */
    noGeo = 0;
    /*   console.log(crd); */
    getWheathercoord(crd);/* Llamada a api con lat y lon */
}
/* no hay acceso a locaclizacion */

const error = async (err) => {
    /* console.warn(`ERROR(${err.code}): ${err.message}`); */
    noGeo = 1;
    const cityCountry = await getip();
    getWheatherData(cityCountry.city + ", " + cityCountry.countryCode);
};

/* llamada a la localizacion */

navigator.geolocation.getCurrentPosition(success, error);

/* Llamada a api con ciudad y pais desde form */

const getWheatherData = async (city) => {
    /* compruebo si el usuario ha puesto pais de modo manual */

    if (city.includes(",")) {
        /* Si lo ha hecho */

        const res = await fetch(apiUrl + "&appid=" + apiKey + "&q=" + city);

        const data = await res.json();
        /* console.log(data); */
        if (data.message == "city not found") {
            /*  En caso de no haber coincidencia hago la llamada obviando el pais */
            const city2 = city.split(",")[0];
            const res = await fetch(apiUrl + "&appid=" + apiKey + "&q=" + city2);
            const data = await res.json();
            displayData(data);
        } else {
            /* Si no hay error simplemente mando los datos al dom */
            displayData(data);
        }
    } else if (noGeo === 0) {
        /* no ha metido pais, solo ciudad */
        /* para que de la ciudad mas cercana en caso de varios */
        /*  si esta habilitado el acceso a localizacion */
        /* Hago la llamada reversa a la api para recuperrar pais de la api */

        const pais = await fetch("http://api.openweathermap.org/geo/1.0/reverse?lat=" + crd.latitude + "&lon=" + crd.longitude + "&limit=1&appid=" + apiKey);
        const inicialPais = await pais.json();

        /* console.log(inicialPais[0].country); */

        /* Uso ese pais para convinarlo con la ciudad que ingreso el usuario */

        const res = await fetch(apiUrl + "&appid=" + apiKey + "&q=" + city + ", " + inicialPais[0].country);
        const data = await res.json();

        /* Puede pasar que el usuario busque la ciudad de un pais diferente al que se hace la busqueda y proboque un fallo */

        /* Hago la comprobacion */

        if (data.message == "city not found") {
            /*  En caso de no haber coincidencia hago la llamada obviando el pais */

            const res = await fetch(apiUrl + "&appid=" + apiKey + "&q=" + city);
            const data = await res.json();
            displayData(data);
        } else {
            /* En caso contrario llamo a la funcion de cambio de datos */

            /* console.log(data); */
            displayData(data);
        }

        /* console.log(data); */
        displayData(data);
    } else if (noGeo === 1) {
        /* no ha metido pais, solo ciudad */
        /* para que de la ciudad mas cercana en caso de varios */
        /*  si NO esta habilitado el acceso a localizacion */
        /* Hago la llamada a un a api para teterminar pais con una api de IP */

        const countryCode = await getip(city);

        /* Tras recuperar los datos de la ip uso el pais para hacer la llamada a la api del tiempo */

        const res = await fetch(apiUrl + "&appid=" + apiKey + "&q=" + city + ", " + countryCode.countryCode);
        const data = await res.json();
        /*  console.log(data.message); */

        /* Puede pasar que el usuario busque la ciudad de un pais diferente al que se hace la busqueda y proboque un fallo */

        /* Hago la comprobacion */

        if (data.message == "city not found") {
            /*  En caso de no haber coincidencia hago la llamada obviando el pais */

            const res = await fetch(apiUrl + "&appid=" + apiKey + "&q=" + city);
            const data = await res.json();
            displayData(data);
        } else {
            /* Si no hay error simplemente mando los datos al dom */
            displayData(data);
        }
    };
};

const getWheathercoord = async (coordis) => {
    /*  console.log("pasa por coordenadas"); */

    const lon = coordis.longitude;
    const lat = coordis.latitude;

    const res = await fetch(apiUrl2 + "lat=" + lat + "&lon=" + lon + "&appid=" + apiKey + "&lang=sp&units=metric");

    const data = await res.json();
    /* console.log("pasa por coordenadas"); */
    const send = data;
    /* console.log(data); */

    displayData(send);
};

searchcity.addEventListener("submit", e => {
    e.preventDefault();

    getWheatherData(search.value);
});
botton.addEventListener("click", e => {
    e.preventDefault();
    if (open === 0) {
        cristal.classList.remove("closed");
        cristal.classList.add("opened");
        container.classList.remove("closed2");
        container.classList.add("opened2");
        open = 1;
        botton.textContent = ("-");
    } else {
        cristal.classList.remove("opened");
        cristal.classList.add("closed");
        container.classList.remove("opened2");
        container.classList.add("closed2");
        open = 0;
        botton.textContent = ("+");
    }
});
