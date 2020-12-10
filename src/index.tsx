import * as React from 'react';
import * as ReactDOM from 'react-dom';
import {
  BrowserRouter as Router,
  Switch,
  Route,
} from "react-router-dom";

// import Hello from './containers/Hello';
import { Header, LogIn, Home } from './components';

import './index.css';


ReactDOM.render(
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
  </Router>,
  document.getElementById('root') as HTMLElement
);
