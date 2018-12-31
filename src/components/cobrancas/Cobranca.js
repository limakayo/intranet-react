import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import FormControl from '@material-ui/core/FormControl';
import Input from '@material-ui/core/Input';
import InputLabel from '@material-ui/core/InputLabel';
import Typography from '@material-ui/core/Typography';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import TextField from '@material-ui/core/TextField';

import Currency from '../Currency';
import Table from '../Table';
import { observer } from 'mobx-react';

const styles = theme => ({
	root: {
		marginTop: 24,
		marginLeft: 24,
		marginRight: 24,
		marginBottom: 90,
		[theme.breakpoints.down('sm')]: {
      marginTop: 16,
      marginLeft: 32,
      marginRight: 32
    },
	},
})

const Cobranca = observer(function Cobranca(props) {
	const { 
		classes, 
		cliente, 
		ordens, 
		valorTotal,
		pagamentos 
	} = props

  return (
  	<div className={classes.root}>
      <Grid container spacing={24}>
      	<Grid item xs={8}>
	      	{ordens.map((ordem) => (
	      		<Grid item xs={12} key={ordem.numero}>
	      			<Grid container spacing={24}>
	      				<Grid item xs={12}>
			      			<Typography variant="title">
					          {ordem.numero}
					        </Typography>
					      </Grid>
					      <Grid item xs={4}>
						      <FormControl margin="dense" fullWidth>
						        <InputLabel htmlFor="valorTotal">Valor Total</InputLabel>
						        <Input
						          id="valorTotal"
						          value={ordem.valorTotal ? ordem.valorTotal : '0,00'}
						          inputComponent={Currency}
						          disabled/>
						      </FormControl>
						    </Grid>
						    <Grid item xs={4}>
						    	<FormControl margin="dense" fullWidth>
					          <InputLabel htmlFor="formaPagamento">Forma Pagamento</InputLabel>
					          <Select
					            value={ordem.pagamento}
					            input={<Input id="pagamento" />}
					          >
					            {pagamentos.map((e) => {
					              return <MenuItem key={e._id} value={e._id}>{e.nome}</MenuItem>
					            })}
					          </Select>
					        </FormControl>
						    </Grid>
						    <Grid item xs={4}>
						    	<TextField
					          id="dataPagamento"
					          label="Data Pagamento"
					          type="date"
					          fullWidth
					          margin="dense"
					          value={ordem.dataPagamento}
					          InputLabelProps={{
					            shrink: true,
					          }}/>
						    </Grid>
					    </Grid>
				    </Grid>
	      	))}
	      </Grid>
	      <Grid item xs={4}>
	      	<Typography variant="title">
	          Cliente
	        </Typography>
	        <div style={{ marginTop: '1em' }}>
		        {cliente ? (
		        	<Table title="Nome" value={cliente.nome}/>
		        ) : null}
		        {cliente ? (
		        	cliente.contatos && cliente.contatos.slice(0,1).map((e) => (
					    	<div key={e.id}>
					      	<Table title="Contato" value={e.nome} />
					      	<Table title="E-mail" value={e.email}/>
					      	<Table title="Telefone" value={`${e.ddd} ${e.telefone}`}/>
					      	<Table title="Celular" value={`${e.ddd} ${e.celular}`}/>
					      </div>
				    	))
		        ) : null}
		      </div>
		      <FormControl margin="dense" fullWidth>
		        <InputLabel htmlFor="valorTotal">Valor Total</InputLabel>
		        <Input
		          id="valorTotal"
		          value={valorTotal}
		          inputComponent={Currency}
		          disabled/>
		      </FormControl>
      	</Grid>
		  </Grid>
		</div>
	)
})

Cobranca.propTypes = {
	classes: PropTypes.object.isRequired
}

export default withStyles(styles)(Cobranca)
