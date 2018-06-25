import React from 'react'
import { Route, Redirect } from 'react-router-dom'

import Home from './components/Home'
import Clientes from './containers/ClientesContainer'
import ClientesForm from './containers/ClientesFormContainer'

const Routes = () => (
  <div>
  	<Route exact path="/" render={() => (
  		<Redirect to="/home"/>
  	)}/>
    <Route path="/home" component={Home}/>
    <Route exact path="/clientes" component={Clientes}/>
    <Route path="/clientes/cadastrar" component={ClientesForm}/>
    <Route path="/clientes/editar/:id" component={ClientesForm}/>
  </div>
)

export default Routes
