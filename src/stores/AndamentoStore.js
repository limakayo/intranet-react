import { action, extendObservable } from 'mobx'
import fetchClient from '../utils/FetchClient'

class AndamentoStore {
	constructor() {
		extendObservable(this, {
			andamentos: [],
			getAndamentos: action(function() {
				fetchClient.get('/andamentos')
					.then(result => { 
						this.andamentos = result
					})
			})
		})
	}
}

export default new AndamentoStore()
