import React from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import Slide from '@material-ui/core/Slide';
import Grid from '@material-ui/core/Grid';
import AccountIcon from '@material-ui/icons/PersonPin';
import CloseIcon from '@material-ui/icons/Close';
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';
import { connect } from "react-redux";
import { withStyles } from '@material-ui/core/styles';




function Transition(props) {
    return <Slide direction="up" {...props} />;
}

const styles = {};

class AddUser extends React.Component {
    state = {
        open: false,
        seletedPeople: {},
        name: '',
        _id: '',
        Description: '',
    };

    handleClickOpen = () => {
        this.setState({ open: true });
    };

    handleClose = () => {
        this.setState({ open: false });
    };

    setInput = (e, key) => {
        this.setState({ [key]: e.target.value });
    }
    onAdd = () => {
        const { onAdd, addHandlar } = this.props;
        const { name, _id, Description } = this.state;
        if (_id.length > 0) {
            onAdd({ name, _id, Description });
            this.setState({
                name: '',
                _id: '',
                Description: '',
            }, () => addHandlar(false));
        }
        else{
            
        this.setState({errorMsg: "_Id is required"})
        }
    }

    render() {
        const { isOpen, addHandlar, onAdd } = this.props;
        const { name, _id, Description } = this.state;
        return (
            <div>
                <Dialog
                    open={isOpen}
                    TransitionComponent={Transition}
                    aria-labelledby="alert-dialog-slide-title"
                    aria-describedby="alert-dialog-slide-Description"
                >
                    <DialogTitle id="alert-dialog-slide-title">
                        <div style={{ display: "flex" }}>
                            <div>
                                <AccountIcon style={{ fontSize: 76 }} />
                            </div>
                            <div style={{ textAlign: "right", width: "100%", cursor: "pointer" }} onClick={() => addHandlar(false)}>
                                <CloseIcon />
                            </div>
                        </div>
                    </DialogTitle>
                    <DialogContent>
                        <Grid item xs={12}>
                            <Grid container>
                                <Grid item xs={1}></Grid>
                                <Grid item xs={10}>
                                    <Grid container spacing={40}>
                                        <Grid item xs={5}>
                                            <Typography variant="h4" gutterBottom>
                                                Name
                                            </Typography>
                                        </Grid>
                                        <Grid item xs={7} style={{ textAlign: "left" }}>
                                            <TextField
                                                style={{ fontSize: 29 }}
                                                onChange={(e) => this.setInput(e, 'name')}
                                                value={name}
                                            />
                                        </Grid>
                                        <Grid item xs={5}>
                                            <Typography variant="h4" gutterBottom>
                                                Id
                                            </Typography>
                                        </Grid>
                                        <Grid item xs={7} style={{ textAlign: "left" }}>
                                            <TextField
                                                style={{ fontSize: 29 }}
                                                onChange={(e) => this.setInput(e, '_id')}
                                                value={_id}
                                            />
                                        </Grid>

                                        <Grid item xs={5}>
                                            <Typography variant="h4" gutterBottom>
                                                Description
                                            </Typography>
                                        </Grid>
                                        <Grid item xs={7} style={{ textAlign: "left" }}>
                                            {/* <TextField
                                                fullWidth
                                                /> */}
                                            <TextField
                                                style={{ fontSize: 29 }}
                                                id="standard-multiline-static"
                                                multiline
                                                rows="4"
                                                value={Description}
                                                margin="normal"
                                                onChange={(e) => this.setInput(e, 'Description')}
                                            />
                                        </Grid>
                                    </Grid>
                                </Grid>
                                <Grid item xs={1}></Grid>
                            </Grid>
                        </Grid>
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={() => addHandlar(false)} color="primary">
                            Cancel
                        </Button>
                        <Button onClick={this.onAdd} variant="contained" size="large" color="primary" style={{
                            borderRadius: 91,
                            fontSize: 14
                        }}>
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
    connect(mapStateToProps, {})(AddUser)
  );
