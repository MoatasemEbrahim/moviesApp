import React from "react";
import styles from "./DataLoading.module.scss";
import CircularProgress from "@material-ui/core/CircularProgress";

const DataLoading = props => {
  return (
    <div className={styles.spinner}>
      <CircularProgress />
    </div>
  );
};

export default DataLoading;