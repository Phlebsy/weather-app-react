import React from 'react';
import ReactDOM from 'react-dom';
import DaysContainer from './DaysContainer';
import { configure, shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import toJson from 'enzyme-to-json';

configure({ adapter: new Adapter() });

const days = [
  {
    avg: 276.25,
    fullDay: 'Tue - Dec 4',
    weather: 'clear sky'
  },
  {
    avg: 272.754625,
    fullDay: 'Wed - Dec 5',
    weather: 'clear sky'
  }
];

describe('<DaysContainer />', () => {
  it('renders without crashing', () => {
    const div = document.createElement('div');
    ReactDOM.render(<DaysContainer days={days} />, div);
    ReactDOM.unmountComponentAtNode(div);
  });

  it('matches the snapshot', () => {
    const tree = shallow(<DaysContainer days={days} />);
    expect(toJson(tree)).toMatchSnapshot();
  });
});
