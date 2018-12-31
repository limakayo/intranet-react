import React, { Component } from 'react';
import Content from '../components/layout/Content';
import Ordens from '../components/ordens/Ordens';

import { observer } from 'mobx-react';

import ordemStore from '../stores/OrdemStore';

const OrdensContainer = observer(class OrdensContainer extends Component {
  componentDidMount() {
    ordemStore.getOrdens()
  }

	render() {
		return (
			<div>
				<Content title="Ordens">
  				<Ordens />
				</Content>
			</div>
		)
	}
})

export default OrdensContainer
