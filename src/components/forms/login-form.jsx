import React, { useContext } from 'react';
import { Formik } from 'formik';
import { navigate } from '@reach/router';
import axios from 'axios';

// Material Design
import TextField, { Input } from '@material/react-text-field';

import MaterialIcon from '@material/react-material-icon';
import Button from '@material/react-button';

// Context
import AuthContext from '../../contexts/auth-context';

import config from '../../config';

const Basic = () => {
  const { setToken } = useContext(AuthContext);

  const login = async ({ email, password }) => {
    try {
      const response = await axios({
        method: 'POST',
        url: `${config.apiUrl}/users/login`,
        headers: {
          'super-api-key': process.env.REACT_APP_SUPER_API_KEY,
        },
        data: {
          email,
          password,
        },
      });

      localStorage.setItem('token', response.data.token);
      setToken(response.data.token);
      navigate('/');
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Formik
      initialValues={{ email: '', password: '' }}
      validate={(values) => {
        const errors = {};
        if (!values.email) {
          errors.email = 'Required';
        } else if (
          !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(values.email)
        ) {
          errors.email = 'El correo está mal escrito';
        }
        return errors;
      }}
      onSubmit={(values, { setSubmitting }) => {
        login(values);
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
          <TextField
            label="Correo electrónico"
            dense
            leadingIcon={<MaterialIcon role="button" icon="email" />}
          >
            <Input
              value={values.email}
              onChange={handleChange}
              type="email"
              name="email"
              onBlur={handleBlur}
            />
          </TextField>

          <br />
          <br />
          <TextField
            label="Contraseña"
            dense
            leadingIcon={<MaterialIcon role="button" icon="https" />}
          >
            <Input
              value={values.password}
              onChange={handleChange}
              type="password"
              name="password"
              onBlur={handleBlur}
            />
          </TextField>

          <br />
          <br />
          <Button type="submit" disabled={isSubmitting} raised>
            Iniciar sesión
          </Button>
        </form>
      )}
    </Formik>
  );
};

export default Basic;
