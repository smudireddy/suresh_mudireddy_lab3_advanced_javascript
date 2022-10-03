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

    console.log(wether);

   let city = document.getElementById("loc_city_country");
    city.innerText = `${wether.name}, ${wether.country}`;

}