import styles from './WeatherWidget.module.scss';

function WeatherWidget({
    icon,
    location,
    temperature,
    title,
    windSpeed,
}) {
    return (
        <div className={styles.container}>
            <div className={styles.title}>
                {title || "TITLE OF WIDGET"}
            </div>
            <div className={styles.content}>
                <img alt='' className={styles.image} src={`http://openweathermap.org/img/w/${icon}.png`} />
                <div className={styles.weatherInfo}>
                    <div className={styles.location}>
                        {location}
                    </div>
                    <div className={styles.temperature}>
                        {temperature}&#176;
                    </div>
                    <div className={styles.wind} style={{ visibility: windSpeed ? 'visible' : 'hidden'}}>
                        <strong>Wind</strong>
                        &nbsp;
                        {windSpeed}
                        km/h
                    </div>
                </div>
            </div>
        </div>
    );
};

export default WeatherWidget;
