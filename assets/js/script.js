const APIKey = `f16903f83403c53d9b83a9d5eea27e70` //<--insert own API key here
const searchHistory = $(`#history`)
var city = ``;
var cityArr = []
const today = $(`#today`);
const forecast = $(`#forecast`)



// first get any locally stored search history
if (Object.entries(localStorage) != ``){
const storedCities = localStorage.getItem(`cityArr`).split(`,`)
searchHistory.empty()
if (storedCities != null){
  for (let i=0; i<storedCities.length; i++){
  city = storedCities[i]
  prependCityButton()
  cityArr.push(city)
  }
loadWeatherInfo()
}}




//prepend searched for cities as buttons in a function:
function prependCityButton(){
    if (city != ``){
    const cityButton = $(`<button>`).text(city).addClass(`btn btn-outline-primary m-1`).attr(`city-name`, city)
    searchHistory.prepend(cityButton);
  }}




//SUBMIT event when a user searches for a city
$(`#search-form`).on(`submit`, function(e){
  e.preventDefault()
  city = $(`#search-input`).val().trim().toUpperCase()
  if (city != ``){
    // load the weather info for that city
    loadWeatherInfo()
    //if the cityArr includes the city already, remove it and push it again(to the start)
    if (cityArr.includes(city)){
    const index = cityArr.indexOf(city)
    cityArr.splice(index, 1);}
    else{
    // add the city as a button in the search history
    prependCityButton()
    }
    // push city to cityArr
    cityArr.push(city)
    // set the array in local storage
    localStorage.setItem(`cityArr`, cityArr)
  }
  }
)




//CLICK event when a user clicks on search history
searchHistory.on(`click`, function(e){
  e.preventDefault()
  city = e.target.innerHTML
  loadWeatherInfo()
})




// load weather information function: today's & 5 day forecast
function loadWeatherInfo() {
  if (city != ``){
  //to find lat/lon from the city name:
  const queryURL = `https://api.openweathermap.org/geo/1.0/direct?q=${city}&appid=${APIKey}`;
  
  
  // fetch call to find lat & lon for another queryURL
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
      

      // Today's data entries:
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
    const forecastQueryUrl = `https://api.openweathermap.org/data/2.5/forecast?lat=${data[0].lat}&lon=${data[0].lon}&units=metric&appid=${APIKey}`

    
    //fetch 5 day forecast with new url
    fetch(forecastQueryUrl)
    .then(function (response) {
      return response.json()
    })
    .then(function (data) {
    //clear exiting html forecast data
    forecast.empty()
    // The date
    const a = dayjs()

    //make a card for each day in the forecast (based on bootstrap cards)
    for (let i=1; i<6; i++ ){
      //date = dayjs() plus 1 day for each card
      const forecastDate = a.add(i, 'day').format('DD/MM/YYYY')
      //arr for each forecast day card
      const forecastDayArr = data.list[i*8-1]

      //forcast data variables:
      const foreTemp = $(`<p>`).text(`Temp: ${Math.round(forecastDayArr.main.temp)}°C`) 
      const foreHumidity = $(`<p>`).text(`Humidity: ${forecastDayArr.main.humidity}%`)
      const foreWind = $(`<p>`).text(`Wind: ${forecastDayArr.wind.speed}m/s`)
      const foreIcon = $(`<img src="https://openweathermap.org/img/wn/${forecastDayArr.weather[0].icon}.png" id="image" alt="" class="icon" />`)

      
      //make a forecast bootstrap card:
      const forecastH4 = $(`<h5 class="card-title dayTitle">`).text(forecastDate)
      const forecastBody = $(`<div class="card-body dayBody">`).append(forecastH4, foreIcon, foreTemp, foreWind, foreHumidity)
      const forecastCard = $(`<div class="card day bg-primary-subtle border border-primary-subtle p-1 m-1" style="width: 11rem;">`).append(forecastBody)
      forecast.append(forecastCard);

   }


    }) // <-- end of 5 day forecast fetch function
  }) // <-- end of find lat & lon fetch function
}} // <--end of loadWeatherInfo function