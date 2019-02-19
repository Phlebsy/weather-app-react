import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { convertFromKelvin, getIcon } from '../../utilities/utilities';

// WeatherBoard component represents the current clicked on forecast
// No logic, only presentational markup
export default class WeatherBoard extends Component {
  render() {
    const { forecast } = this.props;
    let { main } = forecast;

    return (
      <div className="weatherboard container px-0">
        <div className="d-flex justify-content-center">
          <div className="d-flex align-items-center justify-content-center">
            <div
              style={{ flexDirection: 'column' }}
              className="d-flex mx-4 align-items-center justify-content-center"
            >
              <i
                style={{ fontSize: '5rem' }}
                className={
                  'my-3 fas fa-' +
                  getIcon(forecast['dateTime'], forecast['weather'][0])
                }
              />
              <p className="text-capitalize">
                {forecast['weather'][0]['description']}
              </p>
            </div>
          </div>
          <div className="mx-4">
            <p className="text-danger text-center">
              {convertFromKelvin(main['temp_max'])}&deg;
            </p>
            <p style={{ fontSize: '2rem' }} className="text-center">
              {convertFromKelvin(main['temp'])}&deg;F
            </p>
            <p className="text-primary text-center">
              {convertFromKelvin(main['temp_min'])}&deg;
            </p>
          </div>
        </div>
        <div className="d-flex flex-columns justify-content-center">
          <div className="mx-3">
            {forecast['wind'['speed']]
              ? 0
              : forecast['wind']['speed'].toFixed(1)}{' '}
            MPH Wind
          </div>
          <div className="mx-3">{main.humidity}% Humidity</div>
        </div>
      </div>
    );
  }
}

WeatherBoard.propTypes = {
  forecast: PropTypes.object.isRequired
};
