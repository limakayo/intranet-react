import { action, extendObservable } from 'mobx'
import fetchClient from '../utils/FetchClient'

class TransporteStore {
	constructor() {
		extendObservable(this, {
			transportes: [],
			getTransportes: action(function() {
				fetchClient.get('/transportes')
					.then(result => { 
						this.transportes = result
					})
			})
		})
	}
}

export default new TransporteStore()
