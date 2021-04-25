import { Route, Switch } from 'react-router';
import './assets/styles/main.scss';
import { routes } from './routes';
import { Header } from './cmps/Header';
import { useEffect } from 'react';
import { loadAttacks } from './store/actions/attackAction';
import { useDispatch, useSelector } from 'react-redux';

export function RootCmp() {
  const { dataSource } = useSelector(state => state.attackModule);
  const dispatch = useDispatch();
  useEffect(() => {
    load();
  }, [])

  const load = () => {
    if(dataSource) return;
    dispatch(loadAttacks());
  }

  return (
    <div className="app">
      <Header />
      <Switch>
        {routes.map((route) => (
          <Route
            exact
            key={route.path}
            component={route.component}
            path={route.path}
          />
        ))}
      </Switch>
    </div>
  );
}
