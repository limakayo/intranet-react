import React, { Component } from 'react';
import Content from '../components/layout/Content';
import PecasForm from '../components/pecas/PecasForm';

import { observer } from 'mobx-react';

import pecaStore from '../stores/PecaStore';

const PecasFormContainer = observer(class PecasFormContainer extends Component {

  constructor() {
    super()
    this.state = {
      title: 'Cadastrar Peça',
    }
    pecaStore.resetPeca()
    this.handleChange = this.handleChange.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
  }

  componentDidMount() {
    const id = this.props.match.params.id
    if (id !== undefined) {
      this.setState({ title: 'Editar Peça'})
      pecaStore.getPeca(id)
    } else {
      pecaStore.setLoaded()
    }
  }

  handleChange(name, event) {
    let value = event.target ? event.target.value : event
    pecaStore.changePeca(name, value)
  }

  handleSubmit() {
    if (pecaStore.peca._id === undefined)
      pecaStore.postPeca()
    else
      pecaStore.putPeca()
  }

  handleDelete() {
    pecaStore.deletePeca()
  }

	render() {
		return (
			<div>
				<Content
          action="back"
          title={this.state.title}>
  				<PecasForm 
            peca={pecaStore.peca}
            loading={pecaStore.loading}
            isLoaded={pecaStore.isLoaded}
            handleChange={this.handleChange}
            handleSubmit={this.handleSubmit}/>
				</Content>
			</div>
		)
	}
})

export default PecasFormContainer
