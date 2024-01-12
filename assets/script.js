// submit event when a user searches for a city
$(`#search-form`).on(`submit`, function(e){
  e.preventDefault();

  const city = $(`#search-input`).val()

  if (city != ``){

  const APIKey = [insert your api key];
  const queryURL = `http://api.openweathermap.org/geo/1.0/direct?q=${city}&appid=${APIKey}`;


// fetch call
fetch(queryURL)
  .then(function (response) {
    return response.json();
  })
  .then(function (data) {
    //new url with lat and lon taken from the original url, transposed into the new url + metric units added
    const newQueryUrl = `https://api.openweathermap.org/data/2.5/forecast?lat=${data[0].lat}&lon=${data[0].lon}&cnt=5&units=metric&appid=${APIKey}`

    
    //new fetch with new url
    fetch(newQueryUrl)
    .then(function (response) {
      return response.json()
    })
    .then(function (data) {
      //all the fetch data in an object
      console.log(data);

      
      // the temperature (in degrees C)
      //const tempC = data.main.temp
      //$('.temp').text(`${tempC}C`)

    }) // <-- end of second fetch function
  }) // <-- end of first fetch function
  } else {}// <-- end of city not undefined function
}) // <-- end of search form submit


//! Create a weather dashboard with form inputs.
// When a user searches for a city they are presented with current and future conditions for that city and that city is added to the search history
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