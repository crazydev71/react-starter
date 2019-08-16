export const initialState = {
  status: 'idle',
  testData: {},
};

export const testData = (state = initialState) => (
  state.testData || initialState.testData
);
export const status = (state = initialState) => (
  state.status || initialState.status
);
