var celcius = true; // If true it displays the temperature in celcius
var tempCelcius = 0;
var weatherToImg = {
  "Rain": "photos/rain.png",
  "Clouds": "photos/clouds.png",
  "Clear": "photos/clear.png"
};

$(document).ready(function() {

  // The buttons decide which unit to use for the temperature
  $("#celcius").on("click", function() {
    celcius = true;
    generateTemperatureInfo(tempCelcius);
  });
  $("#fahrenheit").on("click", function() {
    celcius = false;
    generateTemperatureInfo(tempCelcius);
  });

  getPosition();
});

function getPosition() {
  if(navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(generateInfo);
  }
  else {
    $("#region").html("Geolocation failed.");
  }
}

function generateInfo(geoPos) {
  lat = geoPos.coords.latitude;
  lng = geoPos.coords.longitude;
  generateWeatherInfo(lat, lng);
  generateRegionInfo(lat, lng);
}

function convertToFahr(tempC) {
  var tempDec = tempC * 1.8 + 32;
  tempDec = Math.round(tempDec * Math.pow(10, 2)) / Math.pow(10, 2); // Makes the maximum decimal places be 2
  return tempDec;
}

/* Generates the temperature and weather descriptions in the index.html file based on the api*/
function generateWeatherInfo(lat, lng) {
  $.getJSON("https://fcc-weather-api.glitch.me/api/current?lat=" + lat + "&lon=" + lng, function(weatherJson) {

    tempCelcius = weatherJson.main.temp;
    generateTemperatureInfo(tempCelcius);

    var weather = weatherJson.weather[0].main;
    var weatherDesc = weatherJson.weather[0].description;

    $("#weather").html(weatherDesc);
    $("#weather-image").html("<img src='" + weatherToImg[weather] + "' " + "alt='icon for weather'>");
  });
}
/* ----------- */

/* Sets the temperature */
function generateTemperatureInfo(tempC) {
  if (celcius)
    $("#temperature").html(tempC + " &deg;C");

  else {
    tempC = convertToFahr(tempC);
    $("#temperature").html(tempC + " &deg;F");
  }
}
/* -------- */

/* Generates the region based on googles api */
function generateRegionInfo(lat, lng) {
  $.getJSON("https://maps.googleapis.com/maps/api/geocode/json?latlng=" + lat + "," + lng + "&key=AIzaSyDc6D27iS4YU81PiN9OLlLLJIDkkgKX5ws", function(regionJson) {

    var html = "<b>" + regionJson.results[0].formatted_address + "</b>";
    $("#region").html(html);
  });
}
/* ------- */
