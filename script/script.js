const apiKey = "eddd83c8e0964752ec3d4713e5467e4d";
const apiURL = "https://api.openweathermap.org/data/2.5/weather?units=metric&q=";
const search = document.querySelector(".search input");
const btn = document.querySelector(".search button");
const icon = document.querySelector(".weather-icon");
const countAPI = "http://api.weatherapi.com/v1/current.json?q="
const countKey = "be464b2cfbd9441c8b8192831232005";

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
