import React from 'react';
import PropTypes from 'prop-types';
import { convertFromKelvin, getIcon } from '../../utilities/utilities';

// DaysCard represents the aggregate data for each individual day
// Logic is passed in from parent component, in order to change the active day
export default function DaysCard(props) {
  let { day, onClick } = props;
  return (
    <div
      onClick={onClick}
      className="d-flex flex-column align-items-center py-3 bg-success"
    >
      <i className={'fas fa-' + getIcon(undefined, day)} />
      <p className="m-0">{convertFromKelvin(day['avg'])}&deg;</p>
      <p className="m-0">{day['fullDay']}</p>
    </div>
  );
}

DaysCard.propTypes = {
  day: PropTypes.object.isRequired,
  onClick: PropTypes.func
};
