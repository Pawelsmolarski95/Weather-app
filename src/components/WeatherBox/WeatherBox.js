import PickCity from '../PickCity/PickCity';
import WeatherSummary from '../WeatherSummary/WeatherSummary';
import Loader from '../Loader/Loader';
import { useCallback, useState } from 'react';
import ErrorBox from '../ErrorBox/ErrorBox'

const WeatherBox = () => {
  
  const [weather, setWeather] = useState('');
  // eslint-disable-next-line no-unused-vars
  const [pending, setPending] = useState(false);
  const [error, setError] = useState(false)
  
  const handleCityChanget = useCallback(
    (city) => {
      setWeather(false)
      setPending(true)
      setError(false)
      fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=463a83f2b8a450d94c51df6bd6509036&units=metric`)
      .then(res => {
        if(res.status === 200) { 
          return (res.json())
          .then(data => {
            const weatherData = {
              city: data.name,
              temp: data.main.temp,
              icon: data.weather[0].icon,
              description: data.weather[0].main
            };
            setPending(false);
            setWeather(weatherData);
          }) 
        } else {
          setError(true)
          setPending(false)
        }
      })  
      },
    [],
  ); 
  
  return (
    <section>
      <PickCity action={handleCityChanget}  />
      { weather && <WeatherSummary {...weather}/> }
      { pending && <Loader /> }
      { error && <ErrorBox>Wrong city</ErrorBox> }
    </section>
  )
};

export default WeatherBox;