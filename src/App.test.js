import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import { configure, shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import toJson from 'enzyme-to-json';

configure({ adapter: new Adapter() });

describe('<App />', () => {
  it('renders without crashing', () => {
    const div = document.createElement('div');
    ReactDOM.render(<App />, div);
    ReactDOM.unmountComponentAtNode(div);
  });
  it('should contain a Provider', () => {
    const wrapper = shallow(<App />);
    expect(wrapper.find('Provider').length).toBe(1);
  });
  it('should contain a ContextConsumer', () => {
    const wrapper = shallow(<App />);
    expect(wrapper.find('ContextConsumer').length).toBe(1);
  });
  it('matches the snapshot', () => {
    const tree = shallow(<App />);
    expect(toJson(tree)).toMatchSnapshot();
  });
});
