import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

import { withStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import ButtonBase from '@material-ui/core/ButtonBase';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';

import Progress from '../Progress';
import OrdemCard from './OrdemCard'

import { observer } from 'mobx-react';

const styles = theme => ({
	root: {
		margin: theme.spacing.unit * 2,
	},
	card: {
    width: '100%',
    '&:hover': {
    	backgroundColor: '#EEEEEE'
    }
  },
  link: {
  	textDecoration: 'none',
  	'&:hover': {
  		color: theme.palette.primary.main
  	}
  },
	empty: {
		padding: theme.spacing.unit * 2
	},
	title: {
    marginBottom: 16,
    fontSize: 14,
  },
  pos: {
  	marginTop: 7,
    marginBottom: 12,
  },
})

const OrdensCliente = observer(class OrdensCliente extends Component {
	render() {
	  const {
	  	classes,
	  	ordens,
	  	cliente,
	  	isLoaded,
	  	handleChange
	  } = this.props

	  // abertas
	  const abertas = ordens.filter((e) => e.andamento.ordem <= 3)
	  // fechadas
	  const fechadas = ordens.filter((e) => e.andamento.ordem >= 4)

	  return (
	  	<div className={classes.root}>
	  		{isLoaded ? (
	  			<Grid container spacing={16}>
	  				<Grid item xs={12}>
	  					<ButtonBase
		    				focusRipple
		    				component={Link}
		    				to={`/clientes/editar/${cliente._id}`}
		    				className={classes.cardButton}>
		    				<Card className={classes.card}>
					        <CardContent>
					          <Typography variant="subheading">
				  						{cliente.nome}
				  					</Typography>
				  					{cliente.cnpj ? (
				  						<Typography variant="subheading">
					  						CNPJ {cliente.cnpj}
					  					</Typography>
				  					) : null}
				  					{cliente.cpf ? (
				  						<Typography variant="subheading">
					  						CPF {cliente.cpf}
					  					</Typography>
				  					) : null}
					        </CardContent>
					      </Card>
		    			</ButtonBase>
	  				</Grid>
	  				<Grid item xs={12}>
		  				<Typography variant="headline">
	  						Abertas
	  					</Typography>
	  				</Grid>
	  				{abertas.length > 0 ? (
	  					abertas.map((ordem) => (
		  					<OrdemCard 
		  						ordem={ordem} 
		  						key={ordem.numero}
		  						handleChange={handleChange}/>
		  				))
	  				) : (
	  					<Grid item xs={12}>
			  				<Typography variant="subheading" color="textSecondary">
		  						Nenhuma ordem aberta
		  					</Typography>
		  				</Grid>
	  				)}
	  				<Grid item xs={12}>
		  				<Typography variant="headline">
	  						Fechadas
	  					</Typography>
	  				</Grid>
	  				{fechadas.length > 0 ? (
	  					fechadas.map((ordem) => (
		  					<OrdemCard 
		  						ordem={ordem} 
		  						key={ordem.numero}
		  						handleChange={handleChange}/>
		  				))
	  				) : (
	  					<Grid item xs={12}>
			  				<Typography variant="subheading" color="textSecondary">
		  						Nenhuma ordem fechada
		  					</Typography>
		  				</Grid>
	  				)}
        	</Grid>
	  		) :	<Progress/> }
			</div>
		)
	}
})

OrdensCliente.propTypes = {
	classes: PropTypes.object.isRequired
}

export default withStyles(styles)(OrdensCliente)
