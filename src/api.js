'use strict';
import request from 'superagent';
import {fromJS} from 'immutable';
import Firebase from 'firebase';
const timeout = 5000;  // 5 seconds

const calculatorSession = new Firebase('https://calculator-dd.firebaseio.com/');

function handleCall(resolve, reject) {
  return function (err, res) {
    if (res.status === 200 && !err) {
      return resolve(fromJS(JSON.parse(res.text)));
    } else {
      console.log(err.response); // eslint-disable-line no-console
      return reject(fromJS(JSON.parse(err.response.text)));
    }
  };
}

export function get(path, query={}) {
  return new Promise((resolve, reject) => {
    request
    .get(path)
    .query(query)
    .timeout(timeout)
    .end(handleCall(resolve, reject));
  });
}

export function post(path, query) {
  return new Promise((resolve, reject) => {
    request
    .post(path)
    .query(handleCall(query))
    .timeout(timeout)
    .end(handleCall(resolve, reject));
  });
}

export function saveSession(sessionId) {
  const session = calculatorSession.child(sessionId);
  session.set('null');
}

export function saveCalculatorData(session, data) {
  return calculatorSession.child(session).set(data.toJS());
}

export function loadCalculatorData(sessionPath) {
  return new Promise((resolve, reject) => {
    try {
      calculatorSession.child(sessionPath).on('value', (data) => {
        if (data.exists()) {
          resolve(fromJS(data.val()));
        } else {
          reject('No Data');
        }
      });
    } catch (e) {
      reject(e);
    }
  });
}
