const weather_api = {
    appKey: "2701ccad064c6c80e7248d42c6820cd9",
    baseUrl: "http://api.openweathermap.org/geo/1.0/"
}

const citySearch = document.querySelector('.city_name_input');
citySearch.addEventListener('keypress', searchCity);

function searchCity(evt) {
    if (evt.keyCode == 13) {
       console.log(citySearch.value);
       const cityName = citySearch.value;
       fetchWetherDetailsOfTheCity(cityName);
    }
}

function fetchWetherDetailsOfTheCity(cityName) {

    fetch(`${weather_api.baseUrl}direct?q=${cityName}&limit=1&APPID=${weather_api.appKey}`).then(weather => {
        return weather.json()
    }).then(displayWetherDetails);
}

function displayWetherDetails(weather) {

    console.log(weather);

   let cityNode = document.getElementById("loc_city_country");
   console.log(cityNode);
   cityNode.innerText = `${weather.name}, ${weather.country}`;

    let now = new Date();
    let dateNode = document.getElementById("weather_stats_date");
    dateNode.innerText = datebuilder(now);

    let temperatureNode = document.querySelector('.current #temperature');
    temperatureNode.innerHTML = `${Math.round(weather.main.temp)}<span>°c</span>`;

    let weatherTypeNode = document.querySelector('.current #weather_type');
    weatherTypeNode.innerText = `${weather.weather[0].main}`;

    let wetherRangeNode = document.querySelector('.current #wether_range');
    wetherRangeNode.innerText = `${Math.round(weather.main.temp_min)}°c / ${Math.round(weather.main.temp_max)}°c`;
}

function datebuilder(d) {
    let months = ["January", "February", "March", "April", "May", "June", "July", "August", "Septemebr", "October", "November", "December"];

    let days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];

    let day = days[d.getDay()];
    let date = d.getDate();
    let month = months[d.getMonth()];
    let year = d.getFullYear();

    return `${day} ${month} ${year}`;
}