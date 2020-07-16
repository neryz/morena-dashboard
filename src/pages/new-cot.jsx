import React, { useContext } from 'react';
import { Formik } from 'formik';
import { navigate } from '@reach/router';

// Material Components
import { Grid, Cell, Row } from '@material/react-layout-grid';
import TextField, { Input } from '@material/react-text-field';
import { Headline4, Headline6 } from '@material/react-typography';
import Button from '@material/react-button';

// Components
import Layout from '../components/layout';

// Context
import NewUserContext from '../contexts/new-user-context';

const NewCOTPage = () => {
  const { setNewUser } = useContext(NewUserContext);

  return (
    <Layout>
      <section className="morena--section__body">
        <Grid>
          <Row>
            <Cell desktopColumns={12} style={{ textAlign: 'center' }}>
              <Headline4>NUEVO COT</Headline4>

              <Row>
                <Cell desktopColumns={2} />
                <Cell desktopColumns={8}>
                  <Formik
                    initialValues={{
                      firstName: '',
                      lastName1: '',
                      lastName2: '',
                      street1: '',
                      street2: '',
                      delegation: '',
                      zipCode: '',
                      email: '',
                      phoneNumber: '',
                    }}
                    validate={(values) => {
                      const errors = {};
                      if (!/^[a-zA-Z0-9]{6,}$/.test(values.ine)) {
                        errors.ine = 'La clave de elector está mal escrita';
                      }

                      if (!values.email) {
                        errors.email = 'Required';
                      } else if (
                        !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(
                          values.email,
                        )
                      ) {
                        errors.email = 'El correo está mal escrito';
                      }
                      return errors;
                    }}
                    onSubmit={(values, { setSubmitting }) => {
                      setNewUser(values);
                      setSubmitting(false);
                      navigate('/new/cot/pass');
                    }}
                  >
                    {({
                      values,
                      errors,
                      touched,
                      handleChange,
                      handleBlur,
                      handleSubmit,
                      isSubmitting,
                      /* and other goodies */
                    }) => (
                      <form onSubmit={handleSubmit}>
                        <Row>
                          <Cell desktopColumns={12}>
                            <TextField
                              label="Nombre(s)"
                              outlined
                              style={{ width: '100%' }}
                            >
                              <Input
                                value={values.firstName}
                                onChange={handleChange}
                                type="text"
                                name="firstName"
                                onBlur={handleBlur}
                              />
                            </TextField>
                          </Cell>

                          <Cell desktopColumns={6}>
                            <TextField
                              label="Primer apellido"
                              outlined
                              style={{ width: '100%' }}
                            >
                              <Input
                                value={values.lastName1}
                                onChange={handleChange}
                                type="text"
                                name="lastName1"
                                onBlur={handleBlur}
                              />
                            </TextField>
                          </Cell>

                          <Cell desktopColumns={6}>
                            <TextField
                              label="Segundo apellido"
                              outlined
                              style={{ width: '100%' }}
                            >
                              <Input
                                value={values.lastName2}
                                onChange={handleChange}
                                type="text"
                                name="lastName2"
                                onBlur={handleBlur}
                              />
                            </TextField>
                          </Cell>

                          <Cell desktopColumns={6}>
                            <TextField
                              label="Calle"
                              outlined
                              style={{ width: '100%' }}
                            >
                              <Input
                                value={values.street1}
                                onChange={handleChange}
                                type="text"
                                name="street1"
                                onBlur={handleBlur}
                              />
                            </TextField>
                          </Cell>

                          <Cell desktopColumns={6}>
                            <TextField
                              label="Colonia o localidad"
                              outlined
                              style={{ width: '100%' }}
                            >
                              <Input
                                value={values.street2}
                                onChange={handleChange}
                                type="text"
                                name="street2"
                                onBlur={handleBlur}
                              />
                            </TextField>
                          </Cell>

                          <Cell desktopColumns={6}>
                            <TextField
                              label="Municipio"
                              outlined
                              style={{ width: '100%' }}
                            >
                              <Input
                                value={values.delegation}
                                onChange={handleChange}
                                type="text"
                                name="delegation"
                                onBlur={handleBlur}
                              />
                            </TextField>
                          </Cell>

                          <Cell desktopColumns={6}>
                            <TextField
                              label="Código Postal"
                              outlined
                              style={{ width: '100%' }}
                            >
                              <Input
                                value={values.zipCode}
                                onChange={handleChange}
                                type="text"
                                name="zipCode"
                                onBlur={handleBlur}
                              />
                            </TextField>
                          </Cell>

                          <Cell desktopColumns={6}>
                            <TextField
                              label="Correo electrónico"
                              outlined
                              style={{ width: '100%' }}
                            >
                              <Input
                                value={values.email}
                                onChange={handleChange}
                                type="email"
                                name="email"
                                onBlur={handleBlur}
                              />
                            </TextField>
                          </Cell>

                          <Cell desktopColumns={6}>
                            <TextField
                              label="Número de teléfono"
                              outlined
                              style={{ width: '100%' }}
                            >
                              <Input
                                value={values.phoneNumber}
                                onChange={handleChange}
                                type="text"
                                name="phoneNumber"
                                onBlur={handleBlur}
                              />
                            </TextField>
                          </Cell>

                          <Cell desktopColumns={12}>
                            <Headline6>Clave de elector</Headline6>

                            <TextField
                              label="Escribe los 18 dígitos de la clave de elector"
                              outlined
                              style={{ width: '100%' }}
                            >
                              <Input
                                value={values.ine}
                                onChange={handleChange}
                                type="text"
                                name="ine"
                                onBlur={handleBlur}
                              />
                            </TextField>
                          </Cell>
                        </Row>
                        <br />
                        <br />
                        <br />

                        <Button type="submit" raised>
                          Siguiente
                        </Button>
                      </form>
                    )}
                  </Formik>
                </Cell>
              </Row>
            </Cell>
          </Row>
        </Grid>
      </section>
    </Layout>
  );
};

export default NewCOTPage;
