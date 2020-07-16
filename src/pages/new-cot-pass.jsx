import React, { useContext, useState, useEffect } from 'react';
import { Formik } from 'formik';
import axios from 'axios';

// Material Components
import { Grid, Cell, Row } from '@material/react-layout-grid';
import TextField, { Input } from '@material/react-text-field';
import Select, { Option } from '@material/react-select';
import { Headline4 } from '@material/react-typography';
import Button from '@material/react-button';

// Components
import Layout from '../components/layout';

// Context
import NewUserContext from '../contexts/new-user-context';

// Styles
import '../styles/menu.scss';
import '../styles/select.scss';

import config from '../config';

const NewUserCOTPage = () => {
  const { newUser } = useContext(NewUserContext);
  const [extractedData, setExtractedData] = useState(null);
  const [fDistricts, setFDistricts] = useState(null);

  const saveUser = async (body) => {
    const response = await axios({
      method: 'POST',
      url: `${config.apiUrl}/people`,
      data: body,
    });

    console.log(response.data);
  };

  const fetchDistricts = async () => {
    const { data } = await axios({
      method: 'GET',
      url: 'http://localhost:8000/api/v1/f-districts',
    });

    setFDistricts(data);
  };

  const extractDataAtIne = async () => {
    const response = await axios({
      method: 'POST',
      url: 'http://localhost:8000/api/v1/utilities/ine-extractor',
      data: {
        ine: newUser.ine,
      },
    });

    setExtractedData(response.data);
  };

  useEffect(() => {
    fetchDistricts();
  }, []);

  return (
    <Layout>
      <section className="morena--section__body">
        <Grid>
          <Row>
            <Cell desktopColumns={2} />
            <Cell desktopColumns={8}>
              <Headline4>Agrega contraseña</Headline4>
            </Cell>
            <Cell desktopColumns={2} />

            <Cell desktopColumns={2} />
            <Cell desktopColumns={8}>
              <Formik
                initialValues={{
                  password: '',
                  passwordConfirmation: '',
                  sections: '',
                }}
                validate={(values) => {
                  const errors = {};

                  if (!values.password) {
                    errors.password = 'Escribe la contraseña';
                  } else if (!values.passwordConfirmation) {
                    errors.passwordConfirmation =
                      'Escribe la confirmación de la contraseña';
                  } else if (values.password !== values.passwordConfirmation) {
                    errors.password = 'Las contraseñas no coinciden';
                  }

                  return errors;
                }}
                onSubmit={(values, { setSubmitting }) => {
                  extractDataAtIne();

                  saveUser({
                    email: newUser.email,
                    firstName: newUser.firstName,
                    lastName1: newUser.lastName1,
                    lastName2: newUser.lastName2,
                    phoneNumber: [
                      { name: 'Particular', number: newUser.phoneNumber },
                    ],
                    address: {
                      street1: newUser.street1,
                      street2: newUser.street2,
                      delegation: newUser.delegation,
                      zipCode: newUser.zipCode,
                    },
                    ine: {
                      key: newUser.ine,
                    },
                    sections: [values.sections.split(',')],
                    gender: extractedData ? extractedData.gender : '',
                    birthday: extractedData ? extractedData.birthday : '',
                    password: values.password,
                    passwordConfirmation: values.passwordConfirmation,
                    fDistrict: values.fDistrict,
                  });

                  setSubmitting(false);
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
                      <Cell desktopColumns={6}>
                        <TextField
                          label="Contraseña"
                          outlined
                          style={{ width: '100%' }}
                        >
                          <Input
                            value={values.password}
                            onChange={handleChange}
                            type="password"
                            name="password"
                            onBlur={handleBlur}
                          />
                        </TextField>
                      </Cell>

                      <Cell desktopColumns={6}>
                        <TextField
                          label="Confirmación de contraseña"
                          outlined
                          style={{ width: '100%' }}
                        >
                          <Input
                            value={values.passwordConfirmation}
                            onChange={handleChange}
                            type="password"
                            name="passwordConfirmation"
                            onBlur={handleBlur}
                          />
                        </TextField>
                      </Cell>
                    </Row>

                    <br />
                    <br />
                    <br />

                    <Row>
                      <Cell desktopColumns={6}>
                        {fDistricts && (
                          <Select
                            value={values.fDistrict}
                            style={{ width: '100%' }}
                            label="Selecciona un distrito"
                            onChange={handleChange}
                            onBlur={handleBlur}
                            name="fDistrict"
                          >
                            <Option value="" label="" />
                            {fDistricts.map((fDistrict) => (
                              <Option key={fDistrict._id} value={fDistrict._id}>
                                {fDistrict.number}.&nbsp;
                                {fDistrict.name}
                              </Option>
                            ))}
                          </Select>
                        )}
                      </Cell>

                      <Cell desktopColumns={6}>
                        <TextField
                          label="Asigna secciones"
                          outlined
                          style={{ width: '100%' }}
                        >
                          <Input
                            value={values.sections}
                            onChange={handleChange}
                            type="sections"
                            name="sections"
                            onBlur={handleBlur}
                          />
                        </TextField>
                      </Cell>
                    </Row>

                    <br />
                    <br />
                    <br />

                    <Button type="submit" raised>
                      Guardar
                    </Button>
                  </form>
                )}
              </Formik>
            </Cell>
          </Row>
        </Grid>
      </section>
    </Layout>
  );
};

export default NewUserCOTPage;
