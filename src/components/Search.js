import React, { Component } from 'react'
import history from '../utils/history'
import Masked from './Masked'
import ClienteDownshift from './ClienteDownshift';

import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import Grid from '@material-ui/core/Grid';
import FormControl from '@material-ui/core/FormControl';
import Input from '@material-ui/core/Input';
import InputLabel from '@material-ui/core/InputLabel';
import Button from '@material-ui/core/Button';

import ordemStore from '../stores/OrdemStore'
import clienteStore from '../stores/ClienteStore'
import uiStore from '../stores/UiStore'

import { observer } from 'mobx-react'

const Search = observer(class Search extends Component {

	componentDidMount() {
		clienteStore.getClientes()
	}

	handleChangeSearch = (name, event) => {
		ordemStore.changeSearch(name, event)
	};

	handleClienteSelected = (cliente) => {
	  ordemStore.clienteSearchSelected(cliente)
	};

	handleSubmitSearch = () => {
	  const { querySearch } = ordemStore

	  if (querySearch.numero !== '') {
	    ordemStore.searchOrdem()
	  } else if (querySearch.serie !== '') {
	    console.log(querySearch.serie)
	  } else if (querySearch.cliente) {
	    ordemStore.searchOrdensCliente()
	  } else {
	    history.push("/ordens")
	  }
	};

	handleClose = () => {
		uiStore.handleCloseSearch()
	};

	handleConfirm = () => {
		this.handleSubmitSearch();
		uiStore.handleCloseSearch()
	};

	handleKeyPress = (event) => {
		if (event.key === 'Enter') {
			this.handleConfirm()
		}
	};

	render() {
		const { searchOpen, handleCloseSearch } = uiStore
		const { querySearch } = ordemStore
		const { clientes } = clienteStore

		return (
			<Dialog open={searchOpen} onClose={handleCloseSearch} aria-labelledby="form-dialog">
	      <DialogTitle id="form-dialog">Pesquisar</DialogTitle>
	      <DialogContent style={{ height: 230 }}>
					<Grid container spacing={24}>
		        <Grid item xs={6}>
		        	<FormControl fullWidth>
			        	<InputLabel htmlFor="numero">Número</InputLabel>
								<Input
									autoFocus
			            id="numero"
			            name="numero"
			            inputComponent={Masked}
		              inputProps={{
		              	mask: [/[1-9]/, /\d/, /\d/, /\d/, /\d/],
		              	guide: false
		              }}
			            value={querySearch.numero}
			            onChange={this.handleChangeSearch.bind(this, 'numero')}
			            onKeyPress={this.handleKeyPress}
			          />
		          </FormControl>
		        </Grid>
		        <Grid item xs={6}>
		        	<FormControl fullWidth>
			        	<InputLabel htmlFor="serie">Série</InputLabel>
								<Input
			            id="serie"
			            name="serie"
		              inputProps={{
		              	maxLength: 5
		              }}
			            value={querySearch.serie}
			            onChange={this.handleChangeSearch.bind(this, 'serie')}
			            onKeyPress={this.handleKeyPress}
			          />
		          </FormControl>
		        </Grid>
		        <Grid item xs={12}>
		        	<ClienteDownshift
	              suggestions={clientes}
	              handleSuggestionSelected={this.handleClienteSelected}/>
		        </Grid>
		    	</Grid>	        
			  </DialogContent>
	      <DialogActions>
	        <Button onClick={this.handleClose} color="primary">
	          Cancelar
	        </Button>
	        <Button onClick={this.handleConfirm} color="primary">
	          Concluir
	        </Button>
	      </DialogActions>
	    </Dialog>
		)
	}
})

export default Search