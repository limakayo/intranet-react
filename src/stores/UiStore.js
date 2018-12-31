import { action, extendObservable } from 'mobx'
import Message from '../models/Message'

class UiStore {
	constructor() {
		extendObservable(this, {
			tabValue: 0,
			searchOpen: false,
			loading: false,
			message: new Message(),
			changeTab: action(function(value) {
        this.tabValue = value
			}),
			showMessage: action((message, variant) => {
				this.loading = false
				this.message.value = message
				this.message.variant = variant
				this.message.show = true
			}),
			hideMessage: action(() => {
				this.message.show = false
			}),
			isLoading: action(() => {
				this.loading = true
				this.hideMessage()
			}),
			handleOpenSearch: action(() => {
				this.searchOpen = true
			}),
			handleCloseSearch: action(() => {
				this.searchOpen = false
			})
		})
	}
}

export default new UiStore()
