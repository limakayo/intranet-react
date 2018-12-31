import { extendObservable } from 'mobx'

class Equipamento {
  constructor() {
    extendObservable(this, {
      id: '',
      marca: '',
      modelo: '',
      serie: '',
      serieCompleto: '',
      origem: '',
      dataFabricacao: ''
    })
  }
}

export default Equipamento
