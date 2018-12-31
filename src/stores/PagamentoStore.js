import { action, extendObservable } from 'mobx'
import fetchClient from '../utils/FetchClient'

class PagamentoStore {
	constructor() {
		extendObservable(this, {
			pagamentos: [],
			getPagamentos: action(function() {
				fetchClient.get('/pagamentos')
					.then(result => { 
						this.pagamentos = result
					})
			})
		})
	}
}

export default new PagamentoStore()
