import React, { Component } from 'react';
import { withStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import CardView from './CardView';
import { fetchUsersAction } from './../actions/userAction';
import { connect } from "react-redux";

import Filter from './Filter';


const styles = theme => ({
    root: {
        flexGrow: 1,
        padding: theme.spacing.unit * 2,
    },
    paper: {
        padding: theme.spacing.unit * 2,
        textAlign: 'center',
        color: 'theme.palette.text.secondary',
    },
});

class ListView extends Component {

    state = {
        page: 1,
        per_page: 10,
        total: 0,
        total_pages: 0,
        users: []
    }

    componentDidMount() {
        const { fetchUsersAction } = this.props;
        const { per_page } = this.state;
        fetchUsersAction("?per_page=" + per_page);
    }

    componentWillReceiveProps(nextProps){
        console.log({nextProps});
        const { users } = nextProps.users;
        this.setState({users: users.data, page: users.page,per_page: users.per_page, total: users.total, total_pages: users.total_pages});
    }

    render() {
        const { classes } = this.props;
        const {  users } = this.state;
        console.log("**************");
        console.log(users);
        
        return (
            <div className={classes.root}>
                <Grid container spacing={24} justify="center">
                    <Grid item xs={12}>
                        <Paper className={classes.paper}>
                        <Grid item md={3}>
                            <Filter />
                        </Grid>
                        </Paper>
                    </Grid>
                    <Grid item xs={12}>
                        <Paper className={classes.paper}>
                            <Grid container spacing={24} justify="center" >
                                {
                                    users.map((user, i)=> (
                                        <Grid item md={3} key={i}>
                                            {/* <Paper className={classes.paper} > */}
                                                <CardView user={user}/>
                                            {/* </Paper> */}
                                        </Grid>
                                    ))
                                }

                            </Grid>
                        </Paper>
                    </Grid>
                    {/* <Grid item xs={6}>
                        <Paper className={classes.paper}>xs=6</Paper>
                    </Grid>
                    <Grid item xs={6}>
                        <Paper className={classes.paper}>xs=6</Paper>
                    </Grid> */}

                </Grid>
            </div>
        )
    }
}


const mapStateToProps = state => {
    console.log({state});

   return { users: state.userReducer}
};
  
export default withStyles(styles)(
    connect(mapStateToProps, {fetchUsersAction})(ListView)
);