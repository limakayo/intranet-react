import { action, extendObservable } from 'mobx'
import fetchClient from '../utils/FetchClient'

class AprovacaoStore {
	constructor() {
		extendObservable(this, {
			aprovacoes: [],
			getAprovacoes: action(function() {
				fetchClient.get('/aprovacoes')
					.then(result => { 
						this.aprovacoes = result
					})
			})
		})
	}
}

export default new AprovacaoStore()
