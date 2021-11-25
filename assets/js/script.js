var submitBtn = document.querySelector('.weather-form');
// On any submit you need to preventDefault
submitBtn.addEventListener('submit', function (event) {
  event.preventDefault();
  getWeatherFromApi(getUserSearchInput());
});

function getUserSearchInput() {
  console.log(document.querySelector('.user-city-input').value);
  return document.querySelector('.user-city-input').value;
}

function getWeatherFromApi(userCity) {
  if (!userCity) {
    alert('Please enter a valid city');
  }
  try {
    fetch(
      // String Interpolation
      `https://api.openweathermap.org/data/2.5/forecast?q=${userCity}&cnt=5&units=imperial&APPID=80c991ba85f86514d476eeb47dc91430`
    )
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        populateCityData(data);
      });
  } catch (error) {
    console.log('error encountered trying to fetch data', error);
  }
}

function populateCityData(cityData) {
  // 5 day forecast - 5 days
  // picture of weather
  // temp
  // wind
  // humidity
  populateCityCurrentDate(cityData);
}

function populateCityCurrentDate(city) {
  document.querySelector('.city-weather-display .hide').style.display = 'block';
  var currentCityList = city.list[0];
  var cityNameSelector = document.querySelector('.city-name');
  var currentDate = currentCityList.dt_txt;
  var cityName = city.city.name;

  cityNameSelector.innerText = `${cityName} (${currentDate})`;

  // date
  var currentTemp = currentCityList.main.temp;
  var cityTempSelector = document.querySelector('.city-temp span');
  cityTempSelector.innerText = currentTemp;
  // temp
  var currentWind = currentCityList.wind.speed;
  var cityWindSelector = document.querySelector('.city-wind span');
  cityWindSelector.innerText = currentWind;
  // wind
  var currentHumidity = currentCityList.main.humidity;
  var cityHumiditySelector = document.querySelector('.city-humidity span');
  cityHumiditySelector.innerText = currentHumidity;
  // humidity
  var cloudIcon = currentCityList.weather[0].icon;

  // cloud icon
  console.log('city:', city);
}
