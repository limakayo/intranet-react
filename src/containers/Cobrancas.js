import React, { Component } from 'react';
import Content from '../components/layout/Content';
import Cobrancas from '../components/cobrancas/Cobrancas';

import { observer } from 'mobx-react';

import cobrancaStore from '../stores/CobrancaStore';

const CobrancasContainer = observer(class CobrancasContainer extends Component {
  componentDidMount() {
    cobrancaStore.getCobrancas()
  }

	render() {
		return (
			<div>
				<Content title="Cobranças">
  				<Cobrancas />
				</Content>
			</div>
		)
	}
})

export default CobrancasContainer
