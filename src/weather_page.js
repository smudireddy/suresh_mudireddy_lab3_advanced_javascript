const weather_api = {
    appKey: "2701ccad064c6c80e7248d42c6820cd9",
    geoBaseUrl: "http://api.openweathermap.org/geo/1.0/",
    weatherBaseUrl: "https://api.openweathermap.org/data/2.5/"
}

let cityGeoDetail = null;
const citySearch = document.querySelector('.city_name_input');
citySearch.addEventListener('keypress', searchCity);

function searchCity(evt) {
    if (evt.keyCode == 13) {
       console.log(citySearch.value);
       const cityName = citySearch.value;
       fetchGeoDetailsOfTheCity(cityName);
    }
}

function fetchGeoDetailsOfTheCity(cityName) {
    fetch(`${weather_api.geoBaseUrl}direct?q=${cityName}&limit=1&APPID=${weather_api.appKey}`).then(weather => {
        console.log(weather);
        return weather.json();
    }).then(fetchWetherDetailsOfTheCity);
}

function fetchWetherDetailsOfTheCity(cityDetails) {
    
    cityGeoDetail = cityDetails[0];

    console.log(cityGeoDetail);

    const lat =  cityGeoDetail.lat;
    const lon =  cityGeoDetail.lon;
    console.log(`${lat} => ${lon}`);

    fetch(`${weather_api.weatherBaseUrl}weather?lat=${lat}&lon=${lon}&units=metric&APPID=${weather_api.appKey}`).then(weather => {

        let resp = weather.json();
        console.log(resp);
        return resp;

    }).then(displayWetherDetails);
}

function displayWetherDetails(weatherObj) {

   console.log(weatherObj);
   
   let cityNode = document.getElementById("loc_city_country");
   console.log(cityNode);
   cityNode.innerText = `${cityGeoDetail.name}, ${cityGeoDetail.country}`;

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