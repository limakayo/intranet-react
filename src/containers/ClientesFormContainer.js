import React, { Component } from 'react'
import Content from '../components/layout/Content'
import ClientesFormComponent from '../components/ClientesFormComponent'
import { observer } from 'mobx-react'
import clienteStore from '../stores/ClienteStore'

const ClientesFormContainer = observer(class ClientesFormContainer extends Component {

  constructor() {
    super()
    this.state = {
      title: 'Cadastrar Cliente',
    }
    this.addContato = this.addContato.bind(this);
    this.removeContato = this.removeContato.bind(this);
    this.changeContato = this.changeContato.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.handleBlur = this.handleBlur.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleDelete = this.handleDelete.bind(this);
  }

  componentDidMount() {
    clienteStore.resetCliente()
    this.addContato()
    const id = this.props.match.params.id
    if (id !== undefined) {
      this.setState({ title: 'Editar Cliente'})
      clienteStore.getCliente(id)
    }
  }

  addContato() {
    clienteStore.addContato()
  }

  removeContato(id) {
    clienteStore.removeContato(id)
  }

  capitalize(string) {
    return string.replace(/(^|\s)\S/g, l => l.toUpperCase())
  }

  changeContato(name, id, event) {
    let value = event.target ? event.target.value : event
    if (name === 'nome') {
      value = this.capitalize(value)
    }
    clienteStore.changeContato(name, id, value)
  }

  handleChange(name, event) {
    let value = event.target ? event.target.value : event
    if (name === 'pessoaFisica' || name === 'parceria') {
      value = event.target.checked
    }
    if (name === 'nome' || name === 'logradouro' || name === 'bairro' || name === 'cidade') {
      value = value.toUpperCase()
    }
    clienteStore.changeCliente(name, value)
  }

  handleBlur(name, event) {
    if (name === 'cep' && event.target.value.length === 9) {
      let value = event.target.value.slice(0,5) + event.target.value.slice(6,9)
      clienteStore.cep(value)
    }
    if (name === 'cnpj') {
      let value = event.target.value.replace(/[^\w\s]/gi, '')
      clienteStore.cnpj(value)
    }
  }

  handleSubmit() {
    if (clienteStore.cliente._id === undefined)
      clienteStore.postCliente()
    else
      clienteStore.putCliente()
  }

  handleDelete() {
    clienteStore.deleteCliente()
  }

	render() {
		return (
			<div>
				<Content
          action="back"
          title={this.state.title}>
  				<ClientesFormComponent
            cliente={clienteStore.cliente}
            contatos={clienteStore.contatos}
            addContato={this.addContato}
            removeContato={this.removeContato}
            changeContato={this.changeContato}
            handleChange={this.handleChange}
            handleBlur={this.handleBlur}
            handleSubmit={this.handleSubmit}
            handleDelete={this.handleDelete}/>
				</Content>
			</div>
		)
	}
})

export default ClientesFormContainer
