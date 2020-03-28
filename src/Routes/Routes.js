import React from "react";

const Home = React.lazy(() =>
  import('../modules/Pages/Home/index.js')
);
const Favourite = React.lazy(()=>
import('../modules/Pages/Favourite/index.js'))

//every object will be a route and there is no nested object, just nested path
const Routes = [
  {
    path: "/",
    key: "ROOT",
    exact: true,
    component: Home
  },
  {
    path: "/favourite",
    key: "FAVOURITE",
    exact: true,
    component: Favourite
  }
];

export default Routes;