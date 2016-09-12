'use strict';
import React from 'react';
import {List} from 'immutable';
import _ from 'lodash';
//import moment from 'moment';


export default class Calculator extends React.Component {
  constructor(props, context) {
    super(props, context);
    this.state = {
      operations: null,
      currentOperation: null
    };
  }

  componentDidMount() {
    // TODO:  get session from cookie
  }

  componentWillUnmount() {
    // TODO: save session
  }

  getOperationsList() {
    return this.state.operations || new List();
  }

  onChange(e) {
    // TODO:  eval the operation and return value
    const operation = _.replace(e.target.value, /([^\*\+\/\(\)\d]+)/gi, '');
    this.setState({currentOperation: operation});
  }

  render() {
    return (
      <div className='drone-strikes__wrapper'>
            <div>
              <div>{/*ADD OPERATION*/}</div>
              <input
                type='text'
                onChange={(e)=>this.onChange(e)}
                value={this.state.currentOperation}
              />
            </div>
      </div>
    );
  }
}
