import React, { Component } from 'react';

const Context = React.createContext();

const reducer = (state, action) => {
  switch (action.type) {
    case 'UPDATE_SEARCH': {
      return {
        ...state,
        resultString: action.payload[0].name,
        weatherData: action.payload[0],
        forecastList: action.payload[1],
        daysList: action.payload[2],
        retrieved: true,
        dayIndex: 0
      };
    }
    case 'FETCH_ERROR': {
      return { ...state, errorString: `There's an error in a fetch.` };
    }
    case 'CHANGE_DAY': {
      return {
        ...state,
        dayIndex: action.payload,
        weatherData: state.forecastList[action.payload][0],
        forecastList: [...state.forecastList]
      };
    }
    case 'CHANGE_FORECAST': {
      return {
        ...state,
        weatherData: state.forecastList[state.dayIndex][action.payload]
      };
    }
    default:
      return state;
  }
};

export class Provider extends Component {
  state = {
    retrieved: false,
    dayIndex: 0,
    dispatch: action =>
      this.setState(
        state => reducer(state, action),
        () => this.setState({ dayIndex: this.state.dayIndex }) // Sad, hacky fix for an asynchronous state update issue.
      )
  };

  render() {
    return (
      <Context.Provider value={this.state}>
        {this.props.children}
      </Context.Provider>
    );
  }
}

export const Consumer = Context.Consumer;
