import React from 'react';
import ReactDOM from 'react-dom';
import ForecastsContainer from './ForecastsContainer';
import { configure, shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import toJson from 'enzyme-to-json';
import { forecasts } from './ForecastsContainer.test.data';

configure({ adapter: new Adapter() });

describe('<ForecastsContainer />', () => {
  it('renders without crashing', () => {
    const div = document.createElement('div');
    ReactDOM.render(
      <ForecastsContainer forecasts={forecasts} dayIndex={0} />,
      div
    );
    ReactDOM.unmountComponentAtNode(div);
  });

  it('matches the snapshot', () => {
    const tree = shallow(
      <ForecastsContainer forecasts={forecasts} dayIndex={0} />
    );
    expect(toJson(tree)).toMatchSnapshot();
  });
});
