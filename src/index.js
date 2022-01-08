function formatTime(time) {
    let now = new Date();
    let hours = now.getHours();
    let minutes = now.getMinutes();
    if (hours < 10) {
      hours = `0${hours}`;
    }
    if (minutes < 10) {
      minutes = `0${minutes}`;
    }
    let heading = document.querySelector(`#selector-time`);
    heading.innerHTML = `Last updated at ${hours}:${minutes}h`;
  }
  
  formatTime();
  
  function formatDate(date) {
    let formatDay = new Date();
    let days = [
      "Sunday",
      "Monday",
      "Tuesday",
      "Wednesday",
      "Thursday",
      "Friday",
      "Saturday"
    ];
    let day = days[formatDay.getDay()];
    let calendarDay = formatDay.getDate();
    let months = [
      "01",
      "02",
      "03",
      "04",
      "05",
      "06",
      "07",
      "08",
      "09",
      "10",
      "11",
      "12"
    ];
    let month = months[formatDay.getMonth()];
    let year = formatDay.getFullYear();
  
    let daySelector = document.querySelector(`#selector-day`);
    daySelector.innerHTML = `${day}, ${calendarDay}/${month}/${year}`;
  }
  
  formatDate();
  
  function searchCity(event) {
    event.preventDefault();
    let city = document.querySelector(`#location-selector`).value;
    let heading = document.querySelector(`h1`);
    heading.innerHTML = `${city}`;
    inputCity(city);
  }
  
  let selectForm = document.querySelector(`#form-id, #search-button`);
  selectForm.addEventListener("submit", searchCity);
  
  function inputCity(city) {
    let apiKey = `9b761912c6d0907fc2545d504bce9a80`;
    let apiEndPoint = `api.openweathermap.org`;
    let celsius = `metric`;
    let apiUrl = `https://${apiEndPoint}/data/2.5/weather?q=${city}&appid=${apiKey}&units=${celsius}`;
    axios.get(apiUrl).then(displayWeather);
  }
  
  function displayWeather(response) {
    let heading = document.querySelector(`h1`);
    heading.innerHTML = response.data.name;
    let showCurrentWeather = document.querySelector(`#current-weather`);
    showCurrentWeather.innerHTML = `${response.data.weather[0].description}`;
    let displayWind = document.querySelector(`#wind-selector`);
    displayWind.innerHTML = `Wind: ${Math.round(response.data.wind.speed)} km/h`;
    let displayHumidity = document.querySelector(`#humidity-selector`);
    displayHumidity.innerHTML = `Humidity: ${response.data.main.humidity}%`;
    let displayRealFeel = document.querySelector(`#real-feel`);
    displayRealFeel.innerHTML = `Real feel: ${Math.round(
      response.data.main.feels_like
    )}° C`;
    let celsius = document.querySelector(`#temperature-display`);
    let temperature = Math.round(response.data.main.temp);
    celsius.innerHTML = `Now ${temperature}°C`;
  }
  
  function displayCoordinates(event) {
    event.preventDefault();
    navigator.geolocation.getCurrentPosition(showGeoLocation);
  }
  
  let allowCoordinates = document.querySelector(`#location-button`);
  allowCoordinates.addEventListener(`click`, displayCoordinates);
  
  function showGeoLocation(position) {
    let apiKey = `c8396e2c418b55be7e0e0c31490694b7`;
    let apiEndPoint = `api.openweathermap.org`;
    let celsius = `metric`;
    let latitude = position.coords.latitude;
    let longitude = position.coords.longitude;
    apiUrl = `https://${apiEndPoint}/data/2.5/find?lat=${latitude}&lon=${longitude}&appid=${apiKey}&units=${celsius}`;
    axios.get(apiUrl).then(displayWeather);
  }
  