import { action, extendObservable } from 'mobx'
import fetchClient from '../utils/FetchClient'

class AtendimentoStore {
	constructor() {
		extendObservable(this, {
			atendimentos: [],
			getAtendimentos: action(function() {
				fetchClient.get('/atendimentos')
					.then(result => { 
						this.atendimentos = result
					})
			})
		})
	}
}

export default new AtendimentoStore()
