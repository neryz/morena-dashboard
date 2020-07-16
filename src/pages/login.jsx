import React from 'react';

// Material Design
import { Grid, Cell, Row } from '@material/react-layout-grid';

// Components
import LoginForm from '../components/forms/login-form';

// Logo
import logo from '../assets/images/logo.png';

// Styles
import '../styles/image.scss';

const LoginPage = () => {
  return (
    <section className="morena--section morena--section__primary">
      <Grid>
        <Row>
          <Cell desktopColumns={12} className="morena-logo--container">
            <img alt="Tequio 2022" src={logo} className="morena-logo" />
          </Cell>

          <Cell desktopColumns={12} className="morena--align__center">
            <LoginForm />
          </Cell>
        </Row>
      </Grid>
    </section>
  );
};

export default LoginPage;
