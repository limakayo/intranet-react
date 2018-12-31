import React, { Component } from 'react';
import { Router } from 'react-router-dom';
import Routes from './Routes';
import { MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles';
import blue from '@material-ui/core/colors/blue';
import history from './utils/history'

import equipamentoStore from './stores/EquipamentoStore'
import atendimentoStore from './stores/AtendimentoStore'
import transporteStore from './stores/TransporteStore'
import andamentoStore from './stores/AndamentoStore'
import pagamentoStore from './stores/PagamentoStore'
import aprovacaoStore from './stores/AprovacaoStore'

const theme = createMuiTheme({
  palette: {
    primary: { main: blue[900] },
  },
});

class App extends Component {
	componentDidMount() {
		equipamentoStore.getEquipamentos()
    atendimentoStore.getAtendimentos()
    transporteStore.getTransportes()
    andamentoStore.getAndamentos()
    pagamentoStore.getPagamentos()
    aprovacaoStore.getAprovacoes()
	}

	render() {
		return (
			<MuiThemeProvider theme={theme}>
		    <Router history={history}>
		      <Routes/>
		    </Router>
		  </MuiThemeProvider>
		)
	}
}

export default App;
