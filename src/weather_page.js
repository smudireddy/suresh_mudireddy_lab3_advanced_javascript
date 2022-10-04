const weather_api = {
    appKey: "2701ccad064c6c80e7248d42c6820cd9",
    weatherBaseUrl: "https://api.openweathermap.org/data/2.5/"
}

const citySearch = document.querySelector('.city_name_input');
citySearch.addEventListener('keypress', searchCity);

function searchCity(evt) {
    if (evt.keyCode == 13) {
       const cityName = citySearch.value;
       fetchWeatherDetailsOfTheCity(cityName);
    }
}

function fetchWeatherDetailsOfTheCity(cityName) {
    fetch(`${weather_api.weatherBaseUrl}weather?q=${cityName}&units=metric&APPID=${weather_api.appKey}`).then(weather => {
        console.log(weather);
        return weather.json();
    }).then(displayWetherDetails);
}

function displayWetherDetails(weatherObj) {

   let cityNode = document.getElementById("loc_city_country");
   console.log(cityNode);
   cityNode.innerText = `${weatherObj.name}, ${weatherObj.sys.country}`;

    let now = new Date();
    let dateNode = document.getElementById("weather_stats_date");
    dateNode.innerText = datebuilder(now);

    let temperatureNode = document.querySelector('.current #temperature');
    temperatureNode.innerHTML = `${Math.round(weatherObj.main.temp)}<span>°c</span>`;

    let weatherTypeNode = document.querySelector('.current #weather_type');
    weatherTypeNode.innerText = `${weatherObj.weather[0].main} - \(${weatherObj.weather[0].description}\)`;

    let wetherRangeNode = document.querySelector('.current #wether_range');
    wetherRangeNode.innerText = `${Math.round(weatherObj.main.temp_min)}°c / ${Math.round(weatherObj.main.temp_max)}°c`;
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