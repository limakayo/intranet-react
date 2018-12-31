import React from 'react'
import { withStyles } from '@material-ui/core/styles'
import PropTypes from 'prop-types'
import { observer } from 'mobx-react'

import IconButton from '@material-ui/core/IconButton';
import EditIcon from '@material-ui/icons/Edit';
import Grid from '@material-ui/core/Grid'
import Typography from '@material-ui/core/Typography'
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import FormControl from '@material-ui/core/FormControl';
import Input from '@material-ui/core/Input';
import InputLabel from '@material-ui/core/InputLabel';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';

import ordemStore from '../../stores/OrdemStore';
import equipamentoStore from '../../stores/EquipamentoStore';

import Table from './Table'

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

const Equipamento = observer(class Equipamento extends React.Component {
	state = {
		open: false,
	}

	handleClickOpen = () => {
		this.setState({ open: true })
	}

	handleRequestClose = () => {
		this.setState({
			open: false,
		})
	}

	handleRequestSubmit = () => {
		this.setState({
			open: false
		})
	}

	handleChange = (name, event) => {
		ordemStore.changeEquipamento(name, event)
  }

  handleSubmit = () => {
  	ordemStore.confirmEquipamento()
  	this.handleRequestClose()
  }

  handleCancel = () => {
  	ordemStore.cancelEquipamento()
  	this.handleRequestClose()
  }

	render() {
		const { classes } = this.props
		const { ordem, equipamento } = ordemStore
		const { equipamentos } = equipamentoStore

		return (
			<div>
				<Grid container spacing={16}>
		    	<Grid item xs={12} className={classes.editTitle}>
		        <Typography variant="title">
		        	{equipamentos.map((e) => (
		        		ordem.equipamento === e._id && e.nome
		        	))}
		        </Typography>
		       	<IconButton className={classes.editIcon} onClick={this.handleClickOpen}>
		        	<EditIcon className={classes.icon}/>
		        </IconButton>
		      </Grid>
		    </Grid>
	      <Table title="Marca" value={ordem.marca}/>
		    <Table title="Modelo" value={ordem.modelo}/>
		    <Table title="Série" value={ordem.serie}/>
				{ordem.modulo ? (
					<Table title="Módulo" value="Sim"/>
				): null}
		    <Table title="Origem" value={ordem.origem}/>
		    {ordem.serieCompleto ? (
		    	<Table title="Série Completo" value={ordem.serieCompleto} />
		    ) : null}
				{ordem.dataFabricacao ? (
					<Table title="Data de Fabricação" value={ordem.dataFabricacao}/>
				) : null}

		    <Dialog open={this.state.open} onClose={this.handleRequestClose}>
	        <DialogTitle>Equipamento</DialogTitle>
	        <DialogContent>
	        	<form autoComplete="off">
							<Grid container spacing={24}>
			          <Grid item xs={12} sm={6} md={4}>
			        		<FormControl margin="dense" fullWidth>
			              <InputLabel htmlFor="equipamento">Equipamento</InputLabel>
			              <Select
			                value={equipamento.id ? equipamento.id : ordem.equipamento}
			                onChange={this.handleChange.bind(this, 'id')}
			                input={<Input id="equipamento" />}
			              >
			                {equipamentos.map((e) => {
			                  return <MenuItem key={e._id} value={e._id}>{e.nome}</MenuItem>
			                })}
			              </Select>
			            </FormControl>
			          </Grid>
			          <Grid item xs={12} sm={6} md={4}>
				          <TextField
				            margin="dense"
				            defaultValue={ordem.marca}
				            onChange={this.handleChange.bind(this, 'marca')}
				            id="marca"
				            label="Marca"
				            type="text"
				            fullWidth
				          />
				        </Grid>
				        <Grid item xs={12} sm={6} md={4}>
				          <TextField
				            margin="dense"
				            defaultValue={ordem.modelo}
				            onChange={this.handleChange.bind(this, 'modelo')}
				            id="modelo"
				            label="Modelo"
				            type="text"
				            fullWidth
				          />
				        </Grid>
				        <Grid item xs={12} sm={6} md={4}>
				          <TextField
				            margin="dense"
				            defaultValue={ordem.serie}
				            onChange={this.handleChange.bind(this, 'serie')}
	                  inputProps={{
	                    maxLength: 5,
	                  }}
				            id="serie"
				            label="Série"
				            type="text"
				            fullWidth
				          />
				        </Grid>
				        <Grid item xs={12} sm={6} md={4}>
				          <TextField
				            margin="dense"
				            defaultValue={ordem.serieCompleto}
				            onChange={this.handleChange.bind(this, 'serieCompleto')}
				            id="serieCompleto"
				            label="Série Completo"
				            type="text"
				            fullWidth
				          />
				        </Grid>
				        <Grid item xs={12} sm={6} md={4}>
				          <TextField
				            margin="dense"
				            defaultValue={ordem.origem}
				            onChange={this.handleChange.bind(this, 'origem')}
				            id="origem"
				            label="Origem"
				            type="text"
				            fullWidth
				          />
				        </Grid>
				    	</Grid>
				    </form>
	        </DialogContent>
	        <DialogActions>
	          <Button onClick={this.handleCancel} color="primary">
	            Cancelar
	          </Button>
	          <Button onClick={this.handleSubmit} color="primary">
	            Concluir
	          </Button>
	        </DialogActions>
	      </Dialog>
	   </div>
		)
	}
})

Equipamento.propTypes = {
	classes: PropTypes.object.isRequired
}

export default withStyles(styles)(Equipamento)
