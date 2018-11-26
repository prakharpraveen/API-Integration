import React, { Component } from 'react';
import { withStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import UpdateUser from './UpdateUser';
import DeleteUser from './DeleteUser';

const styles = {
  card: {
    maxWidth: 345,
  },
  media: {
    height: 140,
  },
};

class CardView extends Component {

  state = {
    isUpdate: false,
    isDelete: false
  };

  openUpdate = () => {
    this.setState({isUpdate: true});
  }

  closeUpdate = () => {
    this.setState({isUpdate: false});
  }

  openDelete = () => {
    this.setState({isDelete: true});
  }

  closeDelete = () => {
    this.setState({isDelete: false});
  }
  render() {
    const { classes, user={} } = this.props;
    const { isUpdate, isDelete } = this.state;
  
  return (
    <Card className={classes.card}>
    <UpdateUser isUpdate={isUpdate} user={user} closeUpdate={this.closeUpdate} />
    <DeleteUser isDelete={isDelete} user={user} closeDelete={this.closeDelete} />
      <CardActionArea>
        <CardMedia
          className={classes.media}
          image={user.avatar}
          title="Contemplative Reptile"
        />
        <CardContent>
          <Typography gutterBottom variant="h5" component="h2">
            {user.first_name} {" "} {user.last_name}
          </Typography>
        </CardContent>
      </CardActionArea>
      <CardActions>
        <Button size="small" color="primary" onClick={this.openUpdate}>
          Update
        </Button>
        <Button size="small" color="primary" onClick={this.openDelete}>
          Delete
        </Button>
      </CardActions>
    </Card>
  );
}
}

export default withStyles(styles)(CardView);
