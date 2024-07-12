import { convertTOFahrenheit } from "../weatherUtil";
const WeatherSummary = ({currentWeather:{temperature, weatherCode}}
    isCelsius
) => {
    return (
        <div>
            <h1>{isCelsius ? `${temperature} C` :`${convertTOFahrenheit(temperature)} F`}</h1>
        </div>

    );
};

export default WeatherSummary;