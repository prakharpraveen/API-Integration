import React from 'react';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import { connect } from "react-redux";
import { withStyles } from '@material-ui/core/styles';
import { loginAction } from './../actions/userAction';
import { DotLoader } from 'react-spinners';
import DialogContentText from '@material-ui/core/DialogContentText';


const styles = {};

class Login extends React.Component {
  state = {
    isBusy: false,
    email: '',
    password: '',
    validName: false,
    validEmail: false,
    validPassword: false,
    name: ''

  };

  onEmailChange = (e) => {
    this.setState({ validEmail: false, email: e.target.value })
  }

  onPasswordChange = (e) => {
    this.setState({ validPassword: false, password: e.target.value })
  }

  onNameChange = (e) => {
    this.setState({ validName: false, name: e.target.value })
  }
  onLogin = () => {
    this.setState({ validEmail: false, validPassword: false });

    const { loginAction } = this.props;
    const { email, password, name } = this.state;
    const regEx = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

    if (name.length < 1) {
      this.setState({ validName: true });
      return
    }

    if (!regEx.test(email)) {
      this.setState({ validEmail: true });
      return
    }

    if (password.length < 7) {
      this.setState({ validPassword: true });
      return
    }
    this.setState({ isBusy: true });
    loginAction({ email, password, name }, () => this.closeLogin());

  }

  closeLogin = () => {
    const { closeLogin } = this.props;
    this.setState({
      isBusy: false,
      email: '',
      password: '',
      validEmail: false,
      validPassword: false
    }, () => closeLogin());
  }


  render() {
    const { isLogin } = this.props;
    const { email, password, validName, validEmail, validPassword, isBusy, name } = this.state;

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
              error={validName}
              autoFocus
              margin="dense"
              value={name}
              onChange={this.onNameChange}
              label="User Name*"
              type="text"
              fullWidth
            />
            <TextField
              error={validEmail}
              margin="dense"
              value={email}
              onChange={this.onEmailChange}
              label="Email Addres*"
              type="email"
              fullWidth
            />
            <TextField
              error={validPassword}
              margin="dense"
              value={password}
              onChange={this.onPasswordChange}
              label="Password*"
              type="password"
              fullWidth
            />
            {validPassword &&
              <DialogContentText>
                <span style={{ color: "red" }}>
                  password should be at least 7 characters in length
                  <sup>
                    <strong>*</strong>
                  </sup>
                </span>

              </DialogContentText>
            }
          </DialogContent>
          <DialogActions>
            {isBusy &&
              <DotLoader
                sizeUnit={"px"}
                size={33}
                color={'red'}
                loading={true}
              />
            }
            <Button onClick={this.closeLogin} color="primary">
              Cancel
            </Button>
            <Button disabled={isBusy} onClick={this.onLogin} color="primary">
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
  connect(mapStateToProps, { loginAction })(Login)
);