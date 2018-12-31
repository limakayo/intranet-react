import React, { Component } from 'react';
import Content from '../components/layout/Content';

import OrdensEditar from '../components/ordens/OrdensEditar';

import { observer } from 'mobx-react';

import ordemStore from '../stores/OrdemStore'
import andamentoStore from '../stores/AndamentoStore'
import atendimentoStore from '../stores/AtendimentoStore'
import aprovacaoStore from '../stores/AprovacaoStore'

const OrdensEditarContainer = (observer(class OrdensEditarContainer extends Component {

  constructor() {
    super()
    ordemStore.resetOrdem();
    this.handleClienteSelected = this.handleClienteSelected.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.handleBlur   = this.handleBlur.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleChangeUppercase = this.handleChangeUppercase.bind(this);
    this.handleChangeUppercaseFirst = this.handleChangeUppercaseFirst.bind(this);
    this.handleDelete = this.handleDelete.bind(this);
    this.handleNext = this.handleNext.bind(this);
    this.handleBack = this.handleBack.bind(this);
  }

  componentDidMount() {
    const { numero } = this.props.match.params

    if (numero !== undefined) {
      ordemStore.getOrdem(numero)
    }
  }

  parseCurrency(valorMo, valorPecas) {
    valorMo = parseFloat( ('0' + valorMo).replace(/[^0-9-]/g, ''), 10 );
    valorPecas = parseFloat( ('0' + valorPecas).replace(/[^0-9-]/g, ''), 10 );

    let value = valorMo + valorPecas;
    value = value.toString();

    let len = value.length;
    let currency = value.substring(0, len-2) + "," + value.substring(len-2);

    return currency;
  }

  handleBlur() {
    let currency = this.parseCurrency(ordemStore.ordem.valorMo, ordemStore.ordem.valorPecas)
    ordemStore.changeOrdem('valorTotal', currency)
  }

  handleChangeUppercase(name, event) {
    let value = event.target ? event.target.value : event
    value = value.toUpperCase()
    this.handleChange(name, value)
  }

  handleChangeUppercaseFirst(name, event) {
    let value = event.target ? event.target.value : event
    value = value.charAt(0).toUpperCase() + value.slice(1)
    this.handleChange(name, value)
  }

  handleBack(step, event) {
    const { andamentos } = andamentoStore

    if (step > 0) {
      let novoAndamento = andamentos.filter((e) => e.ordem === step - 1)[0]
      // Manutenção -> Aprovação
      if (step === 3) {
        ordemStore.changeAndamento(novoAndamento)
      // Fechada -> Manutenção
      } else if (step === 4) {
        this.handleChange("fechada", false)
      // Entregue -> Fechada
      } else if (step === 5) {
        this.handleChange("entregue", false)
      }
    }
  }

  handleNext(step, event) {
    const { andamentos } = andamentoStore

    if (step > 1 && step < 5) { 
      let novoAndamento = andamentos.filter((e) => e.ordem === step + 1)[0]
      // Manutenção -> Fechada
      if (step === 3) {
        this.handleChange("fechada", true)
      // Fechada -> Entregue
      } else if (step === 4) {
        this.handleChange("entregue", true)
      // Aprovação -> Manutenção
      } else if (step === 2) {
        ordemStore.changeAndamento(novoAndamento)
      }
    }
  }

  handleChange(name, event) {
    const { atendimentos } = atendimentoStore

    let value = event.target ? event.target.value : event
    
    if (name === 'atendimento') {
      ordemStore.changeOrdem('garantia', false)
      for (var i = atendimentos.length - 1; i >= 0; i--) {
        if (atendimentos[i]._id === value && atendimentos[i].nome === 'Garantia') {
          ordemStore.changeOrdem('garantia', true)
          break;
        }
      }
    }

    if (name === 'modulo') {
      value = event.target.checked
    }

    ordemStore.changeOrdem(name, value)
    this.updateAndamento()
  }

  updateAndamento() {
    const { andamentos } = andamentoStore
    const { aprovacoes } = aprovacaoStore
    const { ordem, changeAndamento } = ordemStore

    // 0 - Aberta
    let andamento = andamentos.filter((e) => e.ordem === 0)[0]
    // 1 - Orçamento Técnico
    if (ordem.solucaoTecnica !== undefined && ordem.solucaoTecnica !== '') {
      andamento = andamentos.filter((e) => e.ordem === 1)[0]
    }
    // 2 - Orçamento Financeiro
    if (ordem.solucao !== undefined && ordem.solucao !== '') {
      andamento = andamentos.filter((e) => e.ordem === 2)[0]
      if (ordem.dataHoraOrcamento === null)
        ordem.dataHoraOrcamento = Date.now()
    } else {
      ordem.dataHoraOrcamento = null
    }
    // 3 - Aprovação
    if (ordem.aprovacao !== undefined) {
      let aprovacao = aprovacoes.filter((e) => e._id === ordem.aprovacao)[0]
      if (aprovacao.nome !== 'Aguardando') {
        andamento = andamentos.filter((e) => e.ordem === 3)[0]
        if (ordem.dataHoraAprovacao === null) 
          ordem.dataHoraAprovacao = Date.now()
      }
    } else {
      ordem.dataHoraAprovacao = null
    }
    // 4 - Fechada
    if (ordem.fechada !== undefined && ordem.fechada) {
      andamento = andamentos.filter((e) => e.ordem === 4)[0]
      if (ordem.dataHoraFechada === null)
        ordem.dataHoraFechada = Date.now()
    } else {
      ordem.dataHoraFechada = null
    }
    // 5 - Entregue
    if (ordem.entregue !== undefined && ordem.entregue) {
      andamento = andamentos.filter((e) => e.ordem === 5)[0]
      if (ordem.dataHoraEntregue === null)
        ordem.dataHoraEntregue = Date.now()
    } else {
      ordem.dataHoraEntregue = null
    }
    
    changeAndamento(andamento)
  }

  handleSubmit() {
    ordemStore.putOrdem()
  }

  handleDelete() {
    ordemStore.deleteOrdem()
  }

  handleClienteSelected(cliente) {
    ordemStore.clienteSelected(cliente)
  }

	render() {
    const { numero } = this.props.match.params

		return (
			<div>
				<Content
          action="back"
          title="Editar Ordem">
          {numero !== undefined ? (
            <OrdensEditar
              handleClienteSelected={this.handleClienteSelected}
              handleChange={this.handleChange}
              handleChangeUppercase={this.handleChangeUppercase}
              handleChangeUppercaseFirst={this.handleChangeUppercaseFirst}
              handleBlur={this.handleBlur}
              handleSubmit={this.handleSubmit}
              handleDelete={this.handleDelete}
              handleNext={this.handleNext}
              handleBack={this.handleBack}/>
          ) : null}
				</Content>
			</div>
		)

	}
}))

export default OrdensEditarContainer
