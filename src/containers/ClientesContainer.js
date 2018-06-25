import React, { Component } from 'react'
import Content from '../components/layout/Content'
import ClientesComponent from '../components/ClientesComponent'
import { observer } from 'mobx-react'
import clienteStore from '../stores/ClienteStore'
import history from '../utils/history'
import queryString from 'query-string'

const ClientesContainer = observer(class ClientesContainer extends Component {
  constructor() {
  	super()
  	this.handleChangeSearch = this.handleChangeSearch.bind(this)
  	this.handleSubmitSearch = this.handleSubmitSearch.bind(this)
  }

  componentDidMount() {
  	// Change query string to object
  	const parsedQuery = queryString.parse(this.props.location.search);
  	if (Object.keys(parsedQuery).length !== 0) {
  		clienteStore.searchClientes(parsedQuery)
  	} else {
  		clienteStore.getClientes()
  	}
  }

  handleChangeSearch(name, event) {
  	clienteStore.changeSearch(name, event)
  }

  handleSubmitSearch() {
  	// Change query object to string
  	const query = queryString.stringify(clienteStore.querySearch)
  	history.replace({...history.location, search: query})
  	clienteStore.searchClientes(clienteStore.querySearch)
  }

	render() {
		return (
			<div>
				<Content title="Clientes">
  				<ClientesComponent
  					handleChangeSearch={this.handleChangeSearch}
  					handleSubmitSearch={this.handleSubmitSearch} 
  					clientes={clienteStore.clientes}
  					isLoaded={clienteStore.isLoaded}/>
				</Content>
			</div>
		)
	}
})

export default ClientesContainer
