function initPage() {
  var cityEl = document.getElementById("search-city");
  var searchEl = document.getElementById("search-button");
  var currentPicEl = document.getElementById("today-icon");
  var todayweatherEl = document.getElementById("today");
  var historyEl = document.getElementById("srch-hist");

  var fivedayEl = document.getElementById("five-day-forecast");
  var currentTempEl = document.getElementById("temp");
  var nameEl = document.getElementById("city-name");

  var humidityEl = document.getElementById("humidity");
  var windSpeedEl = document.getElementById("wind-speed");

  var searchHistory = JSON.parse(localStorage.getItem("search")) || [];

  var APIKey = "19ff27d58878fbfbde8d49f03af51948";
  // 19ff27d58878fbfbde8d49f03af51948

  var city;

  var queryURL =
    "http://api.openweathermap.org/data/2.5/weather?q=" +
    city +
    "&appid=" +
    APIKey;

  fetch(queryURL);

  function reqWeather(cityName) {
    var queryURL =
      "https://api.openweathermap.org/data/2.5/weather?q=" +
      cityName +
      "&appid=" +
      APIKey;
    axios.get(queryURL).then(function (response) {
      todayweatherEl.classList.remove("d-none");

      var currentDate = new Date(response.data.dt * 1000);
      var day = currentDate.getDate();
      var month = currentDate.getMonth() + 1;
      var year = currentDate.getFullYear();
      nameEl.textContent =
        response.data.name + " (" + month + "/" + day + "/" + year + ") ";
      var forecastPic = response.data.weather[0].icon;
      currentPicEl.setAttribute(
        "src",
        "https://openweathermap.org/img/wn/" + forecastPic + "@4x.png"
      );
      currentPicEl.setAttribute("alt", response.data.weather[0].description);
      currentTempEl.innerHTML =
        "Temperature: " + tempConvert(response.data.main.temp) + " &#176F";
      humidityEl.textContent = "Humidity: " + response.data.main.humidity + "%";
      windSpeedEl.textContent = "Wind: " + response.data.wind.speed + " MPH";

      var cityID = response.data.id;
      var forecastQueryURL =
        "https://api.openweathermap.org/data/2.5/forecast?id=" +
        cityID +
        "&appid=" +
        APIKey;
      axios.get(forecastQueryURL).then(function (response) {
        fivedayEl.classList.remove("d-none");

        var forecastEls = document.querySelectorAll(".forecast");
        for (i = 0; i < forecastEls.length; i++) {
          forecastEls[i].textContent = "";
          var forecastIndex = i * 8 + 4;
          var forecastDate = new Date(
            response.data.list[forecastIndex].dt * 1000
          );
          var forecastDay = forecastDate.getDate();
          var forecastMonth = forecastDate.getMonth() + 1;
          var forecastYear = forecastDate.getFullYear();
          var forecastDateEl = document.createElement("p");
          forecastDateEl.setAttribute("class", "m-2 mb-0 forecast-date");
          forecastDateEl.textContent =
            forecastMonth + "/" + forecastDay + "/" + forecastYear;
          forecastEls[i].append(forecastDateEl);

          var weatherEl = document.createElement("img");
          weatherEl.setAttribute(
            "src",
            "https://openweathermap.org/img/wn/" +
              response.data.list[forecastIndex].weather[0].icon +
              "@2x.png"
          );
          weatherEl.setAttribute(
            "alt",
            response.data.list[forecastIndex].weather[0].description
          );
          forecastEls[i].append(weatherEl);
          var forecastTempEl = document.createElement("p");
          forecastTempEl.innerHTML =
            "Temp: " +
            tempConvert(response.data.list[forecastIndex].main.temp) +
            " &#176F";
          forecastEls[i].append(forecastTempEl);
          var forecastHumidityEl = document.createElement("p");
          forecastHumidityEl.textContent =
            "Humidity: " +
            response.data.list[forecastIndex].main.humidity +
            "%";
          forecastEls[i].append(forecastHumidityEl);
        }
      });
    });
  }

  function tempConvert(K) {
    return Math.floor((K - 273.15) * 1.8 + 32);
  }
