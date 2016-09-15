'use strict';
import React from 'react';
import {List} from 'immutable';
import _ from 'lodash';
import uuid from 'node-uuid';
import cookie from 'react-cookie';
import CalculatorOperations from './CalculatorComponents.react';
import {saveSession, saveCalculatorData, loadCalculatorData} from '../../api';

export default class Calculator extends React.Component {
  constructor(props, context) {
    super(props, context);
    // Load state from cookie

    let sessionId = cookie.load('session');

    if (!sessionId) {
      sessionId = uuid.v1();
      cookie.save('session', sessionId);
      saveSession(sessionId);
    }

    this.state = {
      session: sessionId,
      operations: new List(),
      currentOperation: null
    };
  }

  componentDidMount() {
    const sessionId = this.state.session;

    this.loadSession(sessionId).then((data) => {
      this.setState({
        session: sessionId,
        operations: data,
        currentOperation: null
      });
    });
  }

  getOperationsList() {
    // get stored state or default to an empty list
    return this.state.operations || new List();
  }

  loadInputSession() {
    const sessionId = this.refs.sessionIdInput.value;
    this.loadSession(sessionId).then((operations) => {
      cookie.save('session', sessionId);
      this.setState({session: sessionId, operations});
    });
  }

  loadSession(sessionId) {
    return loadCalculatorData(sessionId).then((data) => {
      if (data === 'null') {
        return new List();
      } else {
        return data;
      }
    });
  }

  onChange(e) {
    // removed values that are not relevant to the calculator
    const operation = _.replace(e.target.value, /([^\*\+\-\/\(\)\d]+)/gi, '');
    this.setState({currentOperation: operation});
  }

  onKeyPress(e) {
    // Calculate the value when the user presses Enter
    if (e.charCode === 13) { // 13 -> Enter key
      try {
        const operations = this.getOperationsList();
        // this is potentially dangerous so I took care of removing any characters that are
        // could not be considered into the calculation and saved them into the state
        const result = eval(this.state.currentOperation); // eslint-disable-line no-eval
        const stringResult = String(this.state.currentOperation + ' = ' + result);
        if (!operations.contains(stringResult)) {
          this.saveState(operations.push(stringResult));
        }
      } catch (error) {
        // If the operation is invalid the console errors out and the value is not saved
        console.error(error); // eslint-disable-line no-console
      }
    }
  }

  saveState(operations) {
    let newOperations = operations;
    const sessionId = this.state.session;

    // save state, only save the last 10 entries into the cookie/array
    if (operations.size > 10) {
      newOperations = operations.slice(operations.size - 10, operations.size);
    }

    this.setState({operations: newOperations});
    saveCalculatorData(sessionId, newOperations);
  }


  render() {
    const sessionId = this.state.session;

    return (
      <div className='drone-strikes__wrapper'>
        <CalculatorSession
          operations={this.getOperationsList()}
          currentOperation={this.state.currentOperation}
          sessionId={sessionId}
          onChange={this.onChange.bind(this)}
          onKeyPress={this.onKeyPress.bind(this)}
        />
        <div>
          <input
            placeholder='Exisiting Session ID'
            type='text'
            ref='sessionIdInput'
          />
          <button onClick={()=>this.loadInputSession()}>
            Load Session
          </button>
        </div>
      </div>
    );
  }
}


class CalculatorSession extends React.Component {
  render() {
    return (
      <div>
        <p>
          SessionId : {this.props.sessionId}
        </p>
        <CalculatorOperations operations={this.props.operations}/>
        <input
          type='text'
          placeholder='example: 2*2, 2-4'
          onChange={e => this.props.onChange(e)}
          value={this.props.currentOperation}
          onKeyPress={e => this.props.onKeyPress(e)}
        />
      </div>
    );
  }
}

CalculatorSession.propTypes = {
  operations: React.PropTypes.instanceOf(List),
  currentOperation: React.PropTypes.string,
  sessionId: React.PropTypes.string,
  onChange: React.PropTypes.func,
  onKeyPress: React.PropTypes.func
};
