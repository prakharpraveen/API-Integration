import React, { Component } from 'react';
import { withStyles } from '@material-ui/core/styles';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';


const styles = theme => ({
    
    formControl: {
      margin: theme.spacing.unit,
      minWidth: 120,
    },
   
});
class componentName extends Component {
    state = {
        age: '',
        name: 'hai',
        labelWidth: 0,
      };

      handleChange = event => {
        this.setState({ [event.target.name]: event.target.value });
      };
    render() {
        const { classes } = this.props;
        const { age } = this.state;
        return (
            <FormControl className={classes.formControl}>
                <InputLabel htmlFor="age-simple">Items</InputLabel>
                <Select
                    value={age}
                    onChange={this.handleChange}
                    inputProps={{
                        name: 'age',
                        id: 'age-simple',
                    }}
                >
                    <MenuItem value="">
                        <em>None</em>
                    </MenuItem>
                    <MenuItem value={10}>Ten</MenuItem>
                    <MenuItem value={20}>Twenty</MenuItem>
                    <MenuItem value={30}>Thirty</MenuItem>
                </Select>
            </FormControl>
        )
    }
}

export default withStyles(styles)(componentName);