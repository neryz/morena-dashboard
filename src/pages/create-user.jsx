import React from 'react';
import { navigate } from '@reach/router';

// Material Components
import { Grid, Cell, Row } from '@material/react-layout-grid';
import { Headline4 } from '@material/react-typography';
import Button from '@material/react-button';

// Components
import Layout from '../components/layout';

const NewUserPage = () => (
  <Layout>
    <section className="morena--section__body morena--section__body__full">
      <Grid>
        <Row>
          <Cell desktopColumns={12} style={{ textAlign: 'center' }}>
            <Headline4>¿Qué tipo de usuario desea agregar?</Headline4>

            <Row>
              <Cell desktopColumns={12}>
                <Button raised onClick={() => navigate('/new/cot')}>
                  NUEVO COT
                </Button>
              </Cell>
              <Cell desktopColumns={12}>
                <Button raised>NUEVO ADMINISTRADOR</Button>
              </Cell>
              <Cell desktopColumns={12}>
                <Button onClick={() => navigate('/new/user')} raised>
                  NUEVO COORDINADOR
                </Button>
              </Cell>
            </Row>
          </Cell>
        </Row>
      </Grid>
    </section>
  </Layout>
);

export default NewUserPage;
