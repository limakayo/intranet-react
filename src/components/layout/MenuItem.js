import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import { NavLink } from 'react-router-dom';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';

const styles = theme => ({
  active: {
    background: '#E0E0E0'
  },
})

const MenuItem = (props) => {
  const { location, classes, children, title } = props;

  return (
    <div>
      <ListItem 
        button 
        to={location}
        component={NavLink}
        activeClassName={classes.active}>
        <ListItemIcon>
          {children}
        </ListItemIcon>
        <ListItemText primary={title} />
      </ListItem>
    </div>
  )
}

MenuItem.propTypes = {
  classes: PropTypes.object.isRequired
}

export default withStyles(styles)(MenuItem)
