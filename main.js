const APIKEY = "f2ac8d20afbdb095139ad75551ce12e2";

navigator.geolocation.getCurrentPosition((succPosition) => {
    console.log(succPosition);
    const APIURL = `https://api.openweathermap.org/data/2.5/weather?lat=${succPosition.coords.latitude}&lon=${succPosition.coords.longitude}&appid=${APIKEY}&units=metric`

    getWeatherData(APIURL);

}, () => {
    const city = "New York"
    const APIURL = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${APIKEY}`;
    getWeatherData(APIURL);
});

async function weatherHandler() {



    const city = document.querySelector(".search input").value;
    const APIURL = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${APIKEY}`;


    getWeatherData(APIURL);

}

async function getWeatherData(url) {

    const response = await fetch(url);

    if (response.status > 400) {
        document.querySelector(".error").style.display = "block";
        document.querySelector(".weather").style.display = "none";
        return;
    }

    document.querySelector(".error").style.display = "none";
    const data = await response.json();

    document.querySelector(".weather").style.display = "block";
    document.querySelector(".city").textContent = data.name;
    document.querySelector(".temp").textContent = Math.round(data.main.temp) + "°C";
    document.querySelector(".humidity").textContent = data.main.humidity + "%";
    document.querySelector(".wind").textContent = data.wind.speed + "km/h";
    document.querySelector(".weather-icon").src = "https://openweathermap.org/img/wn/" + data.weather[0].icon + "@2x.png";

}


const searchBtn = document.querySelector(".search button");
const searchInput = document.querySelector(".search input");

searchBtn.addEventListener("click", weatherHandler);

searchInput.addEventListener("keydown", (event) => {
    if (event.key === "Enter") {
        weatherHandler();
    }
});

