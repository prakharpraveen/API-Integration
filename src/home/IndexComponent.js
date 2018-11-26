import React, { Component } from 'react';
import { withStyles } from '@material-ui/core/styles';
import { connect } from "react-redux";
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import Register from './Register';
import Login from './Login';
import ListView from './ListView';
import AddUser from './AddUser';
import { logoutAction } from './../actions/userAction';
import Avatar from '@material-ui/core/Avatar';
import Chip from '@material-ui/core/Chip';
import FaceIcon from '@material-ui/icons/Face';
import DoneIcon from '@material-ui/icons/Done';


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
    isLogin: false,
    isAddUser: false
  }

  openAddUser = () => {
    this.setState({ isAddUser: true });
  }

  closeAddUser = () => {
    this.setState({ isAddUser: false });
  }

  openRegister = () => {
    this.setState({ isRegister: true });
  }

  closeRegister = () => {
    this.setState({ isRegister: false });
  }

  openLogin = () => {
    this.setState({ isLogin: true });
  }

  closeLogin = () => {
    this.setState({ isLogin: false });
  }

  logout = () => {
    const { logoutAction } = this.props
    logoutAction();
  }

  render() {
    const { classes, userToken, isFetchingUser } = this.props;
    const { isRegister, isLogin, isAddUser } = this.state;
    console.log({ isFetchingUser });

    return (
      <div className={classes.root}>

        <Login isLogin={isLogin} closeLogin={this.closeLogin} />
        <Register isRegister={isRegister} closeRegister={this.closeRegister} />
        <AddUser isAddUser={isAddUser} closeAddUser={this.closeAddUser} />
        <AppBar position="static">
          <Toolbar>
            <Button color="inherit" onClick={this.openAddUser}>Add user</Button>
            <Typography variant="h6" color="inherit" className={classes.grow}>
              Minkspay
            </Typography>
            {userToken.length === 0 &&
              <div>
                <Button color="inherit" onClick={this.openLogin}>Login</Button>
                <Button color="inherit" onClick={this.openRegister}>Register</Button>

              </div>
            }
            {userToken.length != 0 &&
              <div style={{display: "flex"}}>
                <Button color="inherit" onClick={this.logout}>Logout</Button>
                <Avatar>
                  <FaceIcon />
                </Avatar>

              </div>
            }
          </Toolbar>
        </AppBar>
        <ListView />
      </div>
    );
  }
}


const mapStateToProps = state => {
  console.log(state);

  return {
    userToken: state.userReducer.userToken,

  }
};

export default withStyles(styles)(
  connect(mapStateToProps, { logoutAction })(IndexComponent)
);