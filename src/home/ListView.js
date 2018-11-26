import React, { Component } from 'react';
import { withStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import CardView from './CardView';
import { fetchUsersAction } from './../actions/userAction';
import { connect } from "react-redux";
import Filter from './Filter';
import Button from '@material-ui/core/Button';
import { ClipLoader } from 'react-spinners';

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
    button: {
        margin: theme.spacing.unit,
    },
});

class ListView extends Component {

    state = {
        page: 1,
        per_page: 10,
        total: 0,
        total_pages: 1,
        users: [],
    }

    componentDidMount() {
        const { per_page, page } = this.state;
        this.fetchUser();
    }

    fetchUser = () => {
        const { fetchUsersAction } = this.props;
        const { per_page, page } = this.state;
        fetchUsersAction("?per_page=" + per_page + "&page=" + page);
    }

    componentWillReceiveProps(nextProps) {
        const { users } = nextProps.users;
        this.setState({
            users: users.data,
            page: users.page,
            per_page: users.per_page,
            total: users.total,
            total_pages: users.total_pages
        });
    }

    handleItemsPerPage = event => this.setState({ per_page: event.target.value, page: 1 }, () => this.fetchUser());

    next = () => {
        const { page, total_pages } = this.state;
        if (page === total_pages) {
            return
        }
        this.setState({ page: page + 1, }, () => this.fetchUser());
    }

    previous = () => {
        const { page } = this.state;
        if (page === 1) {
            return
        }
        this.setState({ page: page - 1 }, () => this.fetchUser());
    }

    render() {
        const { classes, isFetchingUser } = this.props;
        const { users, per_page, page, total_pages } = this.state;

        return (
            <div className={classes.root}>


                {

                    <Grid container spacing={24}>
                        <Grid item xs={12}>
                            <Paper className={classes.paper}>
                                <Grid container >
                                    <Grid item md={3}>
                                        <Filter handleItemsPerPage={this.handleItemsPerPage} per_page={per_page} />
                                    </Grid>

                                    <Grid item md={9} style={{ textAlign: "right" }}>
                                        <Button color="primary" className={classes.button} disabled={page === 1} onClick={this.previous} variant="outlined" size="small">
                                            Previous
                                    </Button>
                                        <Button>
                                            page number : {page} of {total_pages}
                                        </Button>
                                        <Button color="primary" className={classes.button} disabled={total_pages === page} onClick={this.next} variant="outlined" size="small">
                                            next
                                    </Button>
                                    </Grid>
                                </Grid>
                            </Paper>
                        </Grid>
                        <Grid item xs={12}>
                            <Paper className={classes.paper}>
                                <Grid container spacing={24} justify="center" >
                                    {!isFetchingUser &&
                                        users.map((user, i) => (
                                            <Grid item md={3} key={i}>
                                                <Paper className={classes.paper} >
                                                    <CardView user={user} />
                                                </Paper>
                                            </Grid>
                                        ))
                                    }
                                    {isFetchingUser &&
                                        <ClipLoader
                                            sizeUnit={"px"}
                                            size={440}
                                            color={'red'}
                                            loading={true}
                                        />
                                    }
                                </Grid>
                            </Paper>
                        </Grid>
                    </Grid>
                }
            </div>
        )
    }
}

const mapStateToProps = state => {
    return {
        users: state.userReducer,
        isFetchingUser: state.userReducer.isFetchingUser
    }
};

export default withStyles(styles)(
    connect(mapStateToProps, { fetchUsersAction })(ListView)
);