import React, { Component } from 'react';
import PropTypes from 'prop-types';
import DaysCard from '../DaysCard/DaysCard';
import { changeDay } from '../../context/actions';
import OwlCarousel from 'react-owl-carousel';

// DaysContainer builds the five-six DayCard components and places them into the carousel
// Logic is from actions and passed into children components to change active forecasts
export default class DaysContainer extends Component {
  render() {
    const { days, dispatch } = this.props;

    let dayCards = days.map((day, index) => {
      if (day['fullDay']) {
        return (
          <DaysCard
            onClick={changeDay.bind(this, dispatch, index)}
            day={day}
            key={`day-${index}`}
          />
        );
      }
      return undefined;
    });

    dayCards = dayCards.filter(day => day !== undefined); // Fix for days with no forecasts left

    return (
      <OwlCarousel
        dots={false}
        slideBy={3}
        nav={true}
        className="owl-theme"
        margin={10}
        items={3}
      >
        {dayCards}
      </OwlCarousel>
    );
  }
}

DaysContainer.propTypes = {
  days: PropTypes.array.isRequired,
  dispatch: PropTypes.func,
  dayIndex: PropTypes.number
};
