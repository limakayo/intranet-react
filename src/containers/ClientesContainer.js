import React, { Component } from 'react';
import Content from '../components/layout/Content';
import Clientes from '../components/clientes/Clientes';

import { observer } from 'mobx-react';
import history from '../utils/history';
import queryString from 'query-string';

import clienteStore from '../stores/ClienteStore';

const ClientesContainer = observer(class ClientesContainer extends Component {
  constructor() {
  	super()
  	this.handleChangeSearch = this.handleChangeSearch.bind(this)
  	this.handleKeyPress			= this.handleKeyPress.bind(this)
  	this.handleSubmitSearch = this.handleSubmitSearch.bind(this)
  }

  componentDidMount() {
  	// Change query string to object
  	const parsedQuery = queryString.parse(this.props.location.search);
  	if (Object.keys(parsedQuery).length !== 0) {
  		clienteStore.searchClientes(parsedQuery)
  	}
  }

  handleChangeSearch(name, event) {
  	clienteStore.changeSearch(name, event)
  }

  handleKeyPress(event) {
  	if (event.key === 'Enter') {
  		this.handleSubmitSearch()
  	}
  }

  handleSubmitSearch() {
    const query = clienteStore.querySearch

    if (query.nome === '' && query.cnpj === '' && query.cpf === '' && query.cep === '') {
      history.replace({...history.location, pathname: "/clientes", search: ""})
    } else {
      history.replace({...history.location, pathname: "/clientes", search: queryString.stringify(clienteStore.querySearch)})
      clienteStore.searchClientes(query)
    }
  }

	render() {
		return (
			<div>
				<Content title="Clientes">
  				<Clientes
  					handleChangeSearch={this.handleChangeSearch}
  					handleKeyPress={this.handleKeyPress}
  					handleSubmitSearch={this.handleSubmitSearch} 
  					clientes={clienteStore.clientesSearch}
            showMessage={clienteStore.showMessage}
            hideMessage={clienteStore.hideMessage}
            query={clienteStore.querySearch}
            empty={clienteStore.emptyClientes}
  					isLoaded={clienteStore.isLoaded}/>
				</Content>
			</div>
		)
	}
})

export default ClientesContainer
