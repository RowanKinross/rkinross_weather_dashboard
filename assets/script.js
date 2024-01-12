const APIKey = apiKey //insert own API key here
const searchHistory = $(`#history`)
var city = ``;

// submit event when a user searches for a city
$(`#search-form`).on(`submit`, function(e){
  e.preventDefault()
  city = $(`#search-input`).val()
  if (city != ``){
  const cityButton = $(`<button>`).text(city).addClass(`btn`).attr(`city-name`, city)
  searchHistory.prepend(cityButton);
  loadWeatherInfo()
  }
}) // <-- end of search form submit

//click event when a user clicks on search history
searchHistory.on(`click`, function(e){
  e.preventDefault()
  city = e.target.innerHTML
  console.log(city)
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
      // The city name

      // The date
      // An icon representation of weather conditions
      // The temperature
      // The humidity
      // The wind speed
      //all the fetch data in an object
      console.log(data);

      
      
    }) // <-- end of today's weather fetch function




    //for 5 day forecast url =
    const forecastQueryUrl = `https://api.openweathermap.org/data/2.5/forecast?lat=${data[0].lat}&lon=${data[0].lon}&cnt=5&units=metric&appid=${APIKey}`

    
    //fetch 5 day forecast with new url
    fetch(forecastQueryUrl)
    .then(function (response) {
      return response.json()
    })
    .then(function (data) {
      //all the fetch data in an object
     console.log(data);





    }) // <-- end of 5 day forecast fetch function
  }) // <-- end of find lat & lon fetch function
} // <--end of loadWeatherInfo function


//! Create a weather dashboard with form inputs.
// When a user searches for a city they are presented with current and future conditions for that city and 
    //that city is added to the search history
// When a user views the current weather conditions for that city they are presented with:
// The city name
// The date
// An icon representation of weather conditions
// The temperature
// The humidity
// The wind speed
// When a user view future weather conditions for that city they are presented with a 5-day forecast that displays:
// The date
// An icon representation of weather conditions
// The temperature
// The humidity
// When a user click on a city in the search history they are again presented with current and future conditions for that city