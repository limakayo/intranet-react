import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import ButtonBase from '@material-ui/core/ButtonBase';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import DescriptionIcon from '@material-ui/icons/Description';
import PeopleIcon from '@material-ui/icons/People';
import { Link } from 'react-router-dom';

import Content from './layout/Content';

const styles = theme => ({
	root: {
		margin: 24
	},
	cardButton: {
		width: '100%'
	},
  card: {
    width: '100%',
    '&:hover': {
    	backgroundColor: '#EEEEEE'
    }
  },
  media: {
    height: 0,
    paddingTop: '56.25%', // 16:9
  },
  icon: {
    margin: theme.spacing.unit,
    fontSize: 90,
  }
});

const Home = (props) => {
	const { classes } = props;

	return (
		<Content title="Home">
			<div className={classes.root}>
		    <Grid container spacing={24}>
	    		<Grid item xs={6} sm={3}>
	    			<ButtonBase
	    				focusRipple
	    				component={Link}
	    				to="/ordens"
	    				className={classes.cardButton}>
	    				<Card className={classes.card}>
				    		<div align="center">
				        	<DescriptionIcon className={classes.icon} />
				        </div>
				        <CardContent align="center">
				          <Typography 
				          	variant="headline" 
				          	component="h2">
				            Ordens
				          </Typography>
				        </CardContent>
				      </Card>
	    			</ButtonBase>
			    </Grid>
			    <Grid item xs={6} sm={3}>
	    			<ButtonBase
	    				focusRipple
	    				component={Link}
	    				to="/clientes"
	    				className={classes.cardButton}>
	    				<Card className={classes.card}>
				    		<div align="center">
				        	<PeopleIcon className={classes.icon} />
				        </div>
				        <CardContent align="center">
				          <Typography 
				          	variant="headline" 
				          	component="h2">
				            Clientes
				          </Typography>
				        </CardContent>
				      </Card>
	    			</ButtonBase>
			    </Grid>
		    </Grid>
		  </div>
	  </Content>
	)
}

Home.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(Home);
