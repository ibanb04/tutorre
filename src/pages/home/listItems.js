import React from 'react';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import ListSubheader from '@material-ui/core/ListSubheader';
import DashboardIcon from '@material-ui/icons/Dashboard';
import ShoppingCartIcon from '@material-ui/icons/ShoppingCart';
import PeopleIcon from '@material-ui/icons/People';
import HomeIcon from '@material-ui/icons/Home';
import AssignmentIcon from '@material-ui/icons/Assignment';
import ApartmentIcon from '@material-ui/icons/Apartment';
import PersonIcon from '@material-ui/icons/Person';

export const mainListItems = (
  <div>
    <ListItem button component="a" href="/users">
      <ListItemIcon>
        <PeopleIcon />
      </ListItemIcon>
      <ListItemText primary="Usuarios" />
    </ListItem>
    <ListItem button component="a" href="/torres">
      <ListItemIcon>
        <ApartmentIcon />
      </ListItemIcon>
      <ListItemText primary="Torres" />
    </ListItem>
    <ListItem button component="a" href="/apartamentos">
      <ListItemIcon>
        <HomeIcon />
      </ListItemIcon>
      <ListItemText primary="Apartamentos" />
    </ListItem>
    <ListItem button component="a" href="/inquilinos">
      <ListItemIcon>
        <PersonIcon />
      </ListItemIcon>
      <ListItemText primary="Inquilinos" />
    </ListItem>
  </div>
);

export const secondaryListItems = (
  <div>
  
  </div>
);