import React from 'react';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
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
    isInvalid: false
  };

  onEmailChange = (e) => {
    this.setState({email: e.target.value})
  }

  onPasswordChange = (e) => {
    this.setState({password: e.target.value})
  }

  onRegister = () => {
    const { registerAction } = this.props;
    const { email, password } = this.state;

    const regEx = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

    if (regEx.test(email)) {
        this.setState({isInvalid: true}, () => {return});
    }

    registerAction({email, password});
      
  }

  render() {
    const { classes, isRegister, closeRegister } = this.props;
    const { email, password, isInvalid } = this.state;

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
              fullWidth
              value={email}
              onChange={this.onEmailChange}
              label="Email Address"
              type="email"
            />
            <TextField
              fullWidth
              value={password}
              onChange={this.onPasswordChange}
              label="Password"
              type="password"
            />
          </DialogContent>
          <DialogActions>
            <Button onClick={() => closeRegister()} color="primary">
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