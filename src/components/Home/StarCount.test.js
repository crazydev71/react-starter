import React from 'react';
import { shallow } from 'enzyme';
import App from 'App';
import StarCount from './StarCount';

describe('StarCount component', () => {
  it('Should render StarCount component.', () => {
    const wrapper = shallow(<App><StarCount /></App>);
    expect(wrapper).toMatchSnapshot();
  });
});

jest.setTimeout(20 * 1000);
