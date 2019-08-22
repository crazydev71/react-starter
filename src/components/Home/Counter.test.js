import React from 'react';
import { render, unmountComponentAtNode } from 'react-dom';
import { act } from 'react-dom/test-utils';

import Counter from './Counter';

let container = null;
beforeEach(() => {
  // setup a DOM element as a render target
  container = document.createElement('div');
  // container *must* be attached to document so events work correctly.
  document.body.appendChild(container);
});

afterEach(() => {
  // cleanup on exiting
  unmountComponentAtNode(container);
  container.remove();
  container = null;
});

it('changes value when clicked', () => {
  act(() => {
    render(<Counter />, container);
  });

  // get ahold of the button element, and trigger some clicks on it
  const [minusButton, plusButton] = document.querySelectorAll('button');
  const span = document.querySelector('span');
  expect(minusButton.innerHTML).toBe('-');
  expect(plusButton.innerHTML).toBe('+');
  expect(span.innerHTML).toBe('0');

  act(() => {
    plusButton.dispatchEvent(new MouseEvent('click', { bubbles: true }));
  });
  expect(span.innerHTML).toBe('1');

  act(() => {
    minusButton.dispatchEvent(new MouseEvent('click', { bubbles: true }));
  });
  expect(span.innerHTML).toBe('0');
});
