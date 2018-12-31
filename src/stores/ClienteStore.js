import { action, extendObservable } from 'mobx'
import fetchClient from '../utils/FetchClient'
import Cliente from '../models/Cliente'
import ClienteSearch from '../models/ClienteSearch'
import Contato from '../models/Contato'
import history from '../utils/history'
import fetchJsonp from 'fetch-jsonp'
import queryString from 'query-string'

import uiState from './UiStore'

class ClienteStore {
	constructor() {
		extendObservable(this, {
			clientes: [],
			clientesSearch: [],
			contatos: [],
			ordens: [],
			cliente: new Cliente(),
			querySearch: new ClienteSearch(),
			isLoaded: false,
			loading: false,
			showMessage: false,
			emptyClientes: false,
			error: false,
			clearClientes: action(() => {
				this.isLoaded = true
				this.clientes = []
				this.ordens = []
				this.emptyClientes = false
			}),
			resetCliente: action(() => {
				this.isLoaded = false
				this.error = false
				this.cliente = new Cliente()
				this.contatos = []
			}),
			getClientes: action(() => {
				this.isLoaded = false
				fetchClient.get('/clientes')
					.then(result => { 
						this.clientes = result
						this.isLoaded = true
					})
			}),
			getOrdens: action((id) => {
				this.isLoaded = false
				fetchClient.get('/ordens/cliente/' + id)
					.then(result => {
						this.ordens = result
						this.isLoaded = true
					})
			}),
			setLoaded: action(() => {
				this.isLoaded = true
			}),
			changeCliente: action((name, value) => {
				this.cliente[name] = value
			}),
			addContato: action(() => {
				var contato = new Contato()
				contato.id = this.contatos.length
				this.contatos = [...this.contatos, contato]
			}),
			removeContato: action((id) => {
				this.contatos = this.contatos.filter((e) => e.id !== id)
				this.cliente.contatos = this.contatos
			}),
			changeContato: action((name, id, value) => {
				var contato = this.contatos[id]
				contato[name] = value
				this.cliente.contatos = this.contatos
			}),
			changeSearch: action((name, event) => {
				this.querySearch[name] = event.target.value
			}),
			searchClientes: action((query) => {
				this.isLoaded = false
				fetchClient.post('/clientes/search', query)
					.then(result => {
						this.emptyClientes = false
						this.clientesSearch = result
						if (result.length === 0) {
							this.emptyClientes = true
						}
						this.isLoaded = true
					})
			}),
			getCliente: action((id) => {
				this.isLoaded = false
				fetchClient.get('/clientes/' + id)
					.then(result => {
						this.cliente = result
						if (this.cliente && this.cliente.contatos.length > 0) 
							this.contatos = this.cliente.contatos
						this.isLoaded = true
					})
			}),
			postCliente: action(() => {
				uiState.isLoading()
				this.querySearch = new ClienteSearch()
				fetchClient.post('/clientes', this.cliente)
					.then(result => { 
						this.querySearch.nome = result.nome
						history.replace({...history.location, pathname: "/clientes", search: queryString.stringify(this.querySearch)})
						this.querySearch.nome = ""
						uiState.showMessage('Salvo com sucesso', 'success')
					})
			}),
			putCliente: action(() => {
				uiState.isLoading()
				fetchClient.put('/clientes/' + this.cliente._id, this.cliente)
					.then(result => {
						history.goBack()
						uiState.showMessage('Salvo com sucesso', 'success')
					})
			}),
			deleteCliente: action(() => {
				fetchClient.delete('/clientes/' + this.cliente._id)
					.then(result => history.goBack())
			}),
			cnpj: action((value) => {
				var self = this
				fetchJsonp(`https://www.receitaws.com.br/v1/cnpj/${value}`)
				  .then(function(response) {
				    return response.json()
				  }).then(function(result) {
				    if (!result.erro) {
							self.cliente.nome = result.nome
						}
				  }).catch(function(ex) {
				    console.log('parsing failed', ex)
				  })
			}),
			cep: action((value) => {
				fetch(`https://viacep.com.br/ws/${value}/json/`)
					.then(response => response.json())
					.then(result => {
						if (!result.erro) {
							this.cliente.logradouro = result.logradouro
							this.cliente.bairro = result.bairro
							this.cliente.cidade = result.localidade
							this.cliente.uf = result.uf
						}
					})
					.catch(err => console.log(err))
			}),
			hideMessage: action(() => {
				this.showMessage = false
			})
		})
	}
}

export default new ClienteStore()