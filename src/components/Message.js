import React from 'react'
import PropTypes from 'prop-types'
import { withStyles } from '@material-ui/core/styles'

import Dialog from '@material-ui/core/Dialog'
import DialogContent from '@material-ui/core/DialogContent'
import CircularProgress from '@material-ui/core/CircularProgress'

import Snackbar from '@material-ui/core/Snackbar'
import IconButton from '@material-ui/core/IconButton'
import PrintIcon from '@material-ui/icons/Print'

import { observer } from 'mobx-react'

import MySnackbarContent from './MySnackbarContent'

import uiState from '../stores/UiStore'

const styles = theme => ({
	dialogContent: {
		width: 200
	},
	dialogProgress: {
		width: '100%',
		textAlign: 'center'
	},
	icon: {
    fontSize: 20,
  }
})

const Message = observer(function Message(props) {

	const { classes } = props
	const { loading, message, hideMessage } = uiState 

	return (
		<div>
			<Dialog open={loading}>
	      <DialogContent className={classes.dialogContent}>
	        <div className={classes.dialogProgress}>
	          <CircularProgress size={50} />
	          <h3>Salvando...</h3>
	        </div>
	      </DialogContent>
	    </Dialog>
	    
	    {message.value !== "" ? (
	    	<Snackbar
		      anchorOrigin={{
		        vertical: 'bottom',
		        horizontal: 'left',
		      }}
		      open={message.show}
		      onClose={hideMessage}
		      autoHideDuration={10000}>
		      <MySnackbarContent
		        onClose={hideMessage}
		        variant={message.variant}
		        action={
		        	<IconButton
			          key="print"
			          aria-label="Print"
			          color="inherit"
			          onClick={hideMessage}
			        >
			          <PrintIcon className={classes.icon} />
			        </IconButton>
		        }
		        message={message.value}
		      />
		    </Snackbar>
	    ) : null}
	  </div>
	)
})

Message.propTypes = {
	classes: PropTypes.object.isRequired
}

export default withStyles(styles)(Message)