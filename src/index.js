import React, { Suspense } from "react";
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';
import { BrowserRouter } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "react-toastify/dist/ReactToastify.css";

import Spinner from './modules/Shared/DataLoading/index.js' 

ReactDOM.render(
    <BrowserRouter>
      <Suspense fallback={<Spinner/>}>
        <App />
      </Suspense>
    </BrowserRouter>,
  document.getElementById("root")
);

serviceWorker.unregister();
