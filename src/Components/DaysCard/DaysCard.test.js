import React from 'react';
import ReactDOM from 'react-dom';
import DaysCard from './DaysCard';
import { configure, shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import toJson from 'enzyme-to-json';

configure({ adapter: new Adapter() });

const dayObj = {
  avg: 276.25,
  fullDay: 'Tue - Dec 4',
  weather: 'clear sky'
};

describe('<DaysCard />', () => {
  it('renders without crashing', () => {
    const div = document.createElement('div');
    ReactDOM.render(<DaysCard day={dayObj} />, div);
    ReactDOM.unmountComponentAtNode(div);
  });

  it('renders icon correctly', () => {
    const wrapper = shallow(<DaysCard day={dayObj} />);
    expect(wrapper.find('.fa-sun').length).toBe(1);
  });

  it('matches the snapshot', () => {
    const tree = shallow(<DaysCard day={dayObj} />);
    expect(toJson(tree)).toMatchSnapshot();
  });
});
