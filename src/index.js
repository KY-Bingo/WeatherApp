import "./style.css";

const APIKey = "e862a876b4cc47e4adb234134261010";

// Access the API
function GetWeatherAPI(input){
    return `https://api.weatherapi.com/v1/current.json?key=${APIKey}&q=${input}&aqi=no`
}

async function AccessWeather(url){
    const response = await fetch(url);
    const result = await response.json();
    const data = result.location
    const weatherData = result.current;

    console.log(result)
    console.log(weatherData)
    console.log(data)
    return [data, weatherData]
}

async function FetchWeather(cord){
    const url = GetWeatherAPI(cord);
    const [location, weatherData] = await AccessWeather(url);
    // let data = weather.location;

    return {location, weatherData};
}

const mainContainer = document.querySelector('.mainContainer');


async function AppendData(input){
    mainContainer.innerHTML = '';

    let data = await FetchWeather(input);
    // let location = data.location;
    console.log(data.location)
    console.log(data.weatherData)

    const titleContainer = document.createElement('div');
    titleContainer.classList.add('titleContainer');
    const contentContainer = document.createElement('div');
    contentContainer.classList.add('contentContainer');

    const cityName = document.createElement('h1');
    cityName.style.margin = '0px';
    cityName.style.color = 'red';
    cityName.textContent = data.location.name;

    const country = document.createElement('h2');
    country.style.fontSize = '14px';
    country.style.margin = '0px';
    country.textContent = data.location.country;

    const location = document.createElement('div');
    location.style.margin = '10px 0px 10px 0px';
    location.textContent = `Location: Latitude: ${data.location.lat} Longitude: ${data.location.lon}`

    mainContainer.append(titleContainer, contentContainer);

    titleContainer.append(cityName, country, location);
    contentContainer.append();
}

const submit = document.getElementById("submit");

submit.addEventListener('click', (e)=>{
    e.preventDefault();
    const search = document.getElementById('search');
    const output = search.value;

    console.log(output);
    AppendData(output);
})


