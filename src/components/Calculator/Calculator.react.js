'use strict';
import React from 'react';
import {Set, fromJS} from 'immutable';
import _ from 'lodash';
import cookie from 'react-cookie';
import CalculatorOperations from './CalculatorComponents.react';
//import moment from 'moment';

export default class Calculator extends React.Component {
  constructor(props, context) {
    super(props, context);
    this.state = {
      operations: fromJS(cookie.load('operations') || []).toSet(),
      currentOperation: null
    };
  }

  getOperationsList() {
    return this.state.operations || new Set();
  }

  onChange(e) {
    // TODO:  eval the operation and return value
    const operation = _.replace(e.target.value, /([^\*\+\/\(\)\d]+)/gi, '');
    this.setState({currentOperation: operation});
  }

  saveState(operations) {
    this.setState({operations});
    cookie.save('operations', operations.slice(0, 9).toJS());
  }

  onKeyPress(e) {
    if (e.charCode === 13) {
      try {
        const result = eval(this.state.currentOperation);
        const operations = this.getOperationsList()
          .add(
            String(this.state.currentOperation + ' = ' + result)
        );

        this.saveState(operations);
      } catch (error) {
        console.log(error);
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
