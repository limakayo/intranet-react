import { action, extendObservable } from 'mobx'
import fetchClient from '../utils/FetchClient'
import Peca from '../models/Peca'
import history from '../utils/history'

class PecaStore {
	constructor() {
		extendObservable(this, {
			pecas: [],
			peca: new Peca(),
			loading: false,
			isLoaded: false,
			resetPeca: action(() => {
				this.isLoaded = false
				this.peca = new Peca()
			}),
			setLoaded: action(() => {
				this.isLoaded = true
			}),
			getPecas: action(() => {
				fetchClient.get('/pecas')
					.then(result => { 
						this.pecas = result
						this.isLoaded = true
					})
			}),
			changePeca: action((name, value) => {
				this.peca[name] = value
			}),
			getPeca: action((id) => {
				this.isLoaded = false
				fetchClient.get('/pecas/' + id)
					.then(result => {
						this.peca = result
						this.isLoaded = true
					})
			}),
			postPeca: action(() => {
				this.loading = true
				fetchClient.post('/pecas', this.peca)
					.then(result => {
						this.loading = false
						history.goBack()
					})
			}),
			putPeca: action(() => {
				this.loading = true
				fetchClient.put('/pecas/' + this.peca._id, this.peca)
					.then(result => { 
						this.loading = false
						history.goBack()
					})
			}),
			deletePeca: action(() => {
				fetchClient.delete('/pecas/' + this.peca._id)
					.then(result => history.goBack())
			})
		})
	}
}

export default new PecaStore()
