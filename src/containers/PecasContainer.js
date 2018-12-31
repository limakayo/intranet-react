import React, { Component } from 'react';
import Content from '../components/layout/Content';
import Pecas from '../components/pecas/Pecas';

import { observer } from 'mobx-react';

import pecaStore from '../stores/PecaStore';

const PecasContainer = observer(class PecasContainer extends Component {
	componentDidMount() {
		pecaStore.getPecas()
	}

	render() {
		return (
			<div>
				<Content title="Peças">
  				<Pecas 
  					pecas={pecaStore.pecas}
  					isLoaded={pecaStore.isLoaded}/>
				</Content>
			</div>
		)
	}
})

export default PecasContainer
