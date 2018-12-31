import React, { Component } from 'react';
import PropTypes from 'prop-types';

import { withStyles } from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import Divider from '@material-ui/core/Divider';
import Button from '@material-ui/core/Button';
import Icon from '@material-ui/core/Icon';
import { Link } from 'react-router-dom';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import TextField from '@material-ui/core/TextField';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import FormControl from '@material-ui/core/FormControl';
import Input from '@material-ui/core/Input';
import InputLabel from '@material-ui/core/InputLabel';
import Snackbar from '@material-ui/core/Snackbar';

import Masked from '../Masked';
import MySnackbarContent from '../MySnackbarContent';
import Progress from '../Progress';

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

const Clientes = observer(class Clientes extends Component {
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

	handleKeyPress = (event) => {
		if (event.key === 'Enter') {
			this.handleConfirm()
		}
	};

	render() {
	  const {
	  	classes,
	  	clientes,
	  	showMessage,
	  	hideMessage,
	  	empty,
	  	query,
	  	isLoaded,
	  	handleChangeSearch
	  } = this.props

	  return (
	  	<div className={classes.root}>
	  		{isLoaded ? (
	  			<Grid container>
            <Grid item xs={12}>
            	{!empty ? (
            		<List
				  				className={classes.list}>
				          {clientes && clientes.map((cliente) => (
				              <div key={cliente._id}>
				                <ListItem
				                  button
				                  component={Link}
				                  to={`clientes/editar/${cliente._id}`}>
				                  <ListItemText
				                    primary={cliente.nome}
				                    secondary={cliente.cnpj ? `CNPJ ${cliente.cnpj}` : cliente.cpf ? `CPF ${cliente.cpf}` : null}/>
				                </ListItem>
				                <Divider />
				              </div>
				            )
				          )}
				        </List>
            	) : (
            		<Typography variant="subheading" className={classes.empty}>
            			Nenhum cliente encontrado
            		</Typography>
            	)}
			      </Grid>
			    </Grid>
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
	        <DialogTitle id="form-dialog-title">Pesquisar Cliente</DialogTitle>
	        <DialogContent>
	        	<Grid container spacing={16}>
	        		<Grid item xs={12} sm={6}>
			          <TextField
			            autoFocus
			            margin="dense"
			            id="nome"
			            label="Nome"
			            fullWidth
			            value={query.nome}
			            onChange={handleChangeSearch.bind(this, 'nome')}
			            onKeyPress={this.handleKeyPress}
			          />
			        </Grid>
			        <Grid item xs={12} sm={6}>
			          <FormControl
			          	className={classes.formControl}
			          	margin="dense"
			          	fullWidth>
			            <InputLabel htmlFor="cnpj">CNPJ</InputLabel>
			            <Input
			              id="cnpj"
			              name="cnpj"
			              value={query.cnpj}
			              inputComponent={Masked}
			              inputProps={{
			              	mask: [/\d/, /\d/, '.', /\d/, /\d/, /\d/, '.', /\d/, /\d/, /\d/, '/', /\d/, /\d/, /\d/, /\d/, '-', /\d/, /\d/],
			              	placeholder: 'Insira o CNPJ',
			              	guide: false,
			              }}
			              onChange={handleChangeSearch.bind(this, 'cnpj')}
			              onKeyPress={this.handleKeyPress}
			            />
			          </FormControl>
			        </Grid>
			        <Grid item xs={12} sm={6}>
								<FormControl
									className={classes.formControl}
									margin="dense"
		          		fullWidth>
			            <InputLabel htmlFor="cpf">CPF</InputLabel>
			            <Input
			              id="cpf"
			              name="cpf"
			              value={query.cpf}
			              inputComponent={Masked}
			              inputProps={{
			              	mask: [/\d/, /\d/, /\d/, '.', /\d/, /\d/, /\d/, '.', /\d/, /\d/, /\d/, '-', /\d/, /\d/],
			              	placeholder: 'Insira o CPF',
			              	guide: false
			              }}
			              onChange={handleChangeSearch.bind(this, 'cpf')}
			              onKeyPress={this.handleKeyPress}
			            />
			          </FormControl>
			        </Grid>
			        <Grid item xs={12} sm={6}>
			          <TextField
			            margin="dense"
			            id="cep"
			            label="CEP"
			            value={query.cep}
			            fullWidth
			            onChange={handleChangeSearch.bind(this, 'cep')}
			            onKeyPress={this.handleKeyPress}
			          />
			        </Grid>
		        </Grid>
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

	      <Snackbar
          anchorOrigin={{
            vertical: 'bottom',
            horizontal: 'left',
          }}
          open={showMessage}
          onClose={hideMessage}
          autoHideDuration={3000}>
          <MySnackbarContent
            onClose={hideMessage}
            variant="success"
            message="Salvo com sucesso!"
          />
        </Snackbar>
			</div>
		)
	}
})

Clientes.propTypes = {
	classes: PropTypes.object.isRequired
}

export default withStyles(styles)(Clientes)
