import React from 'react';
import { Link } from 'react-router-dom';

import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import Divider from '@material-ui/core/Divider';

function CobrancasRowComponent(props) {
	const { cobranca } = props

  return (
    <div>
      <ListItem
        button
        component={Link}
        to={`/cobrancas/${cobranca.cliente._id}`}>
        <ListItemText
          primary={cobranca.cliente.nome} />
      </ListItem>
      <Divider />
    </div>
  );
}

export default CobrancasRowComponent
