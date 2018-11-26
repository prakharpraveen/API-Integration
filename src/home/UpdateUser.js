import React from 'react';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
  import DialogTitle from '@material-ui/core/DialogTitle';
import { connect } from "react-redux";
import { withStyles } from '@material-ui/core/styles';
import {updateAction} from './../actions/userAction'


const styles = {};

class UpdateUser extends React.Component {
  state = {
    open: false,
    first_name: '',
    last_name: '',
    isInvalid: false,
    id:'',
    avatar: ''
  };


  componentWillReceiveProps(nextProps){
      
    console.log("componentWillReceiveProps");
    console.log(nextProps);
    const { first_name, last_name, id, avatar  } = nextProps.user;

    this.setState({first_name, last_name, id, avatar});


    
  }

  onFirstNameChange = (e) => {
    this.setState({first_name: e.target.value})
  }

  onLastNameChange = (e) => {
    this.setState({last_name: e.target.value})
  }

  onAvatarChange = (e) => {
    this.setState({avatar: e.target.value})
  }

  onUpdate = () => {
    const { updateAction } = this.props;
    const { first_name, last_name, avatar, id } = this.state;

    if (first_name.length < 1 || last_name.length < 1) {
      this.setState({isInvalid: true});
    }
    updateAction({first_name, last_name, avatar, id });
  }

  render() {
    const { isUpdate, closeUpdate } = this.props;
    const { first_name, last_name, avatar } = this.state;

    return (
      <div>
        <Dialog
          open={isUpdate}
          aria-labelledby="form-dialog-title"
          maxWidth={"md"}
        >
          <DialogTitle id="form-dialog-title">Update User</DialogTitle>
          <DialogContent>
            <TextField
              autoFocus
              margin="dense"
              value={first_name}
              onChange={this.onFirstNameChange}
              label="First Name"
              type="text"
              fullWidth
            />
            <TextField
              autoFocus
              margin="dense"
              value={last_name}
              onChange={this.onLastNameChange}
              label="Last Name"
              type="text"
              fullWidth
            />
            <TextField
              autoFocus
              margin="dense"
              value={avatar}
              onChange={this.onAvatarChange}
              label="avatar"
              type="text"
              fullWidth
            />
          </DialogContent>
          <DialogActions>
            <Button onClick={() => closeUpdate()} color="primary">
              Cancel
            </Button>
            <Button onClick={this.onUpdate} color="primary">
              Update
            </Button>
          </DialogActions>
        </Dialog>
      </div>
    );
  }
}

const mapStateToProps = state => ({});
  
export default withStyles(styles)(
    connect(mapStateToProps, {updateAction})(UpdateUser)
);