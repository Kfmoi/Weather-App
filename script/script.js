
const apiKey = process.env.API_KEY;
const apiURL = "https://api.openweathermap.org/data/2.5/weather?units=metric&q=";
const search = document.querySelector(".search input");
const btn = document.querySelector(".search button");
const icon = document.querySelector(".weather-icon");
const countAPI = "http://api.weatherapi.com/v1/current.json?q="
const countKey = process.env.COUNT_KEY;
const more = document.querySelector(".read-more button");

async function getWeather(city) {
    const response = await fetch(apiURL + city + `&appid=` + apiKey);
    const response2 = await fetch(countAPI + city + `&key=` + countKey);
    if (response.status == 404) {
        document.querySelector(".error").style.display = "block";
        document.querySelector(".weather").style.display = "none";
        document.querySelector(".read-more").style.display = "none";
    } else{
    var data2 = await response2.json();
    console.log(data2);
    var data = await response.json();
    console.log(data);

    document.querySelector(".city").innerHTML = data.name;
    document.querySelector(".country").innerHTML = data2.location.country;
    document.querySelector(".feels-like").innerHTML = "Feels like: " + Math.round(data2.current.feelslike_c) + "°C";
    document.querySelector(".temperature").innerHTML = Math.round(data.main.temp) + "°C";
    document.querySelector(".humidity").innerHTML = data.main.humidity + "%";
    document.querySelector(".wind").innerHTML = data.wind.speed + "km/h";
    document.querySelector(".gust").innerHTML = "Gust Speed(km/h): " + data2.current.gust_kph;
    document.querySelector(".prec").innerHTML = "Precipitation(mm): " + data2.current.precip_mm;
    document.querySelector(".vis").innerHTML = "Visibility(km): " + data2.current.vis_km;
    document.querySelector(".wind-dir").innerHTML = "Wind Direction: " + data2.current.wind_dir;
    document.querySelector(".wind-deg").innerHTML = "Wind Degree: " + data2.current.wind_degree + "°";
    document.querySelector(".pres").innerHTML = "Pressure(mb): " + data2.current.pressure_mb;


    if (data.weather[0].main == "Clouds") {
        icon.src = "images/cloudy.png";
    } else if (data.weather[0].main == "Clear") {
        icon.src = "images/sunny.png";
    } else if (data.weather[0].main == "Rain") {
        icon.src = "images/rain.png";
    } else if (data.weather[0].main == "Snow") {
        icon.src = "images/snow.png";
    } else if (data.weather[0].main == "Mist") {
        icon.src = "images/mist.png";
    } else if (data.weather[0].main == "Drizzle") {
        icon.src = "images/drizzle.png";
    }

    document.querySelector(".weather").style.display = "block";
    document.querySelector(".read-more").style.display = "block";
    document.querySelector(".error").style.display = "none";
}

}

btn.addEventListener("click", () => {
    getWeather(search.value);
});

more.addEventListener("click", () => {
    if (document.querySelector(".read-more button").innerHTML == "Collapse") {
        document.querySelector(".more-title").style.display = "none";
        document.querySelector(".more-info").style.display = "none";
        document.querySelector(".read-more button").innerHTML = "More Info";
    } else {
    document.querySelector(".more-title").style.display = "block";
    document.querySelector(".more-info").style.display = "flex";
    document.querySelector(".read-more button").innerHTML = "Collapse";
    }
});
