import "./style.css";

const APIKey = "e862a876b4cc47e4adb234134261010";
let unitOfMeasurement = 'celsius';

// Access the API
function GetWeatherAPI(input){
    return `https://api.weatherapi.com/v1/current.json?key=${APIKey}&q=${input}&aqi=no`
}

const changeMeasurementBtn = document.getElementById('changeMeasurement');

changeMeasurementBtn.addEventListener('click', (e)=>{
    e.preventDefault();
    const search = document.getElementById('search');
    const output = search.value;

    if(output !== ''){
        if(unitOfMeasurement == 'celsius'){
            unitOfMeasurement = 'farenheit'
        }else{
            unitOfMeasurement = 'celsius'
        }
        AppendData(output)
    }
})

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

    const measurementDiv = document.createElement('div');
    measurementDiv.textContent = `Current Status: Measured in ${unitOfMeasurement}`

    const weatherTitle = document.createElement('h1');
    weatherTitle.style.fontSize = '24px'
    weatherTitle.style.color = 'red';
    weatherTitle.textContent = 'Weather'

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

    // For factors affected for farenheit

    const temperature = document.createElement('div');
    const feelLikeTemp = document.createElement('div');
    const gustSpeed = document.createElement('div'); 
    const heatIndex = document.createElement('div');
    const windSpeed = document.createElement('div');
    const precipitation = document.createElement('div');
    const dewPoint = document.createElement('div');

    if(unitOfMeasurement == 'farenheit'){
        temperature.textContent = `Temperature: ${data.weatherData.temp_f} farenheit`
        feelLikeTemp.textContent = `Feels like: ${data.weatherData.feelslike_f} farenheit`
        gustSpeed.textContent = `Gust Speed: ${data.weatherData.gust_mph} mph`
        heatIndex.textContent = `Heat Index: ${data.weatherData.heatindex_f} farenheit`
        windSpeed.textContent = `Wind Speed: ${data.weatherData.wind_mph} farenheit`
        precipitation.textContent = `Precipitation: ${data.weatherData.precip_in} in`
        dewPoint.textContent = `Dewpoint: ${data.weatherData.dewpoint_f} farenheit`
    }else{
        temperature.textContent = `Temperature: ${data.weatherData.temp_c} celsius`
        feelLikeTemp.textContent = `Feels like: ${data.weatherData.feelslike_c} celsius`
        gustSpeed.textContent = `Gust Speed: ${data.weatherData.gust_kph} kph`
        heatIndex.textContent = `Heat Index: ${data.weatherData.heatindex_c} celsius`
        windSpeed.textContent = `Wind Speed: ${data.weatherData.wind_kph} kph`
        precipitation.textContent = `Precipitation: ${data.weatherData.precip_mm} mm`
        dewPoint.textContent = `Dewpoint: ${data.weatherData.dewpoint_c} celsius`
    }

    // For factors whihc are not affected by farentheit
    // const humidity = document.createElement('div');
    // humidity.textContent = `Feels like: ${data.current.feelslike_c}`
    
    mainContainer.append(measurementDiv);
    titleContainer.append(cityName, country, location);
    contentContainer.append(weatherTitle, temperature, feelLikeTemp, gustSpeed, heatIndex, windSpeed, precipitation, dewPoint);

    console.log(unitOfMeasurement)
}

const submit = document.getElementById("submit");

submit.addEventListener('click', (e)=>{
    e.preventDefault();
    const search = document.getElementById('search');
    const output = search.value;

    console.log(output);
    if(output !== ''){
        AppendData(output);
    }
})


