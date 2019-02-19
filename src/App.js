import React, { Component } from 'react';
import { Provider, Consumer } from './context/context';
import 'owl.carousel/dist/assets/owl.carousel.css';
import 'owl.carousel/dist/assets/owl.theme.default.css';
import './App.css';

import SearchBar from './Components/SearchBar/SearchBar';
import ForecastsContainer from './Components/ForecastsContainer/ForecastsContainer';
import DaysContainer from './Components/DaysContainer/DaysContainer';
import WeatherBoard from './Components/WeatherBoard/WeatherBoard';

class App extends Component {
  render() {
    return (
      <Provider>
        <Consumer>
          {store => {
            return (
              <div style={{ height: '100vh', width: '100vw' }}>
                <div className="container d-flex flex-column justify-content-center align-items-center bg-light">
                  <SearchBar store={store} />
                  <div className="title">
                    <h1>
                      {store.retrieved
                        ? `Weather for ${store.resultString}`
                        : `Please input your city above.`}
                    </h1>
                  </div>
                  {store.retrieved && (
                    <WeatherBoard
                      forecast={store.weatherData}
                      dispatch={store.dispatch}
                    />
                  )}
                  {store.retrieved && (
                    <React.Fragment>
                      <h4>Hourly</h4>
                      <ForecastsContainer
                        forecasts={store.forecastList}
                        dayIndex={store.dayIndex}
                        dispatch={store.dispatch}
                      />
                    </React.Fragment>
                  )}
                  {store.retrieved && (
                    <React.Fragment>
                      <h4>Daily</h4>
                      <DaysContainer
                        days={store.daysList}
                        dayIndex={store.dayIndex}
                        dispatch={store.dispatch}
                      />
                    </React.Fragment>
                  )}
                </div>
              </div>
            );
          }}
        </Consumer>
      </Provider>
    );
  }
}

export default App;
