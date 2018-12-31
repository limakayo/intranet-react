import React, { Component } from 'react'
import PropTypes from 'prop-types'

import { withStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Icon from '@material-ui/core/Icon';
import Grid from '@material-ui/core/Grid';
import TextField from '@material-ui/core/TextField';
import FormControl from '@material-ui/core/FormControl';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import InputLabel from '@material-ui/core/InputLabel';
import Switch from '@material-ui/core/Switch';
import Typography from '@material-ui/core/Typography';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';

import Progress from '../Progress';
import ClienteDownshift from '../ClienteDownshift';

import { observer } from 'mobx-react';

import ordemStore from '../../stores/OrdemStore';
import clienteStore from '../../stores/ClienteStore';
import equipamentoStore from '../../stores/EquipamentoStore';
import atendimentoStore from '../../stores/AtendimentoStore';
import transporteStore from '../../stores/TransporteStore';

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
	fabContainer: {
		position: 'fixed',
		bottom: 0,
		right: 0
	},
	fabFrame: {
		position: 'relative'
	},
	fabDone: {
		position: 'absolute',
		bottom: theme.spacing.unit * 2,
		right: theme.spacing.unit * 2
	},
	textField: {
		width: '100%'
	},
	formControl: {
		width: '100%',
	},
	caption: {
		marginTop: theme.spacing.unit
	},
	icon: {
    fontSize: 20,
  },
})

const OrdensCadastrar = observer(class OrdensCadastrar extends Component {

	render() {
		const { 
			classes,
			handleChange,
			handleChangeUppercase,
			handleChangeUppercaseFirst,
			handleSubmit,
			handleClienteSelected,
		} = this.props

		const { ordem, isLoaded } = ordemStore
		const { clientes } = clienteStore
		const { equipamentos } = equipamentoStore
		const { atendimentos } = atendimentoStore
		const { transportes } = transporteStore

		return(
			<div className={classes.root}>
				{isLoaded ? (
					<Grid container spacing={16}>
						<Grid item xs={12}>
	            <Typography variant="headline">
	              {ordem.numero ?
	                'OS ' + ordem.numero
	              : null}
	            </Typography>
	          </Grid>
						{clientes ? (
							<Grid item xs={12}>
								<ClienteDownshift
	            		suggestions={clientes}
	            		handleSuggestionSelected={handleClienteSelected}/>

	             	<Typography type="caption" gutterBottom className={classes.caption}>
		              Selecione um cliente
		            </Typography>
							</Grid>
						) : null}
						{equipamentos ? (
							<Grid item xs={12} sm={3}>
								<FormControl className={classes.formControl}>
				          <InputLabel htmlFor="equipamento">Equipamento</InputLabel>
				          <Select
				            value={ordem.equipamento}
				            onChange={handleChange.bind(this, "equipamento")}
				            inputProps={{
				              name: 'equipamento',
				              id: 'equipamento',
				            }}
				          >
				            {equipamentos.map((e) => (
			                <MenuItem key={e._id} value={e._id}>{e.nome}</MenuItem>
			              ))}
				          </Select>
				        </FormControl>
							</Grid>
						) : null}
						<Grid item xs={6} sm={3}>
							<TextField
			          id="marca"
			          label="Marca"
			          className={classes.textField}
			          value={ordem.marca}
			          onChange={handleChangeUppercase.bind(this, "marca")}
			        />
						</Grid>
						<Grid item xs={6} sm={3}>
							<TextField
			          id="modelo"
			          label="Modelo"
			          className={classes.textField}
			          value={ordem.modelo}
			          onChange={handleChangeUppercase.bind(this, "modelo")}
			        />
						</Grid>
						<Grid item xs={6} sm={3}>
							<TextField
			          id="serie"
			          label="Série"
			          className={classes.textField}
			          value={ordem.serie}
			          onChange={handleChangeUppercase.bind(this, "serie")}
			        />
						</Grid>
						{equipamentos.map((e) => (
							e._id === ordem.equipamento && e.nome === 'Nobreak' ? (
								<Grid item xs={12} key={ordem.modulo}>
				  				<FormControlLabel
					          control={
					            <Switch
					              checked={ordem.modulo}
					              onChange={handleChange.bind(this, 'modulo')}
					              value="modulo"
					              color="primary"
					            />
					          }
					          label="Módulo"
					        />
							  </Grid>
							) : null
						))}
						<Grid item xs={6} sm={3}>
							<TextField
			          id="origem"
			          label="Origem"
			          className={classes.textField}
			          value={ordem.origem}
			          onChange={handleChangeUppercaseFirst.bind(this, "origem")}
			        />
						</Grid>
						{atendimentos ? (
							<Grid item xs={12} sm={3}>
								<FormControl className={classes.formControl}>
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
						{ordem.garantia ? (
							<Grid item xs={6} sm={3}>
								<TextField
				          id="serieCompleto"
				          label="Série Completo"
				          className={classes.textField}
				          value={ordem.serieCompleto}
				          onChange={handleChangeUppercase.bind(this, "serieCompleto")}
				        />
							</Grid>
						) : null}
						{ordem.garantia ? (
							<Grid item xs={6} sm={3}>
								<TextField
				          id="dataFabricacao"
				          label="Data de fabricação"
				          className={classes.textField}
				          value={ordem.dataFabricacao}
				          onChange={handleChange.bind(this, "dataFabricacao")}
				        />
							</Grid>
						) : null}
						<Grid item xs={12} sm={6}>
							<TextField
			          id="defeito"
			          label="Defeito"
			          className={classes.textField}
			          value={ordem.defeito}
			          onChange={handleChangeUppercaseFirst.bind(this, "defeito")}
			        />
						</Grid>
						<Grid item xs={12} sm={6}>
							<TextField
			          id="observacoesOrcamento"
			          label="Observações Orçamento"
			          className={classes.textField}
			          value={ordem.observacoesOrcamento}
			          onChange={handleChangeUppercase.bind(this, "observacoesOrcamento")}
			        />
						</Grid>
						<Grid item xs={12} sm={6}>
							<TextField
			          id="observacoesPagamento"
			          label="Observações Pagamento"
			          className={classes.textField}
			          value={ordem.observacoesPagamento}
			          onChange={handleChangeUppercase.bind(this, "observacoesPagamento")}
			        />
						</Grid>
						{transportes ? (
							<Grid item xs={12} sm={3}>
								<FormControl className={classes.formControl}>
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
						<div className={classes.fabContainer}>
			  			<div className={classes.fabFrame}>
					  		<Button 
					  			variant="fab" 
					  			color="primary" 
					  			aria-label="done" 
					  			className={classes.fabDone}
					  			onClick={handleSubmit}>
					        <Icon>done</Icon>
					      </Button>
					    </div>
				    </div>
					</Grid>
				) : <Progress />}
			</div>
		)
	}
})

OrdensCadastrar.propTypes = {
	classes: PropTypes.object.isRequired
}

export default withStyles(styles)(OrdensCadastrar)