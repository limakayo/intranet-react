import React from 'react'
import PropTypes from 'prop-types'
import { withStyles } from '@material-ui/core/styles'
import CircularProgress from '@material-ui/core/CircularProgress'

const styles = theme => ({
	progressContainer: {
    marginTop: theme.spacing.unit * 3,
    textAlign: 'center'
  },
  progress: {
    margin: theme.spacing.unit * 2,
  },
})

function Progress(props) {
	const { classes } = props

	return(
		<div className={classes.progressContainer}>
      <CircularProgress className={classes.progress} />
    </div>
	)
}

Progress.propTypes = {
	classes: PropTypes.object.isRequired
}

export default withStyles(styles)(Progress)