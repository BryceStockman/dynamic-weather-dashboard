var submitBtn = document.querySelector('.weather-form');
var prevCityBtns = document.querySelector('.prev-city-btns');
var saveCities = [];

var currentDate = moment().format('M/D/YYYY');

function getUserSearchInput() {
  return document.querySelector('.user-city-input').value;
}

function getWeatherFromApi(userCity) {
  saveCities.push(userCity);
  localStorage.setItem('cityWeather', JSON.stringify(saveCities));

  // String Interpolation
  var apiUrl = `https://api.openweathermap.org/data/2.5/forecast?q=${userCity}&cnt=5&units=imperial&APPID=80c991ba85f86514d476eeb47dc91430`;

  if (!userCity) {
    alert('Please enter a valid city');
  }
  try {
    fetch(apiUrl)
      .then((response) => response.json())
      .then((data) => {
        populateCityData(data);
        console.log('api data', data);
      });
  } catch (error) {
    alert('error encountered trying to fetch data');
  }
}

function populateCityData(cityData) {
  populateCityCurrentDate(cityData);
}

function populateCityCurrentDate(city) {
  // var mainContainer = document.querySelector('#main-container');
  // mainContainer.innerHTML = '';
  document.querySelector('.city-weather-display .hide').style.display = 'block';
  var currentCityList = city.list[0];
  var cityNameSelector = document.querySelector('.city-name');
  var cityName = city.city.name;

  cityNameSelector.innerText = `${cityName} (${currentDate})`;

  // temp
  var currentTemp = currentCityList.main.temp;
  var cityTempSelector = document.querySelector('.city-temp span');
  cityTempSelector.innerText = currentTemp;

  // wind
  var currentWind = currentCityList.wind.speed;
  var cityWindSelector = document.querySelector('.city-wind span');
  cityWindSelector.innerText = currentWind;

  // humidity
  var currentHumidity = currentCityList.main.humidity;
  var cityHumiditySelector = document.querySelector('.city-humidity span');
  cityHumiditySelector.innerText = currentHumidity;

  var cloudIcon = currentCityList.weather[0].icon;

  populateForecastData(city);
}

function populateForecastData(city) {
  document.querySelector('.city-forecast-display .hide').style.display =
    'block';

  var currentCityList = city.list;

  // targeting hardcoded container for the display
  var forecastDisplayContainer = document.querySelector('.forecast-display');
  forecastDisplayContainer.innerHTML = '';
  //  FORECAST DATE HEADING
  // creating the h2 element to add to the forecast day container
  forecastHeadingEl = document.createElement('h2');
  forecastHeadingEl.classList.add('forecast-heading', 'col-12', 'm-2', 'p-2');
  // adding the heading text for the forecast day container
  forecastHeadingEl.innerText = '5-Day Forecast: ';
  // adding 1 day forecast to the display container
  forecastDisplayContainer.appendChild(forecastHeadingEl);

  for (var i = 0; i < currentCityList.length; i++) {
    // creating div to go into forecast display container
    var forecastDayEl = document.createElement('div');
    forecastDayEl.classList.add(
      'forecast-day',
      'col',
      'col-md-3',
      'm-2',
      'p-2'
    );
    forecastDisplayContainer.appendChild(forecastDayEl);
    // FORECAST DATE HEADING
    var forecastDate = moment()
      .add(i + 1, 'days')
      .format('M/D/YYYY');
    // FORECAST DAY DATE
    var forecastDateEl = document.createElement('h3');
    forecastDateEl.classList.add('forecast-date', 'text-center');
    forecastDateEl.innerHTML = forecastDate;
    console.log('forecast date: ', forecastDate);
    // adding heading to forecast day container
    forecastDayEl.appendChild(forecastDateEl);

    // ICON
    var forecastIcon = currentCityList[i].weather[0].icon;
    var dayOneIconImage =
      'https://api.openweathermap.org/img/w/' + forecastIcon + '.png';
    // creating container for icon from weather api
    var forecastIconContainer = document.createElement('div');
    forecastIconContainer.classList.add('icon-container', 'd-flex');
    // creating i tag for icon
    var forecastIconEl = document.createElement('img');
    forecastIconEl.setAttribute('src', dayOneIconImage);
    // adding i tag with icon to container
    forecastIconContainer.appendChild(forecastIconEl);
    forecastDayEl.appendChild(forecastIconContainer);

    // TEMP
    // creating temperature p tag for forecast day container
    var dayTemp = document.createElement('p');
    dayTemp.classList.add('day-temp');
    var currentTemp = currentCityList[i].main.temp;
    dayTemp.innerHTML = `Temp: <span>${currentTemp}</span>`;
    // Adding Temp
    forecastDayEl.appendChild(dayTemp);

    // WIND
    // creating temperature p tag for forecast day container
    var dayWind = document.createElement('p');
    dayWind.classList.add('day-wind');
    var currentWind = currentCityList[i].wind.speed;
    dayWind.innerHTML = `Wind: <span>${currentWind}</span>`;
    // Adding Temp
    forecastDayEl.appendChild(dayWind);

    // HUMIDITY
    // creating temperature p tag for forecast day container
    var dayHumidity = document.createElement('p');
    dayHumidity.classList.add('day-humidity');
    var currentHumidity = currentCityList[i].main.humidity;
    dayHumidity.innerHTML = `Humidity: <span>${currentHumidity}</span>`;
    // Adding Temp
    forecastDayEl.appendChild(dayHumidity);
  }
}

function onPageLoad() {
  var getSaveCities = JSON.parse(localStorage.getItem('cityWeather'));
  populatePrevCityBtns(getSaveCities);

  // define a variable of search area
  // for loop array getSaveCities
  // create btn element
  // value of innerHTML = getSaveCities[i]
  // append btn to container
  // outside of function add click events to run functions again use event.target
  // google how to find target of event
}

function populatePrevCityBtns(prevCities = []) {
  var prevCityContainer = document.querySelector('.prev-city-btns');
  prevCities.forEach(function (indexValue) {
    var prevCityBtn = document.createElement('button');
    prevCityBtn.setAttribute('id', indexValue);
    prevCityBtn.classList.add('btn', 'btn-secondary', 'col-8');
    prevCityBtn.innerText = indexValue;
    prevCityContainer.appendChild(prevCityBtn);
  });
}

// On any submit you need to preventDefault
submitBtn.addEventListener('submit', function (event) {
  event.preventDefault();
  getWeatherFromApi(getUserSearchInput());
});

prevCityBtns.addEventListener('click', function (e) {
  e.preventDefault();
  console.log(e.target);
  var prevCityBtn = e.target.innerHTML;
  getWeatherFromApi(prevCityBtn);
});

onPageLoad();

// WIND
// var currentWind = currentCityList.wind.speed;
// var cityWindSelector = document.querySelector('.city-wind span');
// cityWindSelector.innerText = currentWind;
// HUMIDITY
// var currentHumidity = currentCityList.main.humidity;
// var cityHumiditySelector = document.querySelector('.city-humidity span');
// cityHumiditySelector.innerText = currentHumidity;
