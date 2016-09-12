'use strict';
import React from 'react';
import {List} from 'immutable';

export default class CalculatorOperations extends React.Component {
  render() {
    const {operations} = this.props;
    return (
      <div className='calculators__operations'>
          {
            operations.reverse().map((operation, index) => {
              return <Operation key={index} operation={operation}/>;
            })
          }
      </div>
    );
  }
}

CalculatorOperations.propTypes = {
  operations: React.PropTypes.instanceOf(List)
};

class Operation extends React.Component {
  render() {
    const {operation, key} = this.props;

    return (
      <div key={key} className='operation__entry'>
          <p>{operation}</p>
      </div>
    );
  }
}

Operation.propTypes = {
  key: React.PropTypes.number,
  operation: React.PropTypes.string
};
