import React from 'react';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import { connect } from "react-redux";
import { withStyles } from '@material-ui/core/styles';
import {registerAction} from './../actions/userAction'

const styles = {};

class Register extends React.Component {
  state = {
    open: false,
    email: '',
    password: '',
    validEmail: false,
    validPassword: false
  };

  onEmailChange = (e) => {
    this.setState({validEmail: false, email: e.target.value})
  }

  onPasswordChange = (e) => {
    this.setState({validPassword: false, password: e.target.value})
  }

  onRegister = () => {
    this.setState({validEmail: false, validPassword: false});

    const { registerAction, closeRegister } = this.props;
    const { email, password } = this.state;
    const regEx = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

    if (!regEx.test(email)) {
        this.setState({validEmail: true});
        return
    }

    if (password.length < 7) {
      this.setState({validPassword: true});
      return
    }

    registerAction({email, password})
    closeRegister();
     
  }

  closeRegister = () => {
    const {closeRegister} = this.props;
    this.setState({
      email: '',
      password: '',
      validEmail: false,
      validPassword: false
    }, () => closeRegister());
  }

  render() {
    const { classes, isRegister, closeRegister } = this.props;
    const { email, password, validEmail, validPassword } = this.state;
    return (
      <div>
        <Dialog
          open={isRegister}
          aria-labelledby="form-dialog-title"
          maxWidth={"md"}
        >
          <DialogTitle id="form-dialog-title">Register</DialogTitle>
          <DialogContent>
            <TextField
              error={validEmail}
              fullWidth
              autoFocus
              value={email}
              onChange={this.onEmailChange}
              label="Email Address"
              type="email"
            />
            <TextField
              error={validPassword}
              fullWidth
              value={password}
              onChange={this.onPasswordChange}
              label="Password"
              type="password"
            />
          </DialogContent>
          <DialogActions>
            <Button onClick={this.closeRegister} color="primary">
              Cancel
            </Button>
            <Button onClick={this.onRegister} color="primary">
              Register
            </Button>
          </DialogActions>
        </Dialog>
      </div>
    );
  }
}

const mapStateToProps = state => ({});
  
export default withStyles(styles)(
    connect(mapStateToProps, {registerAction})(Register)
);