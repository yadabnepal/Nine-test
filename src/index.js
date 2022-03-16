import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import NewWeatherWidget from './views/newWeatherWidget';

ReactDOM.render(
    <React.StrictMode>
        <NewWeatherWidget />
    </React.StrictMode>,
    document.getElementById('root')
);

