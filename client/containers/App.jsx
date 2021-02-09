import React from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
} from "react-router-dom";
import Login from '../containers/Login.jsx';

const App = () => {
  return (
    <Router>
      <Switch>
        <Route path="/">
          <Login/>
        </Route>
        <Route path="/signup">
          {/* Add Signup here - but should render conditionally, on click of link - use useHistory in Login component */}
        </Route>
      </Switch>
    </Router>
  )
}

export default App;