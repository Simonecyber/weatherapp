




const api_key = process.env.APY_KEY;
const baseurl = "http://api.openweathermap.org/data/2.5/";


const lang = "it";

//geolocalizzazione parte appena aperto il sito chiedendo il consenso
window.addEventListener("load", () => {
    let long;
    let lat;

    navigator.geolocation.getCurrentPosition(position => {
        long = position.coords.longitude;
        lat = position.coords.latitude;

        //recupero file JSON
        fetch(`${baseurl}weather?lat=${lat}&lon=${long}&units=metric&lang=it&appid=${api_key}`)
        .then(weather => {
            return weather.json();

        })
        .then (displayResults)

    });
});

//selezione del riquadro di ricerca
const searchBox = document.querySelector('.search-box');
searchBox.addEventListener('keypress', setQuery);

 function setQuery(evt) {
    if (evt.keyCode == 13) {
        getResults(searchBox.value);
    }
 }

 //funzione per recuperare file JSON 
 function getResults (query) {
    fetch(`${baseurl}weather?q=${query}&units=metric&lang=it&APPID=${api_key}`)
    .then(weather => {
        return weather.json();
    }).then(displayResults)
 }

 //Funzione che mostra i dati

 function displayResults (weather) {
    //console.log(weather);
    //Dati principali
    let city = document.querySelector('.location .city');
    city.innerText = `${weather.name}, ${weather.sys.country}`;

    let now = new Date();
    let date = document.querySelector('.location .date');
    date.innerText = dateBuilder(now);

    let temp = document.querySelector('.current .temp');
    temp.innerHTML = `${Math.round(weather.main.temp)}<span>°C</span>`;

    let weather_el = document.querySelector('.current .weather');
    weather_el.innerText = (weather.weather[0].description).toUpperCase();

//icone tempo
    let iconWeather = document.querySelector('.imgContainer');
    iconWeather.innerHTML = `<img class="iconeTempo" src="icone/${weather.weather[0].icon}.png"/>`;

//dati minori
    let hi = document.querySelector('.hi ');
    hi.innerHTML = `<span style="margin-right:10px;">Temperatura max:</span>${Math.round(weather.main.temp_max)}°C`;

    let low = document.querySelector('.low ');
    low.innerHTML = `<span style="margin-right:10px;">Temperatura min:</span>${Math.round(weather.main.temp_min)}°C <br><br>`;

   let sunrise = document.querySelector('.alba');
   sunrise.innerHTML = `<sp
   an style="margin-right:10px;">Il sole sorge alle:</span>${msToTime(weather.sys.sunrise)}`;

   let sunset = document.querySelector('.tramonto');
   sunset.innerHTML = `<span style="margin-right:10px;">Il sole tramonta alle:</span>${msToTime(weather.sys.sunset)}`;

};


//funzione costruzione data
function dateBuilder (d){
    let months = ["Gennaio","Febbraio", "Marzo", "Aprile", "Maggio", "Giugno", "Luglio", 
    "Agosto", "Settembre", "Ottobre", "Novembre", "Dicembre"];
    let days = ["Domenica", "Lunedì", "Martedì", "Mercoledì", "Giovedì", "Venerdì", "Sabato"];

    let day = days[d.getDay()];
    let date = d.getDate();
    let month = months[d.getMonth()];
    let year = d.getFullYear();

    return `${day} ${date} ${month} ${year}`;
};

//funzione costruzione tempo per alba e tramonto

function msToTime(msDurata) {
    let date =  new Date (msDurata * 1000);
    let hours = date.getHours();
    let minutes = "0" + date.getMinutes();

    return hours + ':' + minutes.substr(-2);
}