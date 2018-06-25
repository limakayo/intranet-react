import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import Routes from './Routes';
import { MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles';
import blue from '@material-ui/core/colors/blue';

const theme = createMuiTheme({
  palette: {
    primary: { main: blue[900] },
  },
});

const App = () => (
  <MuiThemeProvider theme={theme}>
    <Router>
      <Routes/>
    </Router>
  </MuiThemeProvider>
);

export default App;
