import React, { useState, useEffect } from 'react';
import axios from 'axios';

// Material Componentes
import { Grid, Cell, Row } from '@material/react-layout-grid';

// Components
import DistrictItem from '../components/districts/district-item';

// Layout
import Layout from '../components/layout';

// Config
import config from '../config';

const LDistrictsPage = () => {
  const [lDistricts, setLDistricts] = useState(null);
  const [page, setPage] = useState(1);

  const fetchLDistrictsWithPage = async (page) => {
    const { data } = await axios({
      method: 'GET',
      url: `${config.apiUrl}/l-districts`,
      params: { page },
    });

    setLDistricts(data);
  };

  useEffect(() => {
    fetchLDistrictsWithPage(1);
  }, []);

  return (
    <Layout>
      <section className="morena--section__body">
        <Grid>
          <Row>
            <Cell desktopColumns={12}>
              <h1>Esta es la página de distritos</h1>
              {lDistricts &&
                lDistricts.map((lDistrict) => (
                  <DistrictItem
                    key={lDistrict._id}
                    title={`${lDistrict.number}. ${lDistrict.name}`}
                  />
                ))}
            </Cell>
          </Row>
        </Grid>
      </section>
    </Layout>
  );
};

export default LDistrictsPage;
