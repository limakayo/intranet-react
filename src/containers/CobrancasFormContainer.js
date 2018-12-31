import React, { Component } from 'react';
import Content from '../components/layout/Content';
import Cobranca from '../components/cobrancas/Cobranca';

import { observer } from 'mobx-react';

import cobrancaStore from '../stores/CobrancaStore'
import pagamentoStore from '../stores/PagamentoStore'
import clienteStore from '../stores/ClienteStore'

const CobrancasFormContainer = (observer(class CobrancasFormContainer extends Component {

  constructor() {
    super()
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  componentDidMount() {
    const { id } = this.props.match.params
    if (id !== undefined) {
      cobrancaStore.getOrdens(id)
      clienteStore.getCliente(id)
    }
  }

  handleChange(name, event) {
  }

  handleSubmit() {
  }

	render() {
		return (
			<Content
        action="back"
        title={'Cobrança'}>
        <Cobranca 
          cliente={clienteStore.cliente}
          ordens={cobrancaStore.ordens}
          valorTotal={cobrancaStore.valorTotal}
          pagamentos={pagamentoStore.pagamentos}/>
			</Content>
		)
	}
}))

export default CobrancasFormContainer
