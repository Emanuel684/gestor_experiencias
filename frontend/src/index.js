import React from 'react';
import ReactDOM from 'react-dom';

import Login_page from './Pages/login_page';
import Registro_page from './Pages/registro_page';
import Inicio_page from './Pages/inicio_page';


import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

ReactDOM.render(
  <React.StrictMode>
    <Router>
      <Switch>
        <Route path="/" exact>
          <Login_page />
        </Route>
        <Route path="/registro" exact>
          <Registro_page />
        </Route>
        <Route path="/login/inicio" exact>
          <Inicio_page />
        </Route>
      </Switch>
    </Router>
  </React.StrictMode>,
  document.getElementById("root")
);

