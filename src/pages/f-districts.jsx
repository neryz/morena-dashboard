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

const FDistrictsPage = () => {
  const [fDistricts, setFDistricts] = useState(null);

  const fetchFDistricts = async () => {
    const { data } = await axios({
      method: 'GET',
      url: `${config.apiUrl}/f-districts`,
    });

    setFDistricts(data);
  };

  useEffect(() => {
    fetchFDistricts();
  }, []);

  return (
    <Layout>
      <section className="morena--section__body">
        <Grid>
          <Row>
            <Cell desktopColumns={12}>
              <h1>Esta es la página de distritos</h1>
              {fDistricts &&
                fDistricts.map((fDistrict) => (
                  <DistrictItem
                    key={fDistrict._id}
                    title={`${fDistrict.number}. ${fDistrict.name}`}
                  />
                ))}
            </Cell>
          </Row>
        </Grid>
      </section>
    </Layout>
  );
};

export default FDistrictsPage;
