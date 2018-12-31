import { extendObservable } from 'mobx'

class OrdemSearch {
  constructor() {
    extendObservable(this, {
      numero: '',
      cliente: '',
      serie: ''
    })
  }
}

export default OrdemSearch
