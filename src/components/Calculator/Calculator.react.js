'use strict';
import React from 'react';
import {List, fromJS} from 'immutable';
import _ from 'lodash';
import cookie from 'react-cookie';
import CalculatorOperations from './CalculatorComponents.react';
//import moment from 'moment';

export default class Calculator extends React.Component {
  constructor(props, context) {
    super(props, context);
    // Load state from cookie
    this.state = {
      operations: fromJS(cookie.load('operations') || []).toList(),
      currentOperation: null
    };
  }

  getOperationsList() {
    // get stored state or default to an empty list
    return this.state.operations || new List();
  }

  onChange(e) {
    // removed values that are not relevant to the calculator
    const operation = _.replace(e.target.value, /([^\*\+\-\/\(\)\d]+)/gi, '');
    this.setState({currentOperation: operation});
  }

  saveState(operations) {
    let newOperations = operations;

    // save state, only save the last 10 entries into the cookie/array
    if (operations.size > 10) {
      newOperations = operations.slice(operations.size - 10, operations.size);
    }

    this.setState({operations: newOperations});
    cookie.save('operations', newOperations.toJS());
  }

  onKeyPress(e) {
    // Calculate the value when the user presses Enter
    if (e.charCode === 13) { // 13 -> Enter key
      try {
        const operations = this.getOperationsList();
        // this is potentially dangerous so I took care of removing any characters that are
        // could not be considered into the calculation and saved them into the state
        const result = eval(this.state.currentOperation);
        const stringResult = String(this.state.currentOperation + ' = ' + result);
        if (!operations.contains(stringResult)) {
          this.saveState(operations.push(stringResult));
        }
      } catch (error) {
        // If the operation is invalid the console errors out and the value is not saved
        console.error(error);
      }
    }
  }

  render() {
    return (
      <div className='drone-strikes__wrapper'>
        <div>
          <CalculatorOperations operations={this.getOperationsList()}/>
          <input
            type='text'
            onChange={e => this.onChange(e)}
            value={this.state.currentOperation}
            onKeyPress={e => this.onKeyPress(e)}
          />
        </div>
      </div>
    );
  }
}
