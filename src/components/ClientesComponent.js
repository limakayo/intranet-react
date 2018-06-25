import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { withStyles } from '@material-ui/core/styles'
import List from '@material-ui/core/List'
import ListItem from '@material-ui/core/ListItem'
import ListItemText from '@material-ui/core/ListItemText'
import Divider from '@material-ui/core/Divider'
import Progress from './Progress'
import Button from '@material-ui/core/Button'
import Icon from '@material-ui/core/Icon'
import { Link } from 'react-router-dom'
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import TextField from '@material-ui/core/TextField';

const styles = theme => ({
	root: {
		marginBottom: 150,
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
})

class ClientesComponent extends Component {
	state = {
		open: false
	};

	handleClickOpen = () => {
		this.setState({ open: true })
	};

	handleClose = () => {
		this.setState({ open: false })
	};

	handleConfirm = () => {
		this.props.handleSubmitSearch();
		this.setState({ open: false })
	};

	render() {
	  const { 
	  	classes, 
	  	clientes, 
	  	isLoaded,
	  	handleChangeSearch 
	  } = this.props

	  return (
	  	<div className={classes.root}>
	  		{isLoaded ? (
	  			<List className={classes.list}>
	          {clientes && clientes.map((cliente) => (
	              <div key={cliente._id}>
	                <ListItem
	                  button
	                  component={Link}
	                  to={`clientes/editar/${cliente._id}`}>
	                  <ListItemText
	                    primary={cliente.nome}/>
	                </ListItem>
	                <Divider />
	              </div>
	            )
	          )}
	        </List>
	  		) :	<Progress/> }
	  		<div className={classes.fabContainer}>
	  			<div className={classes.fabFrame}>
			  		<Button 
			  			variant="fab" 
			  			color="primary" 
			  			aria-label="search" 
			  			className={classes.fabSearch}
			  			onClick={this.handleClickOpen}>
			        <Icon>search</Icon>
			      </Button>
			  		<Button 
			  			variant="fab" 
			  			color="primary" 
			  			aria-label="add" 
			  			className={classes.fabAdd}
			  			component={Link}
			  			to={'clientes/cadastrar'}>
			        <Icon>add</Icon>
			      </Button>
			    </div>
		    </div>
		    <Dialog
	        open={this.state.open}
	        onClose={this.handleClose}
	        aria-labelledby="form-dialog-title"
	      >
	        <DialogTitle id="form-dialog-title">Pesquisar</DialogTitle>
	        <DialogContent>
	          <TextField
	            autoFocus
	            margin="dense"
	            id="nome"
	            label="Nome"
	            fullWidth
	            onChange={handleChangeSearch.bind(this, 'nome')}
	          />
	        </DialogContent>
	        <DialogActions>
	          <Button onClick={this.handleClose} color="primary">
	            Cancelar
	          </Button>
	          <Button onClick={this.handleConfirm} color="primary">
	            Confirmar
	          </Button>
	        </DialogActions>
	      </Dialog>
			</div>
		)
	}
}

ClientesComponent.propTypes = {
	classes: PropTypes.object.isRequired
}

export default withStyles(styles)(ClientesComponent)
