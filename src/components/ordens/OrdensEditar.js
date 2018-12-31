import React, { Component } from 'react'
import PropTypes from 'prop-types'

import { withStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Icon from '@material-ui/core/Icon';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';

import Progress from '../Progress';

import Equipamento from './Equipamento';
import Cliente from './Cliente';
import Andamento from './Andamento';
import Orcamento from './Orcamento';
import Pagamento from './Pagamento';

import ordemStore from '../../stores/OrdemStore';

import { observer } from 'mobx-react';

const styles = theme => ({
	root: {
		marginTop: 24,
		marginLeft: 24,
		marginRight: 24,
		marginBottom: 90,
		[theme.breakpoints.down('sm')]: {
      marginTop: 16,
      marginLeft: 32,
      marginRight: 32
    },
	},
	fabContainer: {
		position: 'fixed',
		bottom: 0,
		right: 0
	},
	fabFrame: {
		position: 'relative'
	},
	fabDone: {
		position: 'absolute',
		bottom: theme.spacing.unit * 2,
		right: theme.spacing.unit * 2
	},
})

const OrdensEditar = observer(class OrdensEditar extends Component {

	render() {
		const { 
			classes,
			handleChange,
			handleChangeUppercase,
			handleChangeUppercaseFirst,
			handleBlur,
			handleSubmit,
			handleNext,
			handleBack,
		} = this.props

		const { ordem, isLoaded } = ordemStore

		return(
			<div className={classes.root}>
				{isLoaded ? (
					<div>
						<Grid container spacing={16} style={{ marginBottom: 8 }}>
							<Grid item xs={12}>
		            <Typography variant="headline">
		              {ordem.numero ?
		                'OS ' + ordem.numero
		              : null}
		            </Typography>
		          </Grid>
		        </Grid>
		        <Grid container spacing={24}>
		        	<Grid item xs={12} sm={6} lg={3}>
			          <Equipamento
			          	handleChange={handleChange}/>

			          <Cliente 
			          	handleChange={handleChange}/>
			        </Grid>
			        <Grid item xs={12} sm={6} lg={3}>
			        	<Andamento 
			        		ordem={ordem}
			        		handleChange={handleChange}
			        		handleNext={handleNext}
			        		handleBack={handleBack}/>
			        </Grid>
			        <Grid item xs={12} sm={6} lg={3}>
			          <Orcamento 
			          	ordem={ordem}
			          	handleChange={handleChange}
			          	handleChangeUppercase={handleChangeUppercase}
			          	handleChangeUppercaseFirst={handleChangeUppercaseFirst}/>
			        </Grid>
			        <Grid item xs={12} sm={6} lg={3}>
			          <Pagamento 
			          	ordem={ordem}
			          	handleChange={handleChange} 
			          	handleChangeUppercase={handleChangeUppercase}
			          	handleChangeUppercaseFirst={handleChangeUppercaseFirst}
			          	handleBlur={handleBlur}/>
			        </Grid>
			      </Grid>
						<div className={classes.fabContainer}>
			  			<div className={classes.fabFrame}>
					  		<Button 
					  			variant="fab" 
					  			color="primary" 
					  			aria-label="done" 
					  			className={classes.fabDone}
					  			onClick={handleSubmit}>
					        <Icon>done</Icon>
					      </Button>
					    </div>
				    </div>
				  </div>
				) : <Progress/>}
			</div>
		)
	}
})

OrdensEditar.propTypes = {
	classes: PropTypes.object.isRequired
}

export default withStyles(styles)(OrdensEditar)