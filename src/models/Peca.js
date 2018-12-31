import { extendObservable } from 'mobx'

class Peca {
  constructor() {
    extendObservable(this, {
      nome: '',
      valor: ''
    })
  }
}

export default Peca
