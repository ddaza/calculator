import React from 'react';
import { render } from 'react-dom';
import { Router, Route, IndexRoute, hashHistory } from 'react-router';
import App from './components/App.react';
import Calculator from './components/Calculator/Calculator.react';
import About from './components/About.react';

render(
  (<Router history={hashHistory}>
    <Route path='/' component={App}>
      <IndexRoute component={Calculator}/>
      <Route path='/calculator' component={Calculator} />
      <Route path='/about' component={About} />
    </Route>
  </Router>), document.getElementById('content')
);
