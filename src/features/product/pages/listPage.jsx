import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import {
  Box,
  Container,
  Grid,
  makeStyles,
  Paper,
  Typography,
} from "@material-ui/core";
import productApi from "api/productAPI";
import ProductSkeletonList from "../components/productSkeletonList";
import ProductList from "../components/productList";
import { Pagination } from "@material-ui/lab";
import ProductSort from "../components/ProductSort";
import ProductFilter from "../components/ProductFilter";

const useStyles = makeStyles((theme) => ({
  root: {},

  left: {
    width: "250px",
  },

  right: {
    flex: "1 1 0",
  },

  pagination: {
    display: "flex",
    flexFlow: "row nowrap",
    justifyContent: "center",
    marginTop: "50px",
    paddingBottom: "30px",
  },
}));

function ListPage(props) {
  const classes = useStyles();
  const [productList, setProductList] = useState([]);
  const [pagination, setPagination] = useState({
    limit: 12,
    total: 10,
    page: 1,
  });
  const [loading, setLoading] = useState(true);
  const [fillters, setFillters] = useState({
    _page: 1,
    _limit: 12,
    _sort: "salePrice:ASC",
  });

  useEffect(() => {
    (async () => {
      try {
        const { data, pagination } = await productApi.getAll(fillters);
        setProductList(data);
        setPagination(pagination); // cập nhật luôn panigation
        // get API, sau đó có dữ liệu thì vất vào product List, ở dưới sẽ gọi và đưa dữ liệu render ra menu danh
        // sách sản phẩm
      } catch (error) {
        console.log("fail to fetch product list: ", error);
      }

      setLoading(false);
    })();
  }, [fillters]); // mỗi lần fillers thay đổi sẽ lấy lại danh sách sản phẩm

  const handleOnChange = (e, page) => {
    //cập nhật lại filler khi số page thay đổi
    setFillters((prevFilters) => ({
      ...prevFilters,
      _page: page,
    }));
  };

  const handleSortChange = (newSortValue) => {
    setFillters((prevFilters) => ({
      ...prevFilters,
      _sort: newSortValue,
    }));
  };


  const handleFiltersChange = (newFilters) => { // khi thay doi
    setFillters((prevFilters) => ({
      ...prevFilters, //sẽ lấy tất cả filter cũ
      ...newFilters, // + thêm filter mới mà tk con báo lên
    }));
  };

  return (
    <Box>
      <Container>
        <Grid container spacing={1}>
          <Grid item className={classes.left}>
            <Paper elevation={0}>

              <ProductFilter filters={fillters} onChange={handleFiltersChange}/>

            </Paper>
          </Grid>

          <Grid item className={classes.right}>
            <Paper elevation={0}>
              <ProductSort
                currentSort={fillters._sort}
                onChange={handleSortChange}
              />

              {loading ? (
                <ProductSkeletonList length={12} />
              ) : (
                <ProductList data={productList} />
              )}

              <Box className={classes.pagination}>
                <Pagination
                  onChange={handleOnChange}
                  count={Math.ceil(pagination.total / pagination.limit)}
                  page={pagination.page}
                  color="primary"
                ></Pagination>
              </Box>
            </Paper>
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
}

export default ListPage;
