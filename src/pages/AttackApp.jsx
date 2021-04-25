import React, { useEffect, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { loadAttacks } from './../store/actions/attackAction';
import { AttackList } from '../cmps/AttackList';
import Loading from './../cmps/Loading';
import { PaginationMatirial } from './../cmps/Pagination';
import { Filter } from '../cmps/Filter';

export function AttackApp() {
  const { attacks, filterBy, dataSource } = useSelector(state => state.attackModule);
  const dispatch = useDispatch();
  const itemsPerPage = 7;
  const [page, setPage] = useState(1);
  const [noOfPages, setNoOfPages] = useState(10);

  useEffect(() => {
    load();
  }, [filterBy])

  useEffect(() => {
    onSetNumberOfPages();
  }, [attacks])

  const load = () => {
    if (dataSource) return;
    dispatch(loadAttacks(filterBy))
  }

  const onSetNumberOfPages = () => {
    if (!attacks) return;
    setNoOfPages(Math.ceil(attacks.length / itemsPerPage))
  }

  const onChangePage = (event, value) => {
    setPage(value);
  }


  const onGetAttacksForDisplay = () => {
    return attacks.slice((page - 1) * itemsPerPage, page * itemsPerPage)
  }


  if (!attacks) return <section className="loading-container">
    <Filter dataSource={dataSource} />
    <Loading />
  </section>
  return (
    <section className="app-container max-layout">
      <Filter dataSource={dataSource} />
      <h1>Attacks list</h1>
      <AttackList attacks={onGetAttacksForDisplay()} />
      <div className="pagination-container">
        <PaginationMatirial noOfPages={noOfPages} page={page} onChangePage={onChangePage} />
      </div>
    </section>
  )
}
