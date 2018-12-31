import React from 'react';
import PropTypes from 'prop-types'
import { withStyles } from '@material-ui/core/styles';
import { Link } from 'react-router-dom';

import Button from '@material-ui/core/Button';
import Icon from '@material-ui/core/Icon';

import uiStore from '../stores/UiStore';

const styles = theme => ({
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
})

function FloatButtons(props) {
	const { classes } = props
	const { handleOpenSearch } = uiStore

	return (
		<div className={classes.fabContainer}>
			<div className={classes.fabFrame}>
	  		<Button
	  			variant="fab"
	  			color="primary"
	  			aria-label="search"
	  			className={classes.fabSearch}
	  			onClick={handleOpenSearch}>
	        <Icon>search</Icon>
	      </Button>
	  		<Button
	  			variant="fab"
	  			color="primary"
	  			aria-label="add"
	  			className={classes.fabAdd}
	  			component={Link}
	  			to={'ordens/cadastrar'}>
	        <Icon>add</Icon>
	      </Button>
	    </div>
    </div>
	)
}

FloatButtons.propTypes = {
	classes: PropTypes.object.isRequired
}

export default withStyles(styles)(FloatButtons)