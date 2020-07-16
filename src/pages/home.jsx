import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { navigate } from '@reach/router';

// Layout
import { Grid, Cell, Row } from '@material/react-layout-grid';
import { ChipSet, Chip } from '@material/react-chips';

// Components
import { Headline6 } from '@material/react-typography';
import List from '@material/react-list';
import Layout from '../components/layout';
import ButtonXL from '../components/button-xl';

// Components
import UserItem from '../components/users/user-item';

import config from '../config';

const HomePage = () => {
  const [users, setUsers] = useState(null);
  const [usersPage, setUsersPage] = useState(1);
  const [people, setPeople] = useState(null);

  const fetchUsers = async () => {
    const { data } = await axios({
      method: 'GET',
      url: `${config.apiUrl}/users`,
    });

    setUsers(data);
  };

  const fetchPeople = async () => {
    const { data } = await axios({
      method: 'GET',
      url: `${config.apiUrl}/people`,
      params: {
        page: usersPage,
        perPage: 4,
      },
    });

    setPeople(data);
  };

  useEffect(() => {
    fetchUsers();
    fetchPeople();
  }, []);

  return (
    <Layout>
      <section className="morena--section__body">
        <Grid>
          <Row>
            <Cell desktopColumns={1} />
            <Cell desktopColumns={10}>
              <Row>
                <Cell desktopColumns={3} onClick={() => navigate('/new')}>
                  <ButtonXL
                    data={{ total: 128 }}
                    action={{ name: 'NUEVO REGISTRO' }}
                    icon="add_circle"
                  />
                </Cell>
                <Cell
                  desktopColumns={3}
                  onClick={() => navigate('/distritos/federales')}
                >
                  <ButtonXL
                    data={{ total: 10 }}
                    action={{ name: 'DISTRITO FEDERAL' }}
                    icon="map"
                  />
                </Cell>

                <Cell
                  desktopColumns={3}
                  onClick={() => navigate('/distritos/locales')}
                >
                  <ButtonXL
                    data={{ total: 25 }}
                    action={{ name: 'DISTRITO LOCAL' }}
                    icon="map"
                  />
                </Cell>

                <Cell desktopColumns={3}>
                  <ButtonXL
                    data={{ total: 2450 }}
                    action={{ name: 'SECCIÓN ELECTORAL' }}
                    icon="flag"
                  />
                </Cell>
              </Row>
            </Cell>
          </Row>
        </Grid>
        <Grid>
          <Row>
            <Cell desktopColumns={1} />
            <Cell desktopColumns={5}>
              <Row>
                <Cell style={{ width: '15vw' }}>
                  <Headline6 style={{ marginBottom: '0' }}>
                    Últimos registros
                  </Headline6>
                </Cell>
                <Cell style={{ width: '15vw', textAlign: 'right' }}>
                  <Headline6 style={{ marginBottom: '0', textAlign: 'right' }}>
                    Total: 1355
                  </Headline6>
                </Cell>
              </Row>
              {people && (
                <List twoLine>
                  {people.map((user) => (
                    <UserItem
                      title={`${user.firstName} ${user.lastName1} ${user.lastName2}`}
                      subtitle={user.status || ''}
                    />
                  ))}
                </List>
              )}

              <ChipSet>
                <Chip
                  id="page-1"
                  key="page-1"
                  label="1"
                  selected={usersPage === 1}
                  onClick={() => {
                    setUsersPage(1);
                    fetchPeople();
                  }}
                />
                <Chip
                  id="page-2"
                  key="page-2"
                  label="2"
                  selected={usersPage === 2}
                  onClick={() => {
                    setUsersPage(2);
                    fetchPeople();
                  }}
                />
                <Chip
                  id="page-3"
                  key="page-3"
                  label="3"
                  selected={usersPage === 3}
                  onClick={() => {
                    setUsersPage(3);
                    fetchPeople();
                  }}
                />
              </ChipSet>
            </Cell>
            <Cell desktopColumns={5}>
              <Row>
                <Cell style={{ width: '15vw' }}>
                  <Headline6 style={{ marginBottom: '0' }}>Usuarios</Headline6>
                </Cell>
              </Row>
              {users && (
                <List twoLine>
                  {users.map((user) => (
                    <UserItem
                      title={`${user.firstName} ${user.lastName1} ${user.lastName2}`}
                      subtitle={user.email || ''}
                    />
                  ))}
                </List>
              )}

              <ChipSet>
                <Chip id="users-page-1" key="users-page-1" label="1" />
              </ChipSet>
            </Cell>
          </Row>
        </Grid>
      </section>
    </Layout>
  );
};

export default HomePage;
