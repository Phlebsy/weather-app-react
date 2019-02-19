import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { retrieveWeatherData } from '../../context/actions';

// SearchBar component handles the input for our location
// Logic includes an onClick handler to call the action to retrieve weather data
export default class SearchBar extends Component {
  state = {
    searchInput: 'New York, NY'
  };

  onChange = e => {
    this.setState({ [e.target.name]: e.target.value });
  };

  getWeatherData = async () => {
    const { dispatch } = this.props.store;
    retrieveWeatherData(dispatch, this.state.searchInput);
  };

  render() {
    return (
      <div className="searchbar container d-flex justify-content-center my-2">
        <label htmlFor="searchInput" className="pr-2 font-weight-bold">
          City:{' '}
        </label>
        <input
          name="searchInput"
          value={this.state.searchInput}
          type="text"
          onChange={this.onChange}
        />
        <button className="btn-primary" onClick={this.getWeatherData}>
          Go
        </button>
      </div>
    );
  }
}
