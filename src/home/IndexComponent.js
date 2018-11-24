import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import Register from './Register';
import Login from './Login';
import ListView from './ListView';

const styles = {
  root: {
    flexGrow: 1,
  },
  grow: {
    flexGrow: 1,
    textAlign: "center"
  },
  menuButton: {
    marginLeft: -12,
    marginRight: 20,
  },
};
class IndexComponent extends Component {
  state = { 
    isRegister: false,
    isLogin: false
  }

  openRegister = () => {
    this.setState({isRegister: true});
  }

  closeRegister = () => {
    this.setState({isRegister: false});
  }

  openLogin = () => {
    this.setState({isLogin: true});
  }

  closeLogin = () => {
    this.setState({isLogin: false});
  }

  render() {
    const { classes } = this.props;
    const { isRegister, isLogin } = this.state;
    return (
      <div className={classes.root}>
        <Login isLogin={isLogin} closeLogin={this.closeLogin}/>
        <Register isRegister={isRegister} closeRegister={this.closeRegister}/>
        <AppBar position="static">
          <Toolbar>
          <Button color="inherit" onClick={this.openLogin}>Add user</Button>

            {/* <IconButton className={classes.menuButton} color="inherit" aria-label="Menu">
            <MenuIcon />
          </IconButton> */}
            <Typography variant="h6" color="inherit" className={classes.grow}>
              Minkspay
            </Typography>
            <Button color="inherit" onClick={this.openLogin}>Login</Button>
            <Button color="inherit" onClick={this.openRegister}>Register</Button>
          </Toolbar>
        </AppBar>

        <ListView />
      </div>
    );
  }
}

export default withStyles(styles)(IndexComponent);