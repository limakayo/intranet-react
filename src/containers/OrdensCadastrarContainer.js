import React, { Component } from 'react';
import Content from '../components/layout/Content';

import OrdensCadastrar from '../components/ordens/OrdensCadastrar';

import { observer } from 'mobx-react';

import ordemStore from '../stores/OrdemStore'
import atendimentoStore from '../stores/AtendimentoStore'

const OrdensCadastrarContainer = (observer(class OrdensCadastrarContainer extends Component {

  constructor() {
    super()
    ordemStore.resetOrdem();
    this.handleClienteSelected = this.handleClienteSelected.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleChangeUppercase = this.handleChangeUppercase.bind(this);
    this.handleChangeUppercaseFirst = this.handleChangeUppercaseFirst.bind(this);
  }

  componentDidMount() {
    ordemStore.proximoNumero()
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
  }

  handleSubmit() {
    ordemStore.postOrdem()
  }

  handleClienteSelected(cliente) {
    ordemStore.clienteSelected(cliente)
  }

	render() {
		return (
			<Content
        action="back"
        title={'Cadastrar Ordem'}>

        <OrdensCadastrar
          handleClienteSelected={this.handleClienteSelected}
          handleChange={this.handleChange}
          handleChangeUppercase={this.handleChangeUppercase}
          handleChangeUppercaseFirst={this.handleChangeUppercaseFirst}
          handleSubmit={this.handleSubmit} />

			</Content>
		)
	}
}))

export default OrdensCadastrarContainer
