import { extendObservable } from 'mobx'

class ClienteSearch {
  constructor() {
    extendObservable(this, {
      nome: '',
      cnpj: '',
      cpf: '',
      cep: '',
    })
  }
}

export default ClienteSearch
