import React, { Component } from 'react'
import { withStyles } from '@material-ui/core/styles'
import PropTypes from 'prop-types'
import { observer } from 'mobx-react'

import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import IconButton from '@material-ui/core/IconButton';
import EditIcon from '@material-ui/icons/Edit';
import Grid from '@material-ui/core/Grid'
import Typography from '@material-ui/core/Typography'
import FormControl from '@material-ui/core/FormControl';
import InputLabel from '@material-ui/core/InputLabel';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import Button from '@material-ui/core/Button';

import Table from './Table'
import ClienteDownshift from '../ClienteDownshift';
import ordemStore from '../../stores/OrdemStore'
import atendimentoStore from '../../stores/AtendimentoStore';
import transporteStore from '../../stores/TransporteStore';
import clienteStore from '../../stores/ClienteStore';

const styles = theme => ({
	icon: {
    fontSize: 20,
  },
  editTitle: {
  	position: 'relative',
  	marginBottom: theme.spacing.unit * 2
  },
  editIcon: {
  	position: 'absolute',
  	right: 0,
  	top: '-4px'
  }
})

const Cliente = observer(class Cliente extends Component {

	state = {
		open: false,
	}

	handleClickOpen = () => {
		this.setState({ open: true })
	}

	handleRequestClose = () => {
		this.setState({ open: false })
		ordemStore.cancelCliente()
	}

	handleRequestSubmit = () => {
		this.setState({ open: false })
		ordemStore.confirmCliente()
	}

	handleClienteSelected = (cliente) => {
		ordemStore.changeCliente(cliente)
	}

	render () {
		const { classes, handleChange } = this.props
		const { ordem } = ordemStore
		const { clientes } = clienteStore
		const { atendimentos } = atendimentoStore
		const { transportes } = transporteStore

		return (
			<div>
				<Grid container spacing={16} style={{ marginTop: 16 }}>
		    	<Grid item xs={12} className={classes.editTitle}>
		        <Typography variant="title">
		          Cliente
		        </Typography>
		        <IconButton className={classes.editIcon} onClick={this.handleClickOpen}>  
		        	<EditIcon className={classes.icon}/>
		        </IconButton>
		      </Grid>
		    </Grid>
		    <Table title="Nome" value={ordem.cliente.nome}/>
		    {ordem.cliente.contatos && ordem.cliente.contatos.slice(0,1).map((e) => (
		    	<div key={e.id}>
		      	<Table title="Contato" value={e.nome} />
		      	<Table title="E-mail" value={e.email}/>
		      	<Table title="Telefone" value={`${e.ddd} ${e.telefone}`}/>
		      	<Table title="Celular" value={`${e.ddd} ${e.celular}`}/>
		      </div>
		    ))}

		    <Grid container spacing={16} style={{ marginBottom: 8, marginTop: 16 }}>
		    	{atendimentos ? (
						<Grid item xs={12} sm={6}>
							<FormControl fullWidth className={classes.formControl}>
			          <InputLabel htmlFor="atendimento">Atendimento</InputLabel>
			          <Select
			            value={ordem.atendimento}
			            onChange={handleChange.bind(this, "atendimento")}
			            inputProps={{
			              name: 'atendimento',
			              id: 'atendimento',
			            }}
			          >
			            {atendimentos.map((e) => (
		                <MenuItem key={e._id} value={e._id}>{e.nome}</MenuItem>
		              ))}
			          </Select>
			        </FormControl>
						</Grid>
					) : null}
					{transportes ? (
						<Grid item xs={12} sm={6}>
							<FormControl fullWidth className={classes.formControl}>
			          <InputLabel htmlFor="transporte">Transporte</InputLabel>
			          <Select
			            value={ordem.transporte}
			            onChange={handleChange.bind(this, "transporte")}
			            inputProps={{
			              name: 'transporte',
			              id: 'transporte',
			            }}
			          >
			            {transportes.map((e) => (
		                <MenuItem key={e._id} value={e._id}>{e.nome}</MenuItem>
		              ))}
			          </Select>
			        </FormControl>
						</Grid>
					) : null}
		    </Grid>

		    <Dialog fullWidth open={this.state.open} onClose={this.handleRequestClose}>
	        <DialogTitle>Cliente</DialogTitle>
	        <DialogContent style={{ height: 200 }}>
	        	<form autoComplete="off">
							<Grid container spacing={24}>
                <Grid item xs={12} sm={12} md={12}>
                  <ClienteDownshift
                    suggestions={clientes}
                    handleSuggestionSelected={this.handleClienteSelected}/>
			          </Grid>
				    	</Grid>
				    </form>
	        </DialogContent>
	        <DialogActions>
	          <Button onClick={this.handleRequestClose} color="primary">
	            Cancelar
	          </Button>
	          <Button onClick={this.handleRequestSubmit} color="primary">
	            Concluir
	          </Button>
	        </DialogActions>
	      </Dialog>
		  </div>
	  )
	}
})

Cliente.propTypes = {
	classes: PropTypes.object.isRequired
}

export default withStyles(styles)(Cliente)