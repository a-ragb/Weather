//* Today
let todayName = document.getElementById("today-name");
let monthDay = document.getElementById("month-day");
let monthName = document.getElementById("month-name");
let todayLocation = document.getElementById("location");
let todayTemp = document.getElementById("today-temp");
let todayConditionImg = document.getElementById("today-condition-img");
let todayConditionText = document.getElementById("today-condition-text");
let humidity = document.getElementById("humidity");
let wind = document.getElementById("wind");
let windDirection = document.getElementById("wind-direction");

//* Next Day
let nextDayName = document.getElementsByClassName("next-day-name");
let nextDayConditionImg = document.getElementsByClassName("next-day-condition-img");
let nextDayMaxTemp = document.getElementsByClassName("next-day-max-temp");
let nextDayMinTemp = document.getElementsByClassName("next-day-min-temp");
let nextDayConditionText = document.getElementsByClassName("next-day-condition-text");

//* Find Location
let searchInput = document.getElementById("search");

//* Fetch API Data
async function getData(city) {
    let weatherResponse = await fetch(`http://api.weatherapi.com/v1/forecast.json?key=dc360ad706d34396806131358241912&q=${city}&days=3`);
    let weatherData = await weatherResponse.json();

    return weatherData  
}

//* Display Today Data
function displayToday(data) {
    let todayDate = new Date();
    todayName.innerHTML = todayDate.toLocaleDateString("en-US",{weekday:"long"});
    monthDay.innerHTML = todayDate.getDate();
    monthName.innerHTML = todayDate.toLocaleDateString("en-US",{month:"long"});
    todayLocation.innerHTML = data.location.name;
    todayTemp.innerHTML = data.current.temp_c;
    todayConditionImg.setAttribute("src",data.current.condition.icon);
    todayConditionText.innerHTML = data.current.condition.text;
    humidity.innerHTML = data.current.humidity + "%";
    wind.innerHTML = data.current.wind_kph + "km/h";
    windDirection.innerHTML = data.current.wind_dir;
}

//* Display Next Day Data
function displayNextDays(nextData) {
    let nextDaysData = nextData.forecast.forecastday;
    for (let i = 0; i < 2; i++) {
        let nextDate = new Date(nextDaysData[i+1].date);
        nextDayName[i].innerHTML = nextDate.toLocaleDateString("en-US",{weekday:"long"});
        nextDayMaxTemp[i].innerHTML = nextDaysData[i+1].day.maxtemp_c;
        nextDayMinTemp[i].innerHTML = nextDaysData[i+1].day.mintemp_c;
        nextDayConditionImg[i].setAttribute("src",nextDaysData[i+1].day.condition.icon);
        nextDayConditionText[i].setAttribute("src",nextDaysData[i+1].day.condition.text);
    }
}

//* Start App
async function startApp(input="cairo") {
    let allWeatherData = await getData(input);
    if(!allWeatherData.error) {
        displayToday(allWeatherData);
        displayNextDays(allWeatherData);
    }
}

startApp();

searchInput.addEventListener("input", function(){
    startApp(searchInput.value);
});
