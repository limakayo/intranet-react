import React from 'react';
import PropTypes from 'prop-types';

import { withStyles } from '@material-ui/core/styles';

import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';

import { observer } from 'mobx-react';

import OrdensList from './OrdensList';
import FloatButtons from '../FloatButtons';

import ordemStore from '../../stores/OrdemStore';
import uiStore from '../../stores/UiStore';

const styles = theme => ({
	root: {
		marginBottom: 142
	}
})

function handleChangeTab(event, value) {
	uiStore.changeTab(value)
}

const Ordens = observer(function Ordens(props) {

	const { classes } = props
	const { tabValue } = uiStore
	const {
  	abertas,
  	orcadas,
  	aprovadas,
  	reprovadas,
		aguardadas,
		fechadas
  } = ordemStore

  return (
  	<div className={classes.root}>
			<AppBar position="static" color="default">
        <Tabs
          value={tabValue}
          onChange={handleChangeTab}
          indicatorColor="primary"
          textColor="primary"
          scrollable
					scrollButtons="auto"
        >
          <Tab label={`Abertas (${abertas && abertas.length})`} />
          <Tab label={`Orçamentos (${orcadas && orcadas.length})`} />
          <Tab label={`Aprovadas (${aprovadas && aprovadas.length})`} />
          <Tab label={`Reprovadas (${reprovadas && reprovadas.length})`} />
					<Tab label={`Aguardando (${aguardadas && aguardadas.length})`} />
					<Tab label={`Fechadas (${fechadas && fechadas.length})`} />
        </Tabs>
      </AppBar>
			<div>
        {tabValue === 0 && <OrdensList ordens={abertas}/>}
	      {tabValue === 1 && <OrdensList ordens={orcadas}/>}
	      {tabValue === 2 && <OrdensList ordens={aprovadas}/>}
	      {tabValue === 3 && <OrdensList ordens={reprovadas}/>}
				{tabValue === 4 && <OrdensList ordens={aguardadas}/>}
				{tabValue === 5 && <OrdensList ordens={fechadas}/>}
			</div>

      <FloatButtons />
		</div>
	)
})

Ordens.propTypes = {
	classes: PropTypes.object.isRequired
}

export default withStyles(styles)(Ordens)
