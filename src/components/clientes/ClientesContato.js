import React from 'react';
import PropTypes from 'prop-types';

import { withStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button'
import Grid from '@material-ui/core/Grid';
import TextField from '@material-ui/core/TextField';
import Typography from '@material-ui/core/Typography';
import FormControl from '@material-ui/core/FormControl';
import Input from '@material-ui/core/Input';
import InputLabel from '@material-ui/core/InputLabel';

import { observer } from 'mobx-react';

import Masked from '../Masked';

const styles = theme => ({
	textField: {
		width: '100%'
	},
	formControl: {
		width: '100%'
	}
})

const ClientesContato = observer(function ClientesContato(props) {
	const { 
		classes, 
		changeContato, 
		removeContato, 
		contato,
		contatos 
	} = props

	return (
		<Grid container spacing={16}>
			<Grid item xs={12}>
	      <Typography variant="body2" style={{ paddingTop: 16 }}>
	        Contato #{contato.id + 1}
	      </Typography>
	    </Grid>
			<Grid item xs={12} sm={3}>
	      <TextField
		      label="Nome"
		      className={classes.textField}
		      value={contato.nome}
					onChange={changeContato.bind(this, 'nome', contato.id)}/>
	    </Grid>
	    <Grid item xs={12} sm={4}>
	      <TextField
		      label="E-mail"
		      className={classes.textField}
		      value={contato.email}
					onChange={changeContato.bind(this, 'email', contato.id)}/>
	    </Grid>
	    <Grid item xs={2} sm={1}>
				<FormControl className={classes.formControl}>
          <InputLabel htmlFor="ddd">DDD</InputLabel>
          <Input
            id="ddd"
            name="ddd"
            fullWidth
            value={contato.ddd}
            inputComponent={Masked}
            inputProps={{
            	mask: ['(', /[1-9]/, /[1-9]/, ')'],
            	guide: false
            }}
            onChange={changeContato.bind(this, 'ddd', contato.id)}
          />
        </FormControl>
	    </Grid>
	    <Grid item xs={5} sm={2}>
	      <FormControl className={classes.formControl}>
          <InputLabel htmlFor="telefone">Telefone</InputLabel>
          <Input
            id="telefone"
            name="telefone"
            fullWidth
            value={contato.telefone}
            inputComponent={Masked}
            inputProps={{
            	mask: [/[1-9]/, /\d/, /\d/, /\d/, '-', /\d/, /\d/, /\d/, /\d/],
            	guide: false
            }}
            onChange={changeContato.bind(this, 'telefone', contato.id)}
          />
        </FormControl>
	    </Grid>
	    <Grid item xs={5} sm={2}>
	     <FormControl className={classes.formControl}>
          <InputLabel htmlFor="celular">Celular</InputLabel>
          <Input
            id="celular"
            name="celular"
            fullWidth
            value={contato.celular}
            inputComponent={Masked}
            inputProps={{
            	mask: [/[9]/, /\d/, /\d/, /\d/, /\d/, '-', /\d/, /\d/, /\d/, /\d/],
            	guide: false
            }}
            onChange={changeContato.bind(this, 'celular', contato.id)}
          />
        </FormControl>
	    </Grid>
	    {contato.id === 0 || (contatos.length === 3 && contato.id === 1) ? (
	    	null
	    ) : (
	    	<Grid item xs={12}>
		    	<Button 
		    		size="small"
	        	variant="outlined" 
	        	color="secondary" 
	        	className={classes.button}
	        	onClick={removeContato.bind(this, contato.id)}>
		        Remover
		      </Button>
		    </Grid>
		  )}
	  </Grid>
	)
})

ClientesContato.propTypes = {
	classes: PropTypes.object.isRequired
}

export default withStyles(styles)(ClientesContato)