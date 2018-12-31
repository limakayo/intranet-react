import React from 'react';
import { observer } from 'mobx-react';
import Grid from '@material-ui/core/Grid';
import List from '@material-ui/core/List';

import CobrancasRow from './CobrancasRow';
import cobrancaStore from '../../stores/CobrancaStore'

const CobrancasList = observer(function CobrancasList() {
  const { cobrancas } = cobrancaStore
	return(
		<Grid container>
      <Grid item xs={12}>
      	<List style={{ paddingTop: 0 }}>
          {cobrancas && cobrancas.map((cobranca) => (
          	<CobrancasRow cobranca={cobranca} key={cobranca.cliente}/>
          ))}
        </List>
      </Grid>
    </Grid>
	)
})

export default CobrancasList
