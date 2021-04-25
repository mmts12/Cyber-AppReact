import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import { setFilter } from '../store/actions/attackAction';
import Button from '@material-ui/core/Button';

const useStyles = makeStyles((theme) => ({
  root: {
    '& > *': {
      margin: theme.spacing(1),
      width: '25ch',

    },
  },
}));

export function Filter({ dataSource }) {
  const classes = useStyles();

  const [filterBy, setFilterBy] = useState({ name: '', description: '' })
  const dispatch = useDispatch();

  const handleInput = ({ target }) => {
    const { name, value } = target;
    let filterByCopy = { ...filterBy }
    filterByCopy = { ...filterBy, [name]: value };
    setFilterBy(filterByCopy);
  }

  const onSubmit = (ev) => {
    console.log('search')
    ev.preventDefault();
    dispatch(setFilter(filterBy));
  }

  const onResetSearch = () => {
    setFilterBy({ name: '', description: '' })
    dispatch(setFilter({ name: '', description: '', dataSource: null }));
  }


  if (dataSource) return <div className="data-source-container">
    <h2 className="data-source">Showing attacks with data source: {dataSource}</h2>
    <Button variant="contained" type="button" onClick={onResetSearch}>Load full list</Button>
  </div>
  return (
    <section className="filter-container">
      <form className={`form-filter ${classes.root}`} 
      noValidate autoComplete="off" onSubmit={(ev) => onSubmit(ev)}>
        <TextField id="standard-basic" label="Name" onChange={(ev) => handleInput(ev)} 
        value={filterBy.name} name="name" />
        <TextField id="standard-basic" label="Description" onChange={(ev) => handleInput(ev)}
         value={filterBy.description} name="description" />
        <Button type="submit" variant="contained"> <strong>Search</strong> </Button>
        <Button variant="contained" type="button" onClick={onResetSearch}><strong>Reset</strong></Button>
      </form>
    </section>
  );
}
