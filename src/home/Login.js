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


const styles = {};

class Login extends React.Component {
  state = {
    isBusy: false,
    email: '',
    password: '',
    validEmail: false,
    validPassword: false
  };

  onEmailChange = (e) => {
    this.setState({ validEmail: false, email: e.target.value })
  }

  onPasswordChange = (e) => {
    this.setState({ validPassword: false, password: e.target.value })
  }

  onLogin = () => {
    this.setState({ validEmail: false, validPassword: false });

    const { loginAction, closeLogin } = this.props;
    const { email, password } = this.state;
    const regEx = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;


    if (!regEx.test(email)) {
      this.setState({ validEmail: true });
      return
    }

    if (password.length < 7) {
      this.setState({ validPassword: true });
      return
    }
    this.setState({ isBusy: true });
    loginAction({ email, password }, () => this.closeLogin());

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
    const { email, password, validEmail, validPassword, isBusy } = this.state;

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
              error={validEmail}
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
              error={validPassword}
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