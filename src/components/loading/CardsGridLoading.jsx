import React from "react";
import { Grid } from "@mui/material";
import PropTypes from "prop-types";
import CardLoading from "./CardLoading";

CardsGridLoading.propTypes = {
  count: PropTypes.number,
  xs: PropTypes.number,
};
export default function CardsGridLoading({ count, xs }) {
  return (
    <Grid container spacing={3}>
      {new Array(count).fill(0).map(() => (
        <Grid item xs={xs}>
          <CardLoading height={50} />
        </Grid>
      ))}
    </Grid>
  );
}
