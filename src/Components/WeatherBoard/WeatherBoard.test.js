import React from 'react';
import ReactDOM from 'react-dom';
import WeatherBoard from './WeatherBoard';
import { configure, shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import toJson from 'enzyme-to-json';

configure({ adapter: new Adapter() });

const forecastObj = {
  dateTime: '6:15',
  weather: [
    {
      description: 'clear sky',
      main: 'Clear'
    }
  ],
  main: {
    temp: 276.68,
    pressure: 1010,
    humidity: 60,
    temp_min: 275.95,
    temp_max: 277.55
  },
  wind: {
    speed: 4.1,
    deg: 320
  }
};

describe('<WeatherBoard />', () => {
  it('renders without crashing', () => {
    const div = document.createElement('div');
    ReactDOM.render(<WeatherBoard forecast={forecastObj} />, div);
    ReactDOM.unmountComponentAtNode(div);
  });
  it('accepts forecast prop', () => {
    const wrapper = shallow(<WeatherBoard forecast={forecastObj} />);
    expect(wrapper.instance().props.forecast.dateTime).toBe('6:15');
  });
  it('renders icon correctly', () => {
    const wrapper = shallow(<WeatherBoard forecast={forecastObj} />);
    expect(wrapper.find('.fa-sun').length).toBe(1);
  });

  it('matches the snapshot', () => {
    const tree = shallow(<WeatherBoard forecast={forecastObj} />);
    expect(toJson(tree)).toMatchSnapshot();
  });
});
