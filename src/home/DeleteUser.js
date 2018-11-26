import React from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import { connect } from "react-redux";
import { withStyles } from '@material-ui/core/styles';
import { deleteUserAction } from './../actions/userAction'

const styles = {};

class UpdateUser extends React.Component {
    state = {
        isInvalid: false,
        id: '',
    };


    componentWillReceiveProps(nextProps) {
        const { id } = nextProps.user;
        this.setState({ id });
    }

    onDelete = () => {
        const { deleteUserAction, closeDelete } = this.props;
        deleteUserAction(this.state.id);
        closeDelete()
    }

    render() {
        const { isDelete, closeDelete } = this.props;
        return (
            <div>
                <Dialog
                    open={isDelete}
                    aria-labelledby="form-dialog-title"
                    maxWidth={"md"}
                >
                    <DialogTitle id="form-dialog-title">Delete User</DialogTitle>
                    <DialogContent style={{color:"red"}}>
                        Are You sure ?
                     </DialogContent>
                    <DialogActions>
                        <Button onClick={() => closeDelete()} color="primary">
                            Cancel
                        </Button>
                        <Button onClick={this.onDelete} color="primary">
                            Yes
                        </Button>
                    </DialogActions>
                </Dialog>
            </div>
        );
    }
}

const mapStateToProps = state => ({});

export default withStyles(styles)(
    connect(mapStateToProps, { deleteUserAction })(UpdateUser)
);