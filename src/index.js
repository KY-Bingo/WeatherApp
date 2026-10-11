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

// FetchWeather("london");

async function AppendData(input){
    let data = await FetchWeather(input);
    // let location = data.location;
    console.log(data.location)
    console.log(data.weatherData)
}

AppendData("london");

// console.log(london);