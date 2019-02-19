import React from 'react';
import ReactDOM from 'react-dom';
import SearchBar from './SearchBar';
import { configure, shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import toJson from 'enzyme-to-json';

configure({ adapter: new Adapter() });

describe('<SearchBar />', () => {
  it('renders without crashing', () => {
    const div = document.createElement('div');
    ReactDOM.render(<SearchBar />, div);
    ReactDOM.unmountComponentAtNode(div);
  });

  it('matches the snapshot', () => {
    const tree = shallow(<SearchBar />);
    expect(toJson(tree)).toMatchSnapshot();
  });
});
