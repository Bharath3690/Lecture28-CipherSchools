import {useEffect, useState} from "react";
import WeatherRow from "../components/WeatherRow";
import WeatherSummary from "../components/WeatherSummary";
import getWeather from "../api/weatherApi";
const fetchCoordinates = (callback) =>{
    navigator.geolocation.getCurrentPosition(({coords: {latitude, longitude}})=>{
        callback(latitude,longitude);
    },
    (err) => console.error(err)
)
}
const WeatherPage = () => {
    const [todayWeather, setTodayWeather] = useState({});
    const [weekWeather, setweekWeather] = useState([]);
    const [isCelsius, setIsCelsius] = useState(true);
    const isDay = todayWeather.isDay ?? true;

    useEffect(()=>{
      fetchCoordinates(async (latitude,longitude)=>{
        // console.log(latitude,longitude);
        const weatherInfo =  await getWeather({latitude,longitude});
        // console.log(weatherInfo);
        convertToStateVariable(weatherInfo);
      });
    },[]);
    const convertToStateVariable = (tempWeekWeather) =>{
        let fetchedWeatherInfo = [];
        for(let i=0;i<tempWeekWeather.daily.time.length;i++){
            fetchedWeatherInfo.push({
                date: new DataTransferItem(tempWeekWeather.daily.time[i]),
                maxTemperature: tempWeekWeather.daily.temperature_2m_max[i],
                minTemperature: tempWeekWeather.daily.temperature_2m_min[i],
                weatherCode: tempWeekWeather.daily.weatherCode[i],
            })
        }
        setweekWeather(fetchedWeatherInfo);

        let currentWeather = tempWeekWeather.current_Weather;
        currentWeather.time = new Date(currentWeather.time);
        currentWeather.isDay = currentWeather.is_day === 1 ? true:false;
        delete currentWeather.is_day;
        currentWeather.weatherCode = currentWeather.weatherCode;
        delete currentWeather.weatherCode;
        setTodayWeather(currentWeather);
    };
    return(
        <div className={isDay ? "app" : "app dark"}>
            <h1 className="my-heading">Weather Page</h1>
            <button className="ui icon button" onClick={()=>{
                console.log("btn was clicked");
            }}
            style={{float: "right"}}
            >
            {isCelsius?"'F" : "'C"}
            </button>
            <div>
                <WeatherSummary currentWeather={todayWeather} isCelsius={isCelsius}/>
                <table className={`ui very basic table${!isDay ? " dark":""}`} >
                    <thead className={`table-custom${!isDay ? " dark":""}`}>
                    <tr>
                        <th>Date</th>
                        <th>Temperature</th>
                        <th>Type</th>
                    </tr>
                    </thead>
                    <tbody className="table-custom">
                        <WeatherRow/>
                        <WeatherRow/>
                        <WeatherRow/>
                        <WeatherRow/>
                        <WeatherRow/>
                        <WeatherRow/>
                        <WeatherRow/>
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default WeatherPage;