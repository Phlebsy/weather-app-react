import React, { Component } from 'react';
import PropTypes from 'prop-types';
import ForecastCard from '../ForecastCard/ForecastCard';
import OwlCarousel from 'react-owl-carousel';

import { changeForecast } from '../../context/actions';

// ForecastsList builds the ForecastCards, then passes them into third-party OwlCarousel for display purposes
// Logic is passed from actions into the ForecastCard to change active weather display
export default class ForecastsContainer extends Component {
  render() {
    const { forecasts, dayIndex, dispatch } = this.props;

    let forecastCards = forecasts[dayIndex].map((forecast, index) => (
      <ForecastCard
        onClick={changeForecast.bind(this, dispatch, index)}
        forecast={forecast}
        key={`forecast-${index}`}
      />
    ));

    return (
      <OwlCarousel
        id="hourly"
        dots={false}
        slideBy={4}
        nav={true}
        className="owl-theme"
        margin={10}
        items={4}
      >
        {forecastCards}
      </OwlCarousel>
    );
  }
}

ForecastsContainer.propTypes = {
  forecasts: PropTypes.array.isRequired,
  dayIndex: PropTypes.number.isRequired,
  dispatch: PropTypes.func
};
