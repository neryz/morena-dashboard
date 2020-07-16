import React from 'react';

// Material Components
import Card, { CardPrimaryContent } from '@material/react-card';
import { Headline4, Headline6 } from '@material/react-typography';
import MaterialIcon from '@material/react-material-icon';

const ButtonXL = ({ data, action, icon }) => (
  <Card>
    <CardPrimaryContent>
      <MaterialIcon icon={icon} />
      <Headline4>{data.total}</Headline4>
      <Headline6>{action.name}</Headline6>
    </CardPrimaryContent>
  </Card>
);

export default ButtonXL;
