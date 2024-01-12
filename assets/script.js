const APIKey = apiKey //<--insert own API key here
const searchHistory = $(`#history`)
var city = ``;
const today = $(`#today`);
const forecast = $(`#forecast`)


//SUBMIT event when a user searches for a city
$(`#search-form`).on(`submit`, function(e){
  e.preventDefault()
  city = $(`#search-input`).val().trim().toUpperCase()
  if (city != ``){
    loadWeatherInfo()
    const cityButton = $(`<button>`).text(city).addClass(`btn btn-outline-primary m-1`).attr(`city-name`, city)
    searchHistory.prepend(cityButton);
  }
})



//CLICK event when a user clicks on search history
searchHistory.on(`click`, function(e){
  e.preventDefault()
  city = e.target.innerHTML
  loadWeatherInfo()
})





function loadWeatherInfo() {
  //to find lat/lon from the city name:
  const queryURL = `http://api.openweathermap.org/geo/1.0/direct?q=${city}&appid=${APIKey}`;
  
  
  // fetch call
  fetch(queryURL)
  .then(function (response) {
    return response.json();
  })
  .then(function (data) {


    //for today's weather url =
    const weatherQueryUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${data[0].lat}&lon=${data[0].lon}&units=metric&appid=${APIKey}`
    //fetch today's weather with new url
    fetch(weatherQueryUrl)
    .then(function (response) {
      return response.json()
    })
    .then(function (data) {
      //first clear old today entries
      today.empty()
      
      // New today's data entries:
      const date = dayjs().format('DD/MM/YYYY') // The date
      const cityNameDate = $(`<h3>`).text(`${city} (today: ${date}) - ${data.weather[0].description}`).addClass(`cityName `) // City Name
      const weatherIcon = $(`<img src="https://openweathermap.org/img/wn/${data.weather[0].icon}.png" id="image" alt="" class="icon" />`) // Weather conditions Icon
      const temp = Math.round(10*(data.main.temp))/10 // The temperature
      const feelsLike = Math.round(data.main.feels_like) // Feels-like temperature
      
      const tempEl = $(`<p>`).text(`Temperature: ${temp}°C (Feels like ${feelsLike}°C)`)
      const humidityEl = $(`<p>`).text(`Humidity: ${data.main.humidity}%`) // Humidity
      const windEl = $(`<p>`).text(`Wind Speed: ${data.wind.speed}m/s`) // Wind speed
      
      //all the fetch data printed to html:
      today.append(cityNameDate, weatherIcon, tempEl, humidityEl, windEl)
    }) // <-- end of today's weather fetch function




    //for 5 day forecast url =
    const forecastQueryUrl = `https://api.openweathermap.org/data/2.5/forecast?lat=${data[0].lat}&lon=${data[0].lon}&cnt=5&units=metric&appid=${APIKey}`

    
    //fetch 5 day forecast with new url
    fetch(forecastQueryUrl)
    .then(function (response) {
      return response.json()
    })
    .then(function (data) {
      console.log(data)
      //all the fetch data in an object
    forecast.empty()

    // The date
    const a = dayjs()

    for (let i=0; i<5; i++ ){
      const forecastDate = a.add(i, 'day').format('DD/MM/YYYY')
      console.log(forecastDate)
      $('#dayTitle').text(forecastDate);



    }
    // An icon representation of weather conditions

    // The temperature
    // The humidity
    // When a user click on a city in the search history they are again presented with current and future conditions for that city



    }) // <-- end of 5 day forecast fetch function
  }) // <-- end of find lat & lon fetch function
} // <--end of loadWeatherInfo function


//! Create a weather dashboard with form inputs.
//! When a user searches for a city they are presented with current and future conditions for that city and 
    //!that city is added to the search history
//! When a user views the current weather conditions for that city they are presented with:
//! The city name
//! The date
//! An icon representation of weather conditions
//! The temperature
//! The humidity
//! The wind speed

// When a user views future weather conditions for that city they are presented with a 5-day forecast that displays:
// The date
// An icon representation of weather conditions
// The temperature
// The humidity
// When a user click on a city in the search history they are again presented with current and future conditions for that city

//store search history in local
//default today's weather display to most recently appended - first child?