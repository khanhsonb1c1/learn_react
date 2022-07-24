// Trang này hiển thị danh sách sản phẩm

import React, { useEffect, useMemo, useState } from "react";
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
import FilterViewer from "../components/FilterViewer";
import { useHistory } from "react-router-dom";

import queryString from "query-string";
import { useLocation } from "react-router-dom";
import { Sort } from "@material-ui/icons";
import categotyApi from "api/categotyAPI";

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

  const history = useHistory();

  const location = useLocation();

  const [categoryList, setCategoryList] = useState([]);


  const queryParams = useMemo(() => {
    const params = queryString.parse(location.search);

    return {
      ...params,
      _page: Number.parseInt(params._page) || 1,
      _limit: Number.parseInt(params._limit) || 12,
      _sort: params._sort || "salePrice:ASC",
      isPromotion: params.isPromotion === "true",
      isFreeShip: params.isFreeShip === "true",
    };
  }, [location.search]);

  const [productList, setProductList] = useState([]);

  const [pagination, setPagination] = useState({
    limit: 12,
    total: 10,
    page: 1,
  });

  const [loading, setLoading] = useState(true);

  //============================================================================

  useEffect(() => {
    (async () => {
      try {
        const { data, pagination } = await productApi.getAll(queryParams);
        setProductList(data);
        setPagination(pagination); // cập nhật luôn panigation
        // get API, sau đó có dữ liệu thì vất vào product List, ở dưới sẽ gọi và đưa dữ liệu render ra menu danh
        // sách sản phẩm
      } catch (error) {
        console.log("fail to fetch product list: ", error);
      }

      setLoading(false);
    })();
  }, [queryParams]); // mỗi lần fillers thay đổi sẽ lấy lại danh sách sản phẩm

  useEffect(() => {
    (async () => {
      try {
        const list = await categotyApi.getAll();

        setCategoryList(
          list.map((x) => ({
            // lay id va name trong respon
            id: x.id,
            name: x.name,
          }))
        );
      } catch (error) {
        console.log("failed to fetch categoty list", error);
      }
    })();
  }, []);

  const handleOnChange = (e, page) => {
    const filters = {
      ...queryParams,
      _page: page,
    };
  };

  const handleSortChange = (newSortValue) => {
    const filters = {
      ...queryParams,
      _sort: newSortValue,
    };
  };

  const handleFiltersChange = (newFilters) => {
    const filters = {
      ...queryParams,
      ...newFilters,
    };

    history.push({
      pathname: history.location.pathname,
      search: queryString.stringify(filters),
    });
  };

  const setNewFilters = (newFilters) => {
    history.push({
      pathname: history.location.pathname,
      search: queryString.stringify(newFilters),
    });
  };

  //=======================================================================

  return (
    <Box>
      <Container>
        <Grid container spacing={1}>
          <Grid item className={classes.left}>
            <Paper elevation={0}>
              <ProductFilter
                filters={queryParams}
                onChange={handleFiltersChange}
                categoryList={categoryList}
              />
            </Paper>
          </Grid>

          <Grid item className={classes.right}>
            <Paper elevation={0}>
              <ProductSort
                currentSort={queryParams._sort}
                onChange={handleSortChange}
              />

              <FilterViewer categoryList={categoryList} filters={queryParams} onChange={setNewFilters} />

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
