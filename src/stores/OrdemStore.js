import { action, extendObservable, flow } from 'mobx'
import fetchClient from '../utils/FetchClient'
import Ordem from '../models/Ordem'
import Equipamento from '../models/Equipamento'
import OrdemSearch from '../models/OrdemSearch'
import history from '../utils/history'
import uiState from './UiStore'

class OrdemStore {
	constructor() {
		extendObservable(this, {
			abertas: [],
			orcadas: [],
      aprovadas: [],
      reprovadas: [],
			aguardadas: [],
			fechadas: [],
      ordensCliente: [],
      ordem: new Ordem(),
      cliente: {},
			querySearch: new OrdemSearch(),
      equipamento: new Equipamento(),
      isLoaded: false,
      resetOrdem: action(() => {
        this.isLoaded = false
        this.equipamento = new Equipamento()
        this.cliente = {}
        this.ordem = new Ordem()
      }),
      changeOrdem: action((name, value) => {
      	this.ordem[name] = value
      }),
      changeOrdemCliente: action((ordem, name, value) => {
        this.ordem = ordem
        this.ordem[name] = value
      }),
      changeAndamento: action((andamento) => {
        this.ordem.andamento = andamento
      }),
      changeEquipamento: action((name, event) => {
        this.equipamento[name] = event.target.value
      }),
      confirmEquipamento: action(() => {
        this.ordem.equipamento = this.equipamento.id ? this.equipamento.id : this.ordem.equipamento
        this.ordem.marca = this.equipamento.marca ? this.equipamento.marca : this.ordem.marca
        this.ordem.modelo = this.equipamento.modelo ? this.equipamento.modelo : this.ordem.modelo
        this.ordem.serie = this.equipamento.serie ? this.equipamento.serie : this.ordem.serie
        this.ordem.serieCompleto = this.equipamento.serieCompleto ? this.equipamento.serieCompleto : this.ordem.serieCompleto
        this.ordem.origem = this.equipamento.origem ? this.equipamento.origem : this.ordem.origem
      }),
      cancelEquipamento: action(() => {
        this.equipamento = new Equipamento()
      }),
      changeCliente: action((cliente) => {
        this.cliente = cliente
      }),
      confirmCliente: action(() => {
        this.ordem.cliente = this.cliente ? this.cliente : this.ordem.cliente
      }),
      cancelCliente: action(() => {
        this.cliente = this.ordem.cliente
      }),
      getOrdem: action((numero) => {
        this.isLoaded = false
        fetchClient.get('/ordens/' + numero)
        	.then(result => {
        		this.isLoaded = true
            if (result !== null) {
              this.ordem = result
              history.replace({...history.location, pathname: `/ordens/editar/${numero}`})
            } else {
              history.replace({...history.location, pathname: '/ordens/'})
              uiState.showMessage('Nenhuma ordem encontrada', 'info')
            }
        	})
      }),
      postOrdem: action(() => {
        uiState.isLoading()
				fetchClient.post('/ordens', this.ordem)
					.then(result => {
						this.proximoNumero()
            uiState.showMessage(`Ordem ${this.ordem.numero} cadastrada com sucesso`, 'success')
					})
      }),
      putOrdem: action(() => {
        uiState.isLoading()
        fetchClient.put('/ordens/' + this.ordem.numero, this.ordem)
          .then(result => {
            uiState.showMessage('Ordem salva com sucesso', 'success')
          })
      }),
      clienteSelected: action((cliente) => {
        this.ordem.cliente = cliente._id
      }),
      proximoNumero: action(() => {
        this.isLoaded = false
        fetchClient.get('/ordens/last')
          .then(result => { 
            this.ordem.numero = parseInt(result.numero, 10) + 1
            this.ordem.andamento = result.andamento
            this.ordem.aprovacao = result.aprovacao
            this.ordem.pagamento = result.pagamento
            this.isLoaded = true
          })
      }),
			changeSearch: action((name, event) => {
				this.querySearch[name] = event.target.value
			}),
      clienteSearchSelected: action((cliente) => {
        if (cliente) {
          this.querySearch.cliente = cliente._id
          this.querySearch.numero = ""
          this.querySearch.serie = ""
        }
      }),
			searchOrdem: action(() => {
				fetchClient.post('/ordens/search', this.querySearch)
					.then(result => {
            if (result !== null) {
              this.ordem = result
              history.push(`/ordens/editar/${this.ordem.numero}`)
            } else {
              uiState.showMessage('Ordem não encontrada', 'warning')
            }
            this.querySearch = new OrdemSearch()
					})
			}),
      searchOrdensCliente: action(() => {
        if (this.querySearch.cliente !== "") {
          fetchClient.get(`/ordens/cliente/${this.querySearch.cliente}`)
            .then(result => {
              this.ordensCliente = result
              if (this.ordensCliente.length > 0) {
                history.push(`/ordens/cliente/${this.querySearch.cliente}`)
              } else {
                console.log("Nenhuma ordem encontrada")
              }
              this.querySearch = new OrdemSearch()
            })
        }
      }),
			getOrdens: flow(function * () {
				try {
					yield fetchClient.get('/ordens/andamento/Aberta')
						.then(result => this.abertas = result)
					yield fetchClient.get('/ordens/andamento/Orçamento')
	          .then(result => this.orcadas = result)
					yield fetchClient.get('/ordens/aprovacao/Aprovada')
	          .then(result => this.aprovadas = result)
					yield fetchClient.get('/ordens/aprovacao/Reprovada')
	          .then(result => this.reprovadas = result)
					yield fetchClient.get('/ordens/andamento/Aprovação')
						.then(result => this.aguardadas = result)
					yield fetchClient.get('/ordens/andamento/Fechada')
						.then(result => this.fechadas = result)
				} catch (error) {
					console.error(error)
				}
			})
		})
	}
}

export default new OrdemStore()
