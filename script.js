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

  