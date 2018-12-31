import React from 'react';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';

function Table(props) {
	return(
		<Grid container spacing={8}>
			<Grid item xs={6}>
	      <Typography variant="body2">
	        {props.title}:
	      </Typography>
	    </Grid>
	    <Grid item xs={6}>
	      <Typography variant="body2" align="right">
	        {props.value}
	      </Typography>
	    </Grid>
	    {props.divider !== false ? (
	    	<Grid item xs={12} style={{ paddingTop: 0 }}>
		    	<Divider />
		    </Grid>
	    ) : null}
	  </Grid>
	)
}

export default Table