import { action, extendObservable } from 'mobx'
import fetchClient from '../utils/FetchClient'
import history from '../utils/history'

class CobrancaStore {
	constructor() {
		const COBRANCAS = "COBRANCAS"
		extendObservable(this, {
			cobrancas: [],
			clientes: [],
			ordens: [],
			valorTotal: 0,
			getCobrancas: action(function() {
				this.cobrancas = []
				localStorage.removeItem(COBRANCAS)
				fetchClient.get('/cobrancas')
					.then(result => {
						for(var i in result) {
							var cliente = JSON.parse(i)
							this.clientes = [...this.clientes, cliente]
							var ordens = result[i]
							var cobranca = {
								cliente: cliente,
								ordens: ordens
							}
							this.cobrancas = [...this.cobrancas, cobranca]
							localStorage.setItem(COBRANCAS, JSON.stringify(this.cobrancas))
						}
					})
			}),
			getOrdens: action(function(id) {
				if (this.cobrancas.length === 0) {
					this.cobrancas = JSON.parse(localStorage.getItem(COBRANCAS))
					history.push('/cobrancas')
				} else {
					const cobranca = this.cobrancas.filter((e) => e.cliente._id === id)[0]
					this.ordens = cobranca.ordens
					for(var i of this.ordens) {
						let valorTotal = i.valorTotal.replace(',','.')
						this.valorTotal += parseFloat(valorTotal)
					}
					console.log(parseFloat(this.valorTotal).toFixed(2))
				}
			})
		})
	}
}

export default new CobrancaStore()
