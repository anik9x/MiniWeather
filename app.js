// function to handle search bar animations
$(document).ready(function () {

  var currentLocation = getLocation();
  console.log(currentLocation);

  moveCursorToEnd(".search");

  $('.search').click(function () {
    $('.search').addClass('active');
    $('.search').attr("placeholder", "Enter a town or city");
    $('.search').attr("value", currentLocation.city + ", " + currentLocation.region);
    $('.line-1').css({
      'transform': 'rotate(45deg)',
      'top': '0px',
      'left': '0px'
    });
    $('.line-2').css({
      'height': '40px',
      'opacity': '1'
    });
  });

  $('.line-1, .line-2').click(function () {
    $('.search').removeClass('active').val('');
    $('.search').removeAttr("placeholder");
    $('.line-1').css({
      'transform': 'rotate(-45deg)',
      'top': '-20px',
      'left': '45px'
    });
    $('.line-2').css({
      'height': '0px',
      'opacity': '0'
    });
  });
});


// function to handle user input in the search bar
$(document).keyup(function (event) {

  if ($(".search").is(":focus") && event.key == "Enter") {
    var input = document.getElementById("search").value;
    var city = document.getElementById("img1");
    var block1 = document.getElementById("block1");
    var cityName = document.querySelector(".cityName");

    if (input.includes(',')) {
      var town = stripString(input);
    } else {
      town = input;
    }

    var currentWeather = getWeather(town);
    console.log(currentWeather);

    // image icon
    city.setAttribute("src", "icons/png/cityscape-l.png");
    city.setAttribute("width", "128");
    city.setAttribute("height", "128");
    city.setAttribute("title", "Town");
    // dashed line
    block1.setAttribute("style", "border-bottom: 2.5px dashed #9ecfe1");
    // city name
    cityName.innerHTML = currentWeather.name + ", " + currentWeather.sys.country;
  }
})


// function to get data about the current location of the user, using the IPinfo API
function getLocation() {

  var result = null;
  var ipinfo_key = "2c85bba74c2c86"
  var scriptUrl = "http://ipinfo.io?token=" + ipinfo_key;
  $.ajax({
    url: scriptUrl,
    type: 'get',
    dataType: 'json',
    async: false,
    success: function (data) {
      result = data;
    }
  });

  return result;
}


// function to get data about the current weather in the parameter location, using the OpenWeatherMap API
function getWeather(query) {

  var result = null;
  var openweathermap_key = "b5ae16365c886eecf400246207cd2099"
  var scriptUrl = "https://api.openweathermap.org/data/2.5/weather?q=" + query + "&appid=" + openweathermap_key + "&units=metric";
  $.ajax({
    url: scriptUrl,
    type: 'get',
    dataType: 'json',
    async: false,
    success: function (data) {
      result = data;
    }
  });

  return result;
}


// function to get a 5-day forecast of the weather in the parameter location, using the OpenWeatherMap API
function getForecast(query) {

  var result = null;
  var openweathermap_key = "b5ae16365c886eecf400246207cd2099"
  var scriptUrl = "https://api.openweathermap.org/data/2.5/forecast?q=" + query + "&appid=" + openweathermap_key + "&units=metric";
  $.ajax({
    url: scriptUrl,
    type: 'get',
    dataType: 'json',
    async: false,
    success: function (data) {
      result = data;
    }
  });

  return result;
}


// function to get the wanted icons and their relative paths
function getIcon(icon) {

  console.log(icon)

  for (var i = 0; i < icons.length; i++) {
    if (icons[i].icon == icon) {
      console.log(icons[i].equivalent)
      return icons[i].equivalent
    }
  }
}


const icons = [
    { icon: "01d", equivalent: '25d.png' },
    { icon: "01n", equivalent: '14d.png' },
    { icon: "02d", equivalent: '24d.png' },
    { icon: "02n", equivalent: '23d.png' },
    { icon: "03d", equivalent: '26d.png' },
    { icon: "03n", equivalent: "26d.png" },
    { icon: "04d", equivalent: '26d.png' },
    { icon: "04n", equivalent: '26d.png' },
    { icon: "09d", equivalent: '20d.png' },
    { icon: "09n", equivalent: '20d.png' },
    { icon: "10d", equivalent: '22d.png' },
    { icon: "10n", equivalent: '17d.png' },
    { icon: "11d", equivalent: "21d.png" },
    { icon: "11n", equivalent: '21d.png' },
    { icon: "13d", equivalent: '19d.png' },
    { icon: "13n", equivalent: '19d.png' },
    { icon: "50d", equivalent: '18d.png' },
    { icon: "50n", equivalent: '18d.png' },
];

// function to get the substring on the left hand-side of the (first) comma
function stripString(string) {

  var index = string.indexOf(',');
  var strippedString = string.substring(0, index)

  return strippedString;
}


// function to enable dark mode, toggling and changing all necessary elements and styles
function enableDarkMode() {

  var body = document.body;
  var element1 = document.getElementById("search");
  var element2 = document.getElementById("line-1");
  var element3 = document.getElementById("line-2");

  body.classList.toggle("dark-mode");
  element1.classList.toggle("search-dark");
  element2.classList.toggle("line-1-dark");
  element3.classList.toggle("line-2-dark");
}


function moveCursorToEnd(el) {
  if (typeof el.selectionStart == "number") {
    el.selectionStart = el.selectionEnd = el.value.length;
  } else if (typeof el.createTextRange != "undefined") {
    el.focus();
    var range = el.createTextRange();
    range.collapse(false);
    range.select();
  }
}