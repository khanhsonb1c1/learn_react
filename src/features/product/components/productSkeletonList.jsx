import React from "react";
import PropTypes from "prop-types";
import { Box, Grid } from "@material-ui/core";
import { Skeleton } from "@material-ui/lab";

// show menu bang skeleton

ProductSkeletonList.propTypes = {
  length: PropTypes.number,
};

ProductSkeletonList.defaultProps = {
  length: 8,
};

function ProductSkeletonList({ length }) {
  return (
    <Box>
      <Grid container>
        {Array.from(new Array(length)).map((x, index) => (
          <Grid item key={index} xs={12} sm={6} lg = {3}>   {/* hien thi tren nhuwng thiet bi khac */}
        
            <Box padding={1}>
              <Skeleton variant="rect" width="100%" height={200} />
              <Skeleton />
              <Skeleton width="60%" />
            </Box>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
}

export default ProductSkeletonList;
