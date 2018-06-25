import { extendObservable } from 'mobx'

class Cliente {
  constructor() {
    extendObservable(this, {
      nome: '',
      pessoaFisica: false,
      parceria: false,
      contatos: [],
      cpf: '',
      cnpj: '',
      ie: '',
      cep: '',
      logradouro: '',
      numero: '',
      complemento: '',
      bairro: '',
      cidade: '',
      uf: '',
      observacoes: ''
    })
  }
}

export default Cliente
