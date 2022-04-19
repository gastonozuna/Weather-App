
import { useState } from 'react';
import './App.css';

const api = {
  key: 'dcbca490db64d68c7be64c5fd0539169',
  base: 'https://api.openweathermap.org/data/2.5/'
}

function App() {

  const [query, setQuery] = useState('');
  const [weather, setWeather] = useState({});

  const search = (evt) => {
    if (evt.key === "Enter"){
      fetch(`${api.base}weather?q=${query}&units=metric&APPID=${api.key}`)
      .then(res => res.json())
      .then(result => {
        setWeather(result)
        setQuery('');
        console.log(result)
      })
    }
  } 

  const dateBuilder = (d) => {
    let months = ['January', 'February', 'March', 'April', 'May', 'June',
       'July', 'August', 'September', 'October', 'November', 'December'];

    let days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];

    let day = days[d.getDay()];
    let date = d.getDate();
    let month = months[d.getMonth()];
    let year = d.getFullYear();

    return `${day} ${date} ${month} ${year}`
  }

  return (
    <div className={
      (typeof weather.main != "undefined")
      ? ((weather.weather[0].main === 'Clear' ? 'app'
        : weather.weather[0].main === 'Rain' ? 'app rain'
        : weather.weather[0].main === 'Clouds' ? 'app clouds'
        : weather.weather[0].main === 'Snow' ? 'app snow'
        : weather.weather[0].main === 'Mist' ? 'app mist'
        : weather.weather[0].main === 'Thunderstorm' ? 'app storm'
        : weather.weather[0].main === 'Drizzle' ? 'app drizzle'
        : null
        ))
      : 'app noCity'}>

      <main>
        <div className='searchBox'>
          <input
             type='text'
             className='searchBar'
             placeholder='Buscar...'
             onChange={e => setQuery(e.target.value)}
             value={query}
             onKeyPress={search}
          />
        </div>
    {(typeof weather.main != 'undefined') ? (
        <div>
          <div className='locationBox'>
            <div className='location'>{weather.name}, {weather.sys.country}</div>
            <div className='date'>{dateBuilder(new Date())}</div>
          </div>

          <div className='weatherBox'>
            <div className='temp'>
              {Math.round(weather.main.temp)}°C
            </div>
            <div>
            <img src={`http://openweathermap.org/img/wn/${weather.weather[0].icon}.png`} className='weatherImg'></img>
            </div>
            <div className='weather'>
              <div>
                {weather.weather[0].main}
              </div>
              <div>
                <p>
                {weather.weather[0].description}
                </p>
              </div>
                {console.log(weather.weather[0].main)}
            </div>
          </div>
        </div>
    ) : (
      <div className='noCityFound'>
        <p>
          No se ha encontrado la ciudad 
        </p>
        <p>
          por favor vuelve a intentarlo.
        </p>
      </div>)}
      </main>
    </div>
  );
}

export default App;
