import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';

import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import Grid from '@material-ui/core/Grid';
import Divider from '@material-ui/core/Divider';
import Progress from '../Progress';
import Button from '@material-ui/core/Button';
import Icon from '@material-ui/core/Icon';

import { Link } from 'react-router-dom'
import { observer } from 'mobx-react';

const styles = theme => ({
	root: {
		marginBottom: 142
	},
	fabContainer: {
		position: 'fixed',
		bottom: 0,
		right: 0
	},
	fabFrame: {
		position: 'relative'
	},
	fabSearch: {
		position: 'absolute',
		bottom: 80,
		right: theme.spacing.unit * 2
	},
	fabAdd: {
		position: 'absolute',
		bottom: theme.spacing.unit * 2,
		right: theme.spacing.unit * 2
	},
	empty: {
		padding: theme.spacing.unit * 2
	}
})

const Pecas = observer(function Pecas(props) {

	const { 
		classes, 
		pecas,
		isLoaded 
	} = props

  return (
  	<div className={classes.root}>
  		{isLoaded ? (
  			<Grid container>
          <Grid item xs={12}>          		
          	<List className={classes.list}>
		          {pecas && pecas.map((peca) => (
		              <div key={peca._id}>
		                <ListItem
		                  button
		                  component={Link}
		                  to={`pecas/editar/${peca._id}`}>
		                  <ListItemText
		                    primary={peca.nome}
		                    secondary={peca.valor}/>
		                </ListItem>
		                <Divider />
		              </div>
		            )
		          )}
		        </List>
		      </Grid>
		    </Grid>
  		) :	<Progress/> }
      <div className={classes.fabContainer}>
  			<div className={classes.fabFrame}>
		  		<Button
		  			variant="fab"
		  			color="primary"
		  			aria-label="add"
		  			className={classes.fabAdd}
		  			component={Link}
		  			to={'pecas/cadastrar'}>
		        <Icon>add</Icon>
		      </Button>
		    </div>
	    </div>
		</div>
	)
})

Pecas.propTypes = {
	classes: PropTypes.object.isRequired
}

export default withStyles(styles)(Pecas)
