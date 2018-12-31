import React, { Component } from 'react';
import Content from '../components/layout/Content';
import OrdensCliente from '../components/clientes/OrdensCliente';

import { observer } from 'mobx-react';
import clienteStore from '../stores/ClienteStore';
import ordemStore from '../stores/OrdemStore';
import andamentoStore from '../stores/AndamentoStore';

const OrdensClienteContainer = observer(class OrdensClienteContainer extends Component {
  constructor() {
    super()
    this.handleChange = this.handleChange.bind(this)
  }
  componentDidMount() {
    const { id } = this.props.match.params
    if (id !== undefined) { 
      clienteStore.getCliente(id)
      clienteStore.getOrdens(id)
      andamentoStore.getAndamentos()
    }
  }

  handleChange(ordem, name, event) {
    let value = event.target ? event.target.value : event

    if (name === 'entregue') {
      value = event.target.checked
    }

    ordemStore.changeOrdemCliente(ordem, name, value)
    this.changeAndamento()
  }

  changeAndamento() {
    const { andamentos } = andamentoStore
    const { ordem, changeAndamento, putOrdem } = ordemStore
    let andamento = {}

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
    putOrdem()
  }

  render() {
    return (
      <div>
        <Content title="Ordens Cliente">
          <OrdensCliente
            cliente={clienteStore.cliente}
            isLoaded={clienteStore.isLoaded}
            ordens={clienteStore.ordens}
            handleChange={this.handleChange}/>
        </Content>
      </div>
    )
  }
})

export default OrdensClienteContainer
