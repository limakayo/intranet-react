import React from 'react';

import Grid from '@material-ui/core/Grid';
import List from '@material-ui/core/List';

import OrdensRow from './OrdensRow';

function OrdensList(props) {
	const { ordens } = props

	return(
		<Grid container>
      <Grid item xs={12}>
      	<List style={{ paddingTop: 0 }}>
          {ordens && ordens.map((ordem) => (
          	<OrdensRow ordem={ordem} key={ordem.numero}/>   
          ))}
        </List>
      </Grid>
    </Grid>
	)
}

export default OrdensList