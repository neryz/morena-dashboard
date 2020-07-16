import React, { useState, useContext } from 'react';
import { navigate } from '@reach/router';

// Material Design
import { Subtitle1, Subtitle2 } from '@material/react-typography';
import TopAppBar, {
  TopAppBarFixedAdjust,
  TopAppBarIcon,
  TopAppBarRow,
  TopAppBarSection,
  TopAppBarTitle,
} from '@material/react-top-app-bar';
import MaterialIcon from '@material/react-material-icon';
import Drawer, {
  DrawerAppContent,
  DrawerContent,
} from '@material/react-drawer';
import List, {
  ListItem,
  ListItemGraphic,
  ListItemText,
} from '@material/react-list';

// Styles
import '../../styles/top-app-bar.scss';
import '../../styles/drawer.scss';

// Images
import logo from '../../assets/images/logo.png';

const Header = ({ children }) => {
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [open, setOpen] = useState(true);

  return (
    <div className="drawer-container">
      <Drawer className="drawer" dismissible open={open}>
        <DrawerContent>
          <br />
          <img alt="Morena Tequio 2022" src={logo} />
          <div className="drawer-container__title">
            <Subtitle1>Bejamín</Subtitle1>
            <Subtitle2>Administrador General</Subtitle2>
          </div>

          <List selectedIndex={selectedIndex} singleSelection>
            <ListItem onClick={() => navigate('/')}>
              <ListItemGraphic graphic={<MaterialIcon icon="home" />} />
              <ListItemText primaryText="Inicio" />
            </ListItem>
            <ListItem>
              <ListItemGraphic graphic={<MaterialIcon icon="message" />} />
              <ListItemText primaryText="Mensajes" />
            </ListItem>
            <div className="drawer-container__title">
              <Subtitle1>Administración</Subtitle1>
            </div>
            <ListItem
              onClick={() => {
                navigate('/new');
                setSelectedIndex(2);
              }}
            >
              <ListItemGraphic graphic={<MaterialIcon icon="add" />} />
              <ListItemText primaryText="Nuevo usuario" />
            </ListItem>
            <ListItem>
              <ListItemGraphic graphic={<MaterialIcon icon="people" />} />
              <ListItemText primaryText="Usuarios" />
            </ListItem>
            <ListItem>
              <ListItemGraphic graphic={<MaterialIcon icon="report" />} />
              <ListItemText primaryText="Informes" />
            </ListItem>

            <div className="drawer-container__title">
              <Subtitle1>Configuración</Subtitle1>
            </div>
            <ListItem onClick={() => navigate('/distritos/federales')}>
              <ListItemGraphic graphic={<MaterialIcon icon="flag" />} />
              <ListItemText primaryText="Distritos federales" />
            </ListItem>
            <ListItem onClick={() => navigate('/distritos/locales')}>
              <ListItemGraphic graphic={<MaterialIcon icon="flag" />} />
              <ListItemText primaryText="Distritos locales" />
            </ListItem>
          </List>
        </DrawerContent>
      </Drawer>

      <DrawerAppContent className="drawer-app-content">
        <TopAppBar>
          <TopAppBarRow>
            <TopAppBarSection align="start">
              <TopAppBarIcon
                navIcon
                onClick={() => setOpen(!open)}
                tabIndex={0}
              >
                <MaterialIcon hasRipple icon="menu" />
              </TopAppBarIcon>

              <TopAppBarTitle>Tequio 2022</TopAppBarTitle>
            </TopAppBarSection>
            <TopAppBarSection align="end" role="toolbar">
              <TopAppBarIcon navIcon tabIndex={0}>
                <MaterialIcon
                  hasRipple
                  icon="magnify"
                  onClick={() => console.log('click')}
                />
              </TopAppBarIcon>
            </TopAppBarSection>
          </TopAppBarRow>
        </TopAppBar>
        <TopAppBarFixedAdjust>{children}</TopAppBarFixedAdjust>
      </DrawerAppContent>
    </div>
  );
};

export default Header;
