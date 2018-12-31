import { extendObservable } from 'mobx'

class Ordem {
  constructor() {
    extendObservable(this, {
      numero: '',
      cliente: '',
      equipamento: '',
      marca: '',
      modelo: '',
      serie: '',
      serieCompleto: '',
      origem: '',
      dataFabricacao: '',
      defeito: '',
      defeitoTecnico: '',
      solucao: '',
      solucaoTecnica: '',
      pecas: '',
      prazoEntrega: '',
      tecnico: '',
      atendimento: '',
      transporte: '',
      observacoesOrcamento: '',
      observacoesPagamento: '',
      modulo: false,
      garantia: false,
      valorMo: '',
      valorPecas: '',
      valorTotal: '',
      condicaoPagamento: '',
      nfePagamento: '',
      dataPagamento: '',
      dataHoraOrcamento: '',
      dataHoraAprovacao: '',
      dataHoraPronto: '',
      dataHoraFechada: '',
      dataHoraEntregue: '',
      fechada: false,
      entregue: false,
      aprovacao: '',
      andamento: '',
      pagamento: ''
    })
  }
}

export default Ordem
