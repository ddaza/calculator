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
    this.state = {
      operations: fromJS(cookie.load('operations') || []).toList(),
      currentOperation: null
    };
  }

  getOperationsList() {
    return this.state.operations || new List();
  }

  onChange(e) {
    // TODO:  eval the operation and return value
    const operation = _.replace(e.target.value, /([^\*\+\/\(\)\d]+)/gi, '');
    this.setState({currentOperation: operation});
  }

  saveState(operations) {
    let newOperations = operations;

    if (operations.size > 10) {
      newOperations = operations.slice(operations.size - 10, operations.size);
    }

    this.setState({operations: newOperations});
    cookie.save('operations', newOperations.toJS());
  }

  onKeyPress(e) {
    if (e.charCode === 13) {
      try {
        const operations = this.getOperationsList();
        const result = eval(this.state.currentOperation);
        const stringResult = String(this.state.currentOperation + ' = ' + result);
        if (!operations.contains(stringResult)) {
          this.saveState(operations.push(stringResult));
        }
      } catch (error) {
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
