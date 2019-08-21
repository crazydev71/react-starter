import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { testActions } from 'store/actions';

const StarCount = ({ testData, getTestData }) => {
  useEffect(() => {
    getTestData();
  }, [getTestData]);

  return (
    <div className="star-count">
      <h2>*** Example for using redux ***</h2>
      <h3>CRA repository start count: {testData.stargazers_count}</h3>
    </div>
  );
};

StarCount.propTypes = {
  testData: PropTypes.object,
  getTestData: PropTypes.func,
};

StarCount.defaultProps = {
  testData: {},
  getTestData: () => {},
};

const mapStateToProps = state => ({
  testData: state.test.testData,
});

const mapDispatchToProps = dispatch => ({
  getTestData: payload => dispatch(testActions.getTestDataRequest(payload)),
});

export default connect(mapStateToProps, mapDispatchToProps)(StarCount);
