import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import List from '@material-ui/core/List';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import SearchIcon from '@material-ui/icons/Search';
import Hidden from '@material-ui/core/Hidden';
import Divider from '@material-ui/core/Divider';
import Icon from '@material-ui/core/Icon';
import Menu from './Menu';
import history from '../../utils/history';

import Search from '../Search';
import Message from '../Message';

import uiStore from '../../stores/UiStore'

const drawerWidth = 240;

const styles = theme => ({
  root: {
    flexGrow: 1,
    height: '100%',
    zIndex: 1,
    display: 'flex',
    position: 'relative',
    width: '100%',
  },
  flex: {
    flexGrow: 1
  },
  appBar: {
    marginLeft: drawerWidth,
    [theme.breakpoints.up('md')]: {
      width: `calc(100% - ${drawerWidth}px)`,
    },
  },
  removeBoxShadow: {
    boxShadow: 'none'
  }, 
  toolbar: {
    textAlign: 'center',
    padding: 20,
    color: '#3f51b5'
  },
  navIconHide: {
    [theme.breakpoints.up('md')]: {
      display: 'none',
    },
  },
  list: {
    paddingTop: 0
  },
  drawerPaper: {
    width: drawerWidth,
  },
  content: {
    flexGrow: 1,
    [theme.breakpoints.up('md')]: {
      marginLeft: 241
    },
    marginTop: 64,
    [theme.breakpoints.down('sm')]: {
      marginTop: 56
    },
  },
});

class Content extends Component {
  state = {
    mobileOpen: false,
  };

  handleDrawerToggle = () => {
    this.setState({ mobileOpen: !this.state.mobileOpen });
  };

  handleBack = () => {
    history.goBack();
  };

  render() {
    const { 
      classes, 
      theme, 
      title, 
      children, 
      action 
    } = this.props;

    const { handleOpenSearch } = uiStore

    const drawer = (
      <div>
        <div className={classes.toolbar}>
          <Typography variant="title" color="primary" noWrap>
            Intranet QHN
          </Typography>
        </div>
        <Divider />
        <List className={classes.list}>
          <Menu />
        </List>
      </div>
    );

    return (
      <div className={classes.root}>
        <AppBar className={
          `${classes.appBar} 
          ${history.location.pathname === '/ordens' ? classes.removeBoxShadow : null}`
        }>
          <Toolbar>
            <IconButton
              color="inherit"
              aria-label="open drawer"
              onClick={action === 'back' ? this.handleBack : this.handleDrawerToggle}
              className={classes.navIconHide}
            >
              {action === 'back' ? <Icon>arrow_back</Icon> : <Icon>menu</Icon>}
            </IconButton>
            <Typography variant="title" color="inherit" noWrap className={classes.flex}>
              {title}
            </Typography>
            <IconButton
              color="inherit"
              onClick={handleOpenSearch}
            >
              <SearchIcon />
            </IconButton>
          </Toolbar>
        </AppBar>
        <Hidden mdUp>
          <Drawer
            variant="temporary"
            anchor={theme.direction === 'rtl' ? 'right' : 'left'}
            open={this.state.mobileOpen}
            onClose={this.handleDrawerToggle}
            classes={{
              paper: classes.drawerPaper,
            }}
            ModalProps={{
              keepMounted: true, // Better open performance on mobile.
            }}
          >
            {drawer}
          </Drawer>
        </Hidden>
        <Hidden smDown implementation="css">
          <Drawer
            variant="permanent"
            open
            classes={{
              paper: classes.drawerPaper,
            }}
          >
            {drawer}
          </Drawer>
        </Hidden>
        <main className={classes.content}>
          {children}
        </main>

        <Search />
        <Message />
      </div>
    );
  }
}

Content.propTypes = {
  classes: PropTypes.object.isRequired,
  theme: PropTypes.object.isRequired,
};

export default withStyles(styles, { withTheme: true })(Content);