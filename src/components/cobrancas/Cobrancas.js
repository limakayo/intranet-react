import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import { observer } from 'mobx-react';
import CobrancasList from './CobrancasList';

const styles = theme => ({
	root: {
		marginBottom: 142
	}
})

const Cobrancas = observer(function Cobrancas(props) {

	const { classes } = props

  return (
  	<div className={classes.root}>
      <CobrancasList />
		</div>
	)
})

Cobrancas.propTypes = {
	classes: PropTypes.object.isRequired
}

export default withStyles(styles)(Cobrancas)
