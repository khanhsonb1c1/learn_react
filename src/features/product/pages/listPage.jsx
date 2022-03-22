import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import { Box, Container, Grid, makeStyles, Paper, Typography } from "@material-ui/core";
import productApi from "api/productAPI";
import ProductSkeletonList from "../components/productSkeletonList";
import ProductList from "../components/productList";


const useStyles = makeStyles((theme) => ({
  root: {},

  left: {
    width: "250px",
  },

  right: {
    flex: "1 1 0",
  },
}));

function ListPage(props) {
  const classes = useStyles();
  const [productList, setProductList] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    (async () => {
      try {
        const { data } = await productApi.getAll({ _page: 1, _limit: 10 });
        setProductList(data);
        // get API, sau đó có dữ liệu thì vất vào product List, ở dưới sẽ gọi và đưa dữ liệu render ra menu danh 
        // sách sản phẩm
      } catch (error) {
        console.log("fail to fetch product list: ", error);
      }

       setLoading(false);
    })();
  }, []);

  return (
    <Box>
      <Container>
        <Grid container spacing={1}>
          <Grid item className={classes.left}>
            <Paper elevation={0}>left column</Paper>
          </Grid>

          <Grid item className={classes.right}>
            <Paper elevation={0}>
               { loading ? <ProductSkeletonList/>
               : <ProductList data={productList}/>}
              
            </Paper>
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
}

export default ListPage;
