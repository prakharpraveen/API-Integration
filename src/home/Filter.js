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
class Filter extends Component {
  
    render() {
        const { classes, handleItemsPerPage, per_page } = this.props;
        return (
            <FormControl className={classes.formControl}>
                <InputLabel htmlFor="items_per_page-simple">Items</InputLabel>
                <Select
                    value={per_page}
                    onChange={(e) => handleItemsPerPage(e)}
                    inputProps={{
                        name: 'items_per_page',
                        id: 'items_per_page-simple',
                    }}
                >
                    <MenuItem value={3}>3</MenuItem>
                    <MenuItem value={5}>5</MenuItem>
                    <MenuItem value={10}>10</MenuItem>
                    <MenuItem value={50}>50</MenuItem>
                </Select>
            </FormControl>
        )
    }
}

export default withStyles(styles)(Filter);