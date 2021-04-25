import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Pagination from '@material-ui/lab/Pagination';

const useStyles = makeStyles((theme) => ({
    root: {
        '& > *': {
            marginTop: theme.spacing(2),
        },
    },
}));

export function PaginationMatirial({ page,noOfPages,onChangePage }) {
    const classes = useStyles();
    return (
        <div className={classes.root}>
            <Pagination
                count={noOfPages}
                page={page}
                onChange={onChangePage}
                defaultPage={1}
                showFirstButton
                showLastButton
                size="large"
            />
        </div>
    );
}