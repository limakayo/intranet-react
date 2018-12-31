import { action, extendObservable } from 'mobx'
import fetchClient from '../utils/FetchClient'

class EquipamentoStore {
	constructor() {
		extendObservable(this, {
			equipamentos: [],
			getEquipamentos: action(function() {
				fetchClient.get('/equipamentos')
					.then(result => { 
						this.equipamentos = result
					})
			})
		})
	}
}

export default new EquipamentoStore()
