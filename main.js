const api = {
    key: "b3f40e7ca7cca9cd8900fdaaee6c4c75",
    base: "https://api.openweathermap.org/data/2.5/"
}

const searchbox = document.querySelector('.search-box');
searchbox.addEventListener('keypress', setQuery);

function setQuery(event) {
    if (event.keyCode == 13) { //key code for pressing enter
        getResults(searchbox.value);
    }
}

function getResults(query) {
    fetch(`${api.base}weather?q=${query}&units=metric&appid=${api.key}`)
        .then(weather => {
            return weather.json();
        }).then(displayResults);
}

function displayResults(weather) {
    console.log(weather);
    let city = document.querySelector('.location .city');
    city.innerText = `${weather.name}, ${weather.sys.country}`;

    let now = new Date();
    let date = document.querySelector('.location .date');
    date.innerText = dateBuilder(now);

    if (weather.sys.country === 'US') {
        let temp = document.querySelector('.current .temp');
        temp.innerHTML = ` ${Math.round(32 + (weather.main.temp * 1.8))}<span class="slash">°F</span>    <span class="Celsius">${Math.round(weather.main.temp)}<span class="slashcelsius">°C</span></span> `;
    }
    else {
        let temp = document.querySelector('.current .temp');
        temp.innerHTML = ` <span class="Celsius">${Math.round(32 + (weather.main.temp * 1.8))}<span class="slashcelsius">°F</span></span></span>   ${Math.round(weather.main.temp)}<span class="slash">°C</span>`;
    }
    let weather_el = document.querySelector('.current .weather');
    weather_el.innerText = weather.weather[0].main;

    let hilow = document.querySelector('.current .hi-lo');
    hilow.innerText = `${Math.round(32 + (weather.main.temp_min * 1.8))}/${Math.round(32 + (weather.main.temp_max * 1.8))}°F · ${Math.round(weather.main.temp_min)}/${Math.round(weather.main.temp_max)}°C`;
}

function dateBuilder(d) {
    let months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
    let days = ["Sunday", "Monday", "Tuesday", "Wedday", "Thursday", "Friday", "Saturday"];

    let day = days[d.getDay()];
    let date = d.getDate();
    let month = months[d.getMonth()];
    let year = d.getFullYear();

    return `${day} ${month} ${date}, ${year}`;

}