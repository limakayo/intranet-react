import { action, extendObservable } from 'mobx'
import fetchClient from '../utils/FetchClient'
import Cliente from '../models/Cliente'
import Contato from '../models/Contato'
import history from '../utils/history'
import fetchJsonp from 'fetch-jsonp'

class ClienteStore {
	constructor() {
		extendObservable(this, {
			clientes: [],
			contatos: [],
			cliente: new Cliente(),
			querySearch: {},
			isLoaded: false,
			clearClientes: action(() => {
				this.clientes = []
				this.isLoaded = true
			}),
			getClientes: action(() => {
				this.isLoaded = false
				fetchClient.get('/clientes')
					.then(result => { 
						this.clientes = result
						this.isLoaded = true
					})
			}),
			resetCliente: action(() => {
				this.cliente = new Cliente()
				this.contatos = []
				this.isLoaded = true
			}),
			changeCliente: action((name, value) => {
				this.cliente[name] = value
			}),
			changeSearch: action((name, event) => {
				this.querySearch[name] = event.target.value
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
			searchClientes: action((query) => {
				this.isLoaded = false
				fetchClient.post('/clientes/search', query)
					.then(result => {
						this.clientes = result
						this.isLoaded = true
					})
			}),
			getCliente: action((id) => {
				this.isLoaded = false
				fetchClient.get('/clientes/' + id)
					.then(result => {
						this.cliente = result
						this.isLoaded = true
					})
			}),
			postCliente: action(() => {
				fetchClient.post('/clientes', this.cliente)
					.then(result => history.goBack())
			}),
			putCliente: action(() => {
				fetchClient.put('/clientes/' + this.cliente._id, this.cliente)
					.then(result => history.goBack())
			}),
			deleteCliente: action(() => {
				fetchClient.delete('/clientes/' + this.cliente._id)
					.then(result => history.goBack())
			}),
			cnpj: action((value) => {
				var cliente = this.cliente
				fetchJsonp(`https://www.receitaws.com.br/v1/cnpj/${value}`)
				  .then(function(response) {
				    return response.json()
				  }).then(function(result) {
				    if (!result.erro) {
							cliente.nome = result.nome
							cliente.cep = result.cep
							cliente.logradouro = result.logradouro
							cliente.numero = result.numero
							cliente.complemento = result.complemento
							cliente.bairro = result.bairro
							cliente.cidade = result.municipio
							cliente.uf = result.uf
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
			})
		})
	}
}

export default new ClienteStore()