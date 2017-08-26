var celcius = true; // If true it displays the temperature in celcius
var weatherToImg = {
  "Rain": "photos/rain.png",
  "Clouds": "photos/clouds.png",
  "Clear": "photos/clear.png"
};

$(document).ready(function() {

  // The buttons decide which unit to use for the temperature
  $("#celcius").on("click", function() {
    celcius = true;
    var latlng = getLatLng();
    generateWeatherInfo(latlng.latitude, latlng.longitude);
  });
  $("#fahrenheit").on("click", function() {
    celcius = false;
    var latlng = getLatLng();
    generateWeatherInfo(latlng.latitude, latlng.longitude);
  });

  var latlng = getLatLng();
  generateWeatherInfo(latlng.latitude, latlng.longitude);

  generateRegionInfo(latlng.latitude, latlng.longitude);
});

/* Returns a dictionary with two elements. The first one being lat and the second lng */
function getLatLng() {
  var latlng = {};
  if(navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(function(pos) {

      latlng = {"latitude": pos.coords.latitude, "longitude": pos.coords.longitude};
    });
  }
  return latlng
}
/* --------- */

function convertToFahr(tempC) {
  return tempC * 9/5 + 32;
}

/* Generates the temperature and weather descriptions in the index.html file based on the api*/
function generateWeatherInfo(lat, lng) {
  $.getJSON("https://fcc-weather-api.glitch.me/api/current?lat=" + lat + "&lon=" + lng, function(weatherJson) {

    var temperature = weatherJson.main.temp;
    if (celcius)
      $("#temperature").html(temperature + " &deg;C");

    else {
      temperature = convertToFahr(temperature);
      $("#temperature").html(temperature + " &deg;F");
    }

    var weather = weatherJson.weather[0].main;
    var weatherDesc = weatherJson.weather[0].description;

    $("#weather").html(weatherDesc);
    $("#weather-image").html("<img src='" + weatherToImg[weather] + "' " + "alt='icon for weather'>");
  });
}
/* ----------- */

/* Generates the region based on googles api */
function generateRegionInfo(lat, lng) {
  $.getJSON("https://maps.googleapis.com/maps/api/geocode/json?latlng=" + lat + "," + lng + "&key=AIzaSyDc6D27iS4YU81PiN9OLlLLJIDkkgKX5ws", function(regionJson) {

    var html = "<b>" + regionJson.results[0].formatted_address + "</b>";
    $("#region").html(html);
  });
}
/* ------- */
