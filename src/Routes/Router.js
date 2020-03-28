import React from "react";
import { Route, Switch } from "react-router-dom";
import routes from './Routes.js'
import PageNotFound from '../modules/Layout/PageNotFound'

export function RenderRoutes() {
  return (
    <Switch>
      {routes.map(route => (
        <Route
          key={route.key}
          path={route.path}
          exact={route.exact}
          render={props => <route.component {...props} />}
        />
      ))}
      <Route component={PageNotFound} />
    </Switch>
  );
}
