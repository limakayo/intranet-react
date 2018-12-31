import React from 'react';
import { Link } from 'react-router-dom';

import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import Divider from '@material-ui/core/Divider';
import moment from 'moment'
import 'moment-timezone'

function getOrdemInfo(ordem) {
  return (
    `${moment(ordem.createdAt).format('DD/MM/YYYY kk:mm:ss')} | ${ordem.modelo} | ${ordem.cliente.nome}`
  )
}

function OrdensRowComponent(props) {
	const { ordem } = props

  return (
    <div key={ordem.numero}>
      <ListItem
        button
        component={Link}
        to={`/ordens/editar/${ordem.numero}`}>
        <ListItemText
          primary={ordem.numero}
          secondary={getOrdemInfo(ordem)}/>
      </ListItem>
      <Divider />
    </div>
  );
}

export default OrdensRowComponent