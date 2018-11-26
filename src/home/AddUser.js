import React, { Component } from 'react';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import { connect } from "react-redux";
import { withStyles } from '@material-ui/core/styles';
import {addUserAction} from './../actions/userAction';
import DialogContentText from '@material-ui/core/DialogContentText';
import { DotLoader } from 'react-spinners';


const styles = {};

class AddUser extends  Component {
  state = {
    open: false,
    first_name: '',
    last_name: '',
    isInvalid: false,
    id:'',
    avatar: '',
    isBusy: false
  };

  onFirstNameChange = (e) => {
    this.setState({first_name: e.target.value, isInvalid: false})
  }

  onLastNameChange = (e) => {
    this.setState({last_name: e.target.value, isInvalid: false})
  }

  onAvatarChange = (e) => {
    this.setState({avatar: e.target.value, isInvalid: false})
  }

  onAddUser = () => {
    const { addUserAction } = this.props;
    const { first_name, last_name, avatar, id } = this.state;

    if (first_name.length < 1 || last_name.length < 1 || avatar.length < 1) {
      this.setState({isInvalid: true});
      return;
    }
    this.setState({isBusy: true});
    addUserAction({first_name, last_name, avatar, id }, () => this.close());
    ;
  }

  close = () => {
    const { closeAddUser } = this.props;

    this.setState({
      open: false,
      first_name: '',
      last_name: '',
      isInvalid: false,
      id:'',
      avatar: '',
      isBusy: false
    });
    closeAddUser();
  }

  render() {
    const { isAddUser } = this.props;
    const { first_name, last_name, avatar, isInvalid, isBusy } = this.state;

    return (
      <div>
        <Dialog
          open={isAddUser}
          aria-labelledby="form-dialog-title"
          maxWidth={"md"}
        >
          <DialogTitle id="form-dialog-title">Add User</DialogTitle>
          <DialogContent>
            <TextField
              autoFocus
              margin="dense"
              value={first_name}
              onChange={this.onFirstNameChange}
              label="First Name*"
              type="text"
              fullWidth
            />
            <TextField
              autoFocus
              margin="dense"
              value={last_name}
              onChange={this.onLastNameChange}
              label="Last Name*"
              type="text"
              fullWidth
            />
            <TextField
              autoFocus
              margin="dense"
              value={avatar}
              onChange={this.onAvatarChange}
              label="avatar*"
              type="text"
              fullWidth
            />
            
            {isInvalid &&
                <DialogContentText>
                <span style={{color: "red"}}>
                  All fields are required
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
            <Button onClick={this.close} color="primary">
              Cancel
            </Button>
            
            <Button disabled={isBusy} onClick={this.onAddUser} color="primary">
              Add User
            </Button>

            
          </DialogActions>
        </Dialog>
      </div>
    );
  }
}

const mapStateToProps = state => ({});

export default withStyles(styles)(
    connect(mapStateToProps, {addUserAction})(AddUser)
);
