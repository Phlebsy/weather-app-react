import React from 'react';
import PropTypes from 'prop-types';
import { convertFromKelvin, getIcon } from '../../utilities/utilities';

// ForecastCard represents the tri-hourly forecasts for a day
// Logic is passed in from parent component, in order to change the active forecast
export default function ForecastCard(props) {
  const { forecast, onClick } = props;
  return (
    <div
      onClick={onClick}
      className="d-flex flex-column align-items-center py-3 bg-warning "
    >
      <i
        className={
          'fas fa-' + getIcon(forecast['dateTime'], forecast['weather'][0])
        }
      />
      <p className="m-0">{convertFromKelvin(forecast['main']['temp'])}&deg;</p>
      <p className="m-0">{forecast['dateTime']}</p>
    </div>
  );
}

ForecastCard.propTypes = {
  forecast: PropTypes.object.isRequired,
  onClick: PropTypes.func
};
