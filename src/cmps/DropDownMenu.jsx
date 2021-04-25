import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormHelperText from '@material-ui/core/FormHelperText';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';

const useStyles = makeStyles((theme) => ({
    formControl: {
        minWidth: 120,
    },
    selectEmpty: {
    },
}));

export function DropDownMenu() {
    const classes = useStyles();
    const [platform, setPlatform] = React.useState('');

    const handleChange = (event) => {
        setPlatform(event.target.value)
        console.log(event.target.value)
    };

    return (
        <div>
            <FormControl className={classes.formControl}>
                <InputLabel id="demo-simple-select-label">Platform</InputLabel>
                <Select
                    labelId="demo-simple-select-label"
                    id="demo-simple-select"
                    value={platform}
                    onChange={handleChange}
                >
                    <MenuItem value={"Linux"}>Linux</MenuItem>
                    <MenuItem value={"macOS"}>macOS</MenuItem>
                    <MenuItem value={"Windows"}>Windows</MenuItem>
                </Select>
            </FormControl>
        </div>
    );
}
