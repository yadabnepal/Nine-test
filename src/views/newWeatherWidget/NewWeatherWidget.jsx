import axios from 'axios';
import { useEffect, useState } from 'react';
import WeatherWidget from '../../components/weatherWidget';
import styles from './NewWeatherWidget.module.scss';

function CheckBox({
    checked,
    name,
    onClick,
    value
}) {
    return (
        <div className={styles.checkBoxContainer}>
            <input
                checked={checked}
                name={name}
                onClick={onClick}
                type="radio"
            />
            <label>{value}</label>
        </div>
    )
}

function NewWeatherWidget() {
    const [weather, setWeather] = useState(null);
    const [units, setUnits] = useState('metric')
    const [showWind, setShowWind] = useState(true);
    const [title, setTitle] = useState('')

    const fetchWeather = async (coords) => {
        try {
            const { data } = await axios.get(`https://api.openweathermap.org/data/2.5/weather?lat=${coords.latitude}&lon=${coords.longitude}&appid=f5b80055cd6a3fa56ac324ef8d27d85c&units=${units}`)
            setWeather(data)
        } catch(error) {
            // Though we shouldn't use console log. This to be replace by the logger service
            console.log(error)
        }
    }

    useEffect(() => {
        navigator.geolocation.getCurrentPosition(({ coords }) => {
            fetchWeather(coords);
        })
    }, [])

    // We should basically show spinner rather than returning null.
    if (!weather) return null;

    const windSpeed = weather.wind.speed * 3.6;
    const temperature = units === 'metric' ? weather.main.temp : (weather.main.temp * 9/5) + 32;

    return (
        <div className={styles.container}>
            <form className={styles.form}>
                <label htmlFor="title">Title</label>
                <input
                    className={styles.titleInput}
                    name="title"
                    onChange={(event) => setTitle(event.target.value)}
                    placeholder="Title of widget"
                    type="text"
                    value={title}
                />
                <label htmlFor="temperature">Temperature</label>
                <div className={styles.radio}>
                    <CheckBox
                        checked={units === 'metric'}
                        name="temperature"
                        onClick={() => setUnits('metric')}
                        value="&#176;C"
                    />
                    <CheckBox
                        checked={units === 'imperial'}
                        name="temperature"
                        onClick={() => setUnits('imperial')}
                        value="&#176;F"
                    />
                </div>
                <label htmlFor="wind">Wind</label>
                <div className={styles.radio}>
                    <CheckBox
                        checked={showWind}
                        name="wind"
                        onClick={() => setShowWind(true)}
                        value="On"
                    />
                    <CheckBox
                        checked={!showWind}
                        name="wind"
                        onClick={() => setShowWind(false)}
                        value="Off"
                    />
                </div>
            </form>
            <div className={styles.divider} />
            <WeatherWidget
                icon={weather.weather.length && weather.weather[0].icon}
                location={weather.name}
                temperature={Math.round(temperature)}
                title={title}
                windSpeed={showWind && Math.round(windSpeed)}
            />
        </div>
    )
}

export default NewWeatherWidget;
