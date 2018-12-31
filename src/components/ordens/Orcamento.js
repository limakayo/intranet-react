import React from 'react';
import TextField from '@material-ui/core/TextField';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';

import { observer } from 'mobx-react';

const Orcamento = observer(function Orcamento(props) {
	const { 
		ordem,
		handleChangeUppercase,
		handleChangeUppercaseFirst,
	} = props

	return (
		<div>
			<Grid container spacing={8}>
	    	<Grid item xs={12}>
	        <Typography variant="title">
	          Orçamento
	        </Typography>
	      </Grid>
				<Grid item xs={12}>
					<TextField
		        id="observacoesOrcamento"
		        label="Observações Orçamento"
		        fullWidth
		        margin="dense"
		        value={ordem.observacoesOrcamento}
		        onChange={handleChangeUppercase.bind(this, 'observacoesOrcamento')}
		      />
		    </Grid>
		    <Grid item xs={12}>
		      <TextField
		        id="defeitoTecnico"
		        label="Defeito Técnico"
		        fullWidth
						value={ordem.defeitoTecnico}
		        onChange={handleChangeUppercaseFirst.bind(this, 'defeitoTecnico')}
		        margin="dense"
		      />
		    </Grid>
		    <Grid item xs={12}>
		      <TextField
		        id="solucaoTecnica"
		        label="Solução Técnica"
		        fullWidth
						value={ordem.solucaoTecnica}
		        onChange={handleChangeUppercaseFirst.bind(this, 'solucaoTecnica')}
		        margin="dense"
		      />
		    </Grid>
		    <Grid item xs={12}>
		      <TextField
		        id="defeito"
		        label="Defeito"
		        fullWidth
		        value={ordem.defeito}
		        onChange={handleChangeUppercaseFirst.bind(this, 'defeito')}
		        disabled={ordem.andamento.ordem > 3}
		        margin="dense"
		      />
		    </Grid>
		    <Grid item xs={12}>
		      <TextField
		        id="solucao"
		        label="Solução"
		        fullWidth
		        value={ordem.solucao}
		        onChange={handleChangeUppercaseFirst.bind(this, 'solucao')}
		        disabled={ordem.andamento.ordem > 3}
		        margin="dense"
		      />
		    </Grid>
		    <Grid item xs={12}>
		      <TextField
		        id="pecas"
		        label="Peças"
		        fullWidth
		        value={ordem.pecas}
		        onChange={handleChangeUppercaseFirst.bind(this, 'pecas')}
		        disabled={ordem.andamento.ordem > 3}
		        margin="dense"
		      />
		    </Grid>

		    <Grid item xs={6}>
		    	<TextField
	          id="prazoEntrega"
	          label="Prazo de entrega"
	          fullWidth
	          value={ordem.prazoEntrega}
	          onChange={handleChangeUppercaseFirst.bind(this, 'prazoEntrega')}
	          margin="dense"
	        />
		    </Grid>
		    <Grid item xs={6}>
		    	<TextField
	          id="tecnico"
	          label="Técnico"
	          fullWidth
	          value={ordem.tecnico}
	          onChange={handleChangeUppercaseFirst.bind(this, 'tecnico')}
	          margin="dense"
	        />
		    </Grid>
	    </Grid>
	  </div>
	)
})

export default Orcamento