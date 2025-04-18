document.addEventListener("DOMContentLoaded", () => {
  const cityInput = document.getElementById("city-input");
  const getWeatherBtn = document.getElementById("get-weather-btn");
  const weatherInfo = document.getElementById("weather-info");
  const cityNameDisplay = document.getElementById("city-name");
  const weatherIcon = document.getElementById("icon");
  const tempretureDisplay = document.getElementById("temprature");
  const humidityDisplay = document.getElementById("humidity");
  const descriptionDisplay = document.getElementById("description");
  const windSpeed = document.getElementById("wind");
  const errorMessage = document.getElementById("error-messge");

  const API_key = "6be431ec3503f260eed4aee048a7d25e";

  getWeatherBtn.addEventListener("click", async () => {
    const city = cityInput.value.trim();
    if (!city) {
      showError("Please enter a city name.");
      return;
    }
    try {
      const weatherData = await fetchWeatherData(city);
      displayWeatherData(weatherData);
    } catch (err) {
      if (err.message === "Failed to fetch") {
        showError("No internet connection, please check your network...");
      } else {
        showError(err.message);
      }
    }
  });

  async function fetchWeatherData(city) {
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_key}`;

    const response = await fetch(url);
    if (!response.ok) {
      if (response.status === 404) {
        throw new Error("Invalid city, please check the city name.");
      }
      throw new Error("An error occurred while fetching the data.");
    }
    const data = await response.json();
    return data;
  }

  function displayWeatherData(data) {
    const { name, main, weather, wind } = data;
    cityNameDisplay.textContent = name;
    const temp1 = main.temp;
    const valueofTemp = Math.floor(temp1 - 273.15);
    tempretureDisplay.textContent = `Temperature: ${valueofTemp}°C`;
    humidityDisplay.textContent = `Humidity: ${main.humidity}%`;
    descriptionDisplay.textContent = `Weather: ${weather[0].description}`;
    const imgIcon = weather[0].icon;
    weatherIcon.innerHTML = `<img src="https://openweathermap.org/img/wn/${imgIcon}.png" height="80px" width="80px">`;
    windSpeed.textContent = `Wind Speed: ${wind.speed} m/s`;

    weatherInfo.classList.remove("hidden");
    errorMessage.classList.add("hidden");
  }

  function showError(message) {
    errorMessage.textContent = message;
    weatherInfo.classList.add("hidden");
    errorMessage.classList.remove("hidden");
  }
});
