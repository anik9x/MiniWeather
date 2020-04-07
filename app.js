var darkMode = true;

// function to check whether darkMode is active or not
function check(variable){

  if (variable == true) variable = false
  else variable = true

  return variable
}


// function to handle search bar animations
$(document).ready(function () {

  var currentLocation = getLocation();
  console.log(currentLocation);

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

    $('.name').remove();

    var input = document.getElementById("search").value;
    var city = document.getElementById("img1");
    var block1 = document.getElementById("block1");
    var cityName = document.querySelector(".cityName");
    var textRx = document.querySelector(".tR");
    var textLx = document.querySelector(".tL");
    var textLx2 = document.querySelector(".tL2");

    if (input.includes(',')) var town = stripString(input);
    else town = input;

    var currentWeather = getWeather(town);
    console.log(currentWeather);

    // image icon
    if (darkMode) city.setAttribute("src", "icons/png/cityscape-l.png");
    else city.setAttribute("src", "icons/png/cityscape-d.png");

    city.setAttribute("width", "128");
    city.setAttribute("height", "128");
    city.setAttribute("title", "Town");

    // dashed line
    if (darkMode) block1.setAttribute("style", "border-bottom: 2.5px dashed #9ecfe1");
    else block1.setAttribute("style", "border-bottom: 2.5px dashed #0a2239");

    // city name
    cityName.innerHTML = currentWeather.name + ", " + currentWeather.sys.country;
    
    // arrows
    var arrowL = document.getElementById("aL");
    var arrowR = document.getElementById("aR");

    if (darkMode){
      arrowL.setAttribute("src", "icons/png/arrow-l.png");
      arrowR.setAttribute("src", "icons/png/arrow-l.png");
    } 

    else {
      arrowL.setAttribute("src", "icons/png/arrow-d.png");
      arrowR.setAttribute("src", "icons/png/arrow-d.png");
    }

    arrowL.setAttribute("width", "32");
    arrowL.setAttribute("height", "32");
    arrowR.setAttribute("width", "32");
    arrowR.setAttribute("height", "32");

    // temperature and description
    var currentTemp = Math.round(currentWeather.main.temp);
    textLx.innerHTML = currentTemp + "°C &nbsp;";

    textRx.innerHTML = currentWeather.weather[0].description;
    
    var spaces = "&nbsp; &nbsp; &nbsp;"
    textLx2.innerHTML = Math.round(currentWeather.main.temp_min) + "°C " +
     spaces + "-" + spaces + Math.round(currentWeather.main.temp_max) + "°C" + "&nbsp;";
    
    // set temperature icon
    if (currentTemp > 10 && currentTemp <= 20){

      var tempIcon = document.getElementById("imgLeft");
      
      if (darkMode){
         tempIcon.setAttribute("src", "icons/png/thermometer-warm-l.png");
      }

      else {
        tempIcon.setAttribute("src", "icons/png/thermometer-warm-d.png");
      }

      tempIcon.setAttribute("width", "96");
      tempIcon.setAttribute("height", "96");
      tempIcon.setAttribute("title", "Temperature");
    }

    else if (currentTemp > 20) {

      var tempIcon = document.getElementById("imgLeft");
      
      if (darkMode){
         tempIcon.setAttribute("src", "icons/png/thermometer-hot-l.png");
      }

      else {
        tempIcon.setAttribute("src", "icons/png/thermometer-hot-d.png");
      }

      tempIcon.setAttribute("width", "96");
      tempIcon.setAttribute("height", "96");
      tempIcon.setAttribute("title", "Temperature");
    }

    else if (currentTemp <= 10) {

      var tempIcon = document.getElementById("imgLeft");
      
      if (darkMode){
         tempIcon.setAttribute("src", "icons/png/thermometer-cold-l.png");
      }

      else {
        tempIcon.setAttribute("src", "icons/png/thermometer-cold-d.png");
      }

      tempIcon.setAttribute("width", "96");
      tempIcon.setAttribute("height", "96");
      tempIcon.setAttribute("title", "Temperature");
    } 

    // set weather icon
    var weatherIcon = document.getElementById("imgRight");

    if (darkMode) weatherIcon.setAttribute("src", "icons/png/windy-l.png");
    else weatherIcon.setAttribute("src", "icons/png/windy-d.png");
    weatherIcon.setAttribute("width", "96");
    weatherIcon.setAttribute("height", "96");
    weatherIcon.setAttribute("title", "Current weather description");
  }
})


// function to get data about the current location of the user, using the IPinfo API
function getLocation() {

  var result = null;
  var ipinfo_key = "2c85bba74c2c86"
  var scriptUrl = "https://ipinfo.io?token=" + ipinfo_key;
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


// function to enable dark mode, toggling and changing the necessary styles (css)
function enableDarkMode() {

  var body = document.body;
  var element0 = document.getElementById("search");
  var element1 = document.getElementById("line-1");
  var element2 = document.getElementById("line-2");
  var element3 = document.getElementById("block4");

  var element4 = document.getElementById("textLeft");
  var element5 = document.getElementById("textLeft2");
  var element6 = document.getElementById("textRight");

  var element7 = document.getElementById("block1");
  var el = document.getElementById("name");

  body.classList.toggle("dark-mode");
  element0.classList.toggle("search-dark");
  element1.classList.toggle("line-1-dark");
  element2.classList.toggle("line-2-dark");
  element3.classList.toggle("block4-dark");

  element4.classList.toggle("textLeft-dark");
  element5.classList.toggle("textLeft-dark");
  element6.classList.toggle("textRight-dark");
  element7.classList.toggle("block1-dark");
  el.classList.toggle("name-dark");

  darkMode = check(darkMode); // FIXME:
  console.log("DarkMode: " + darkMode);
}

// function to enable dark mode, toggling and changing the necessary elements (icons)

function myFunction() {

  changeThermo();
  changeScape();
  changeName();
}


function changeThermo() {

  var thermometerPath = "icons/png/thermometer-cold-";
  var thermI = document.getElementById("imgLeft");

  if (thermI.getAttribute("src") === thermometerPath+"d.png") {
    thermI.setAttribute("src", thermometerPath+"l.png");
  } else if (thermI.getAttribute("src") === thermometerPath+"l.png") {
    thermI.setAttribute("src", thermometerPath+"d.png");
  }
}

function changeScape() {

  var cityPath = "icons/png/cityscape-";
  var city = document.getElementById("img1");

  if (city.getAttribute("src") === cityPath+"l.png") {
    city.setAttribute("src", cityPath+"d.png");
  } else if (city.getAttribute("src") === cityPath+"d.png") {
    city.setAttribute("src", cityPath+"l.png");
  }
}

function changeName() {
  
  var el = document.getElementById("imgName");
  if (el.getAttribute("src") === "pic1.png") {
    el.setAttribute("src", "pic2.png");
    el.setAttribute("height", "128");
    el.setAttribute("width", "458");

  }

  else if (el.getAttribute("src") === "pic2.png") {
    el.setAttribute("src", "pic1.png");
    el.setAttribute("height", "128");
    el.setAttribute("width", "458");

  }

}