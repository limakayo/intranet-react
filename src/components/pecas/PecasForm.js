import React, { Component } from 'react';
import PropTypes from 'prop-types';

import { withStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Icon from '@material-ui/core/Icon';
import Grid from '@material-ui/core/Grid';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogContent from '@material-ui/core/DialogContent';
import CircularProgress from '@material-ui/core/CircularProgress';

import { observer } from 'mobx-react';

import Progress from '../Progress'

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
		width: '100%'
	}
})

const PecasForm = observer(class PecasForm extends Component {

	render() {
		const { 
			classes, 
			loading,
			peca,
			handleChange,
			handleSubmit,
			isLoaded
		} = this.props

		return(
			<div className={classes.root}>
				{isLoaded ? (
					<div>
						<Grid container spacing={16}>
							<Grid item xs={12} sm={4}>
			          <TextField
						      id="nome"
						      label="Nome"
						      className={classes.textField}
						      value={peca.nome}
									onChange={handleChange.bind(this, 'nome')}/>
			        </Grid>
			        <Grid item xs={12} sm={4}>
			          <TextField
						      id="valor"
						      label="Valor"
						      className={classes.textField}
						      value={peca.valor}
									onChange={handleChange.bind(this, 'valor')}/>
			        </Grid>
					  </Grid>

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

				  </div>
				) : <Progress/>}
		    <Dialog open={loading}>
          <DialogContent style={{ width: 200 }}>
            <div style={{ width: '100%', textAlign: 'center' }}>
              <CircularProgress className={classes.progress} size={50} />
              <h3>Salvando...</h3>
            </div>
          </DialogContent>
        </Dialog>
			</div>
		)
	}
})

PecasForm.propTypes = {
	classes: PropTypes.object.isRequired
}

export default withStyles(styles)(PecasForm)