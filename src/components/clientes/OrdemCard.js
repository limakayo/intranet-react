import React from 'react';
import { Link } from 'react-router-dom';
import { withStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Switch from '@material-ui/core/Switch';

import { observer } from 'mobx-react';

const styles = theme => ({
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
  pos: {
  	marginTop: 7,
    marginBottom: 12,
  },
})

function getColor(andamento) {
	switch(andamento.ordem) {
		case 5:
			return 'textSecondary'
		default:
			return 'default'
	}
}

const OrdemCard = observer(function OrdemCard(props) {
	const { classes, ordem, handleChange } = props

	return (
		<Grid item xs={12} sm={6} md={4} lg={3} key={ordem.numero}>
			<Card>
	      <CardContent>
	      	<Grid container>
	        	<Grid item xs={6}>
		          <Typography 
		          	variant="title" 
		          	color={getColor(ordem.andamento)}
		          	component={Link}
		          	className={classes.link}
		          	to={`/ordens/editar/${ordem.numero}`}>
		            {ordem.numero}
		          </Typography>
		          <Typography className={classes.pos} color={getColor(ordem.andamento)}>
		            {ordem.aprovacao.nome}
		          </Typography>
	          </Grid>
	          <Grid item xs={6}>
		          <Typography className={classes.pos} color={getColor(ordem.andamento)} align="right">
		          	{ordem.andamento.nome}
		          </Typography>
	          </Grid>
	          <Grid item xs={12}>
		          <Typography variant="subheading" className={classes.pos} color={getColor(ordem.andamento)}>
		            {`${ordem.equipamento.nome} ${ordem.marca} ${ordem.modelo} ${ordem.modulo ? '+ Módulo' : ''}`}
		          </Typography>
	          </Grid>
	          {ordem.andamento.ordem >= 4 ? (
	          	<Grid item xs={12}>
		        		<FormControlLabel
				          control={
				            <Switch
				              checked={ordem.entregue}
				              onChange={handleChange.bind(this, ordem, 'entregue')}
				              value="entregue"
				              color="primary"
				            />
				          }
				          label="Entregue"
				        />
		          </Grid>
	          ) : null}
	        </Grid>
	      </CardContent>
	    </Card>
	  </Grid>
  )
})

export default withStyles(styles)(OrdemCard)