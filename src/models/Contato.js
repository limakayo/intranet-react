import { extendObservable } from 'mobx'

class Contato {
  constructor() {
    extendObservable(this, {
      id: '',
      nome: '',
      email: '',
      ddd: '',
      telefone: '',
      celular: ''
    })
  }
}

export default Contato
