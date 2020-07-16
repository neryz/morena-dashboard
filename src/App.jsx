import React, { useState, useMemo } from 'react';
import { Router } from '@reach/router';
import { Global, css } from '@emotion/core';

// Pages
import LoginPage from './pages/login';
import HomePage from './pages/home';
import CreateUserPage from './pages/create-user';
import NewUserPage from './pages/new-user';
import NewCOTPage from './pages/new-cot';
import NewUserPassPage from './pages/new-user-pass';
import NewCOTPassPage from './pages/new-cot-pass';
import FDistrictsPage from './pages/f-districts';
import LDistrictsPage from './pages/l-districts';

// Context
import AuthContext from './contexts/auth-context';
import NewUserContext from './contexts/new-user-context';

// Components
import PrivateRoute from './components/private-route';

// Styles
import './styles/main.scss';
import './styles/layout-grid.scss';
import './styles/material-icon.scss';
import './styles/text-field.scss';
import './styles/button.scss';
import './styles/list.scss';
import './styles/typography.scss';
import './styles/card.scss';

const App = () => {
  const [token, setToken] = useState(localStorage.getItem('token'));
  const [newUser, setNewUser] = useState(null);
  const providerValue = useMemo(() => ({ token, setToken }), [token, setToken]);
  const newUserProviderValue = useMemo(() => ({ newUser, setNewUser }), [
    newUser,
    setNewUser,
  ]);

  return (
    <AuthContext.Provider value={providerValue}>
      <Global
        styles={css`
          body {
            margin: 0;
          }
        `}
      />

      <NewUserContext.Provider value={newUserProviderValue}>
        <Router>
          <PrivateRoute path="/" component={HomePage} />
          <PrivateRoute path="/new" component={CreateUserPage} />
          <PrivateRoute path="/new/user" component={NewUserPage} />
          <PrivateRoute path="/new/cot" component={NewCOTPage} />
          <PrivateRoute path="/new/user/pass" component={NewUserPassPage} />
          <PrivateRoute path="/new/cot/pass" component={NewCOTPassPage} />

          <PrivateRoute
            path="/distritos/federales"
            component={FDistrictsPage}
          />

          <PrivateRoute path="/distritos/locales" component={LDistrictsPage} />

          <LoginPage path="/login" />
        </Router>
      </NewUserContext.Provider>
    </AuthContext.Provider>
  );
};

export default App;
