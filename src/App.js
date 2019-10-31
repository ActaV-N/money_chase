import React from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route
} from "react-router-dom";

import {Home, Admin} from './routes'

const App = () => {

  return (
    <Router>
      <Switch>
        <Route path="/" exact>
          <Home/>
        </Route>
        <Route path="/admin">
          <Admin/>
        </Route>
      </Switch>
    </Router>
  );
}

export default App;