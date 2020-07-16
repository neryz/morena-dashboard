import React from 'react';

import MaterialIcon from '@material/react-material-icon';
import { ListItem, ListItemText, ListItemGraphic } from '@material/react-list';

const UserItem = ({ title, subtitle }) => (
  <ListItem style={{ backgroundColor: 'white', marginBottom: '1rem' }}>
    <ListItemGraphic graphic={<MaterialIcon icon="person" />} />
    <ListItemText primaryText={title} secondaryText={subtitle} />
  </ListItem>
);

export default UserItem;
