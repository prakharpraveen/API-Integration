import React from 'react';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
  import DialogTitle from '@material-ui/core/DialogTitle';
import { connect } from "react-redux";
import { withStyles } from '@material-ui/core/styles';
import {loginAction} from './../actions/userAction'


const styles = {};

class Login extends React.Component {
  state = {
    open: false,
    email: '',
    password: '',
    isInvalid: false
  };

  onEmailChange = (e) => {
    this.setState({email: e.target.value})
  }

  onPasswordChange = (e) => {
    this.setState({password: e.target.value})
  }

  onLogin = () => {
    const { loginAction } = this.props;
    const { email, password } = this.state;

    const regEx = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

    if (regEx.test(email)) {
        this.setState({isInvalid: true}, () => {return});
    }

    loginAction({email, password});
      
  }

  render() {
    const { classes, isLogin, closeLogin } = this.props;
    const { email, password, isInvalid } = this.state;

    return (
      <div>
        <Dialog
          open={isLogin}
          aria-labelledby="form-dialog-title"
          maxWidth={"md"}
        >
          <DialogTitle id="form-dialog-title">Login</DialogTitle>
          <DialogContent>
            <TextField
              autoFocus
              margin="dense"
              value={email}
              onChange={this.onEmailChange}
              id="name"
              label="Email Address"
              type="email"
              fullWidth
            />
            <TextField
              autoFocus
              margin="dense"
              value={password}
              onChange={this.onPasswordChange}
              id="name"
              label="Password"
              type="password"
              fullWidth
            />
          </DialogContent>
          <DialogActions>
            <Button onClick={() => closeLogin()} color="primary">
              Cancel
            </Button>
            <Button onClick={this.onLogin} color="primary">
                Login
            </Button>
          </DialogActions>
        </Dialog>
      </div>
    );
  }
}

const mapStateToProps = state => ({});
  
export default withStyles(styles)(
    connect(mapStateToProps, {loginAction})(Login)
);