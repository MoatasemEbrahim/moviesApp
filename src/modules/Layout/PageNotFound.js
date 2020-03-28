import React from "react";
import Button from "@material-ui/core/Button";
import { Link } from "react-router-dom";

import CustomStyles from "./Layout.module.scss";

const PageNotFound = props => {
  return (
    <div className={`${CustomStyles.pageNotFound} text-center`}>
      <h1>Ooops!</h1>
      <h3>404 - Page not found</h3>
      <p>
        The page you are looking for might have been removed, had it's name
        changed or is temporarily unacilable
      </p>
      <span>
        <Button
          className="m-1"
          aria-controls="simple-menu"
          aria-haspopup="true"
          variant="contained"
          color="primary"
        >
          <Link className={CustomStyles.toHomeLink} to="/">
            Go to homepage
          </Link>
        </Button>
      </span>
    </div>
  );
};

export default PageNotFound;
