import * as React from 'react';
import * as ReactDOM from 'react-dom';
import {
  BrowserRouter as Router,
  Switch,
  Route,
} from "react-router-dom";

// import Hello from './containers/Hello';
import { Provider } from 'react-redux';
import { createStore } from 'redux';
import { enthusiasm } from './reducers/index';
import { Header, LogIn, Home } from './components';

import './index.css';

const store = createStore(enthusiasm, {
  enthusiasmLevel: 1,
  languageName: 'TypeScript',
});

ReactDOM.render(
  <Provider store={store}>
    <Router>
      { Header }
      
      <Switch>
        <Route exact path="/" children={<Home />} ></Route>
        <Route exact path="/login" children={<LogIn registerFlag={false} />} ></Route>
        <Route exact path="/register" children={<LogIn registerFlag={true} />} ></Route>
        {/* <Route path="/deploy_election" children={<Deployer warning={<ConstructionWarning />} />} ></Route>
        <Route path="/vote" children={<Finder warning={<ConstructionWarning />} />}  ></Route>
        <Route path="/election/:id" children={<Election warning={<ConstructionWarning />} />} ></Route> */}
      </Switch>
    </Router>
  </Provider>,
  document.getElementById('root') as HTMLElement
);
