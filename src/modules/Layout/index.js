import React from "react";
import { RenderRoutes } from "../../Routes/Router.js";

import Header from './Header';

const MainLayout = props =>{
    return (
      <div
      >
        <header>
          <Header/>
        </header>
        <section>
          {/* render all pages under the same header */}
          <RenderRoutes />
        </section>
      </div>
    );
}

export default MainLayout;
