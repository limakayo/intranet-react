import React from 'react';
import MenuItem from './MenuItem';
import Icon from '@material-ui/core/Icon';

const Menu = (props) => (
  <div>
    <MenuItem location="/home" title="Home">
      <Icon>home</Icon>
    </MenuItem>
    <MenuItem location="/ordens" title="Ordens">
      <Icon>description</Icon>
    </MenuItem>
    <MenuItem location="/clientes" title="Clientes">
      <Icon>people</Icon>
    </MenuItem>
    <MenuItem location="/cobrancas" title="Cobranças">
      <Icon>credit_card</Icon>
    </MenuItem>
  </div>
)

export default Menu
