import React from 'react';
import { shallow, mount } from 'enzyme';
import Me from './Me';

describe('Me component', () => {
  it('Should render Me component.', () => {
    const wrapper = shallow(<Me />);
    expect(wrapper).toMatchSnapshot();
  });

  it('Mock api calling', (done) => {
    const mockUser = {
      name: { first: 'Some', last: 'Name' },
    };
    const mockJsonPromise = Promise.resolve({ results: [mockUser] });
    const mockFetchPromise = Promise.resolve({
      json: () => mockJsonPromise,
    });

    jest.spyOn(global, 'fetch').mockImplementation(() => mockFetchPromise);

    const wrapper = mount(<Me />);

    expect(global.fetch).toHaveBeenCalledTimes(1);
    expect(global.fetch).toHaveBeenCalledWith('https://randomuser.me/api/');

    process.nextTick(() => {
      expect(wrapper.text()).toContain(mockUser.name.first);
      expect(wrapper.text()).toContain(mockUser.name.last);

      global.fetch.mockClear();
      done();
    });
  });
});

jest.setTimeout(20 * 1000);
