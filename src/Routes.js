import React from 'react'
import { Route, Redirect } from 'react-router-dom'

import Home from './components/Home'
import Ordens from './containers/OrdensContainer'
import OrdensCliente from './containers/OrdensClienteContainer'
import OrdensEditar from './containers/OrdensEditarContainer'
import OrdensCadastrar from './containers/OrdensCadastrarContainer'
import Clientes from './containers/ClientesContainer'
import ClientesForm from './containers/ClientesFormContainer'
import Cobrancas from './containers/Cobrancas'
import CobrancasForm from './containers/CobrancasFormContainer'

const Routes = () => (
  <div>
  	<Route exact path="/" render={() => (
  		<Redirect to="/home"/>
  	)}/>
    <Route path="/home" component={Home}/>
    <Route exact path="/ordens" component={Ordens}/>
    <Route exact path="/ordens/cliente/:id" component={OrdensCliente}/>
    <Route path="/ordens/cadastrar" component={OrdensCadastrar}/>
    <Route path="/ordens/editar/:numero" component={OrdensEditar}/>
    <Route exact path="/clientes" component={Clientes}/>
    <Route path="/clientes/cadastrar" component={ClientesForm}/>
    <Route path="/clientes/editar/:id" component={ClientesForm}/>
    <Route exact path="/cobrancas" component={Cobrancas}/>
    <Route path="/cobrancas/:id" component={CobrancasForm}/>
  </div>
)

export default Routes
