import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import { Box, Typography } from "@material-ui/core";
import categotyApi from "api/categotyAPI";
import { makeStyles } from "@material-ui/styles";

const useStyles = makeStyles((theme) => ({
  root: {
    padding: "20px",
  },

  menu: {
    padding: 0,
    margin: 0,
    listStyleType: "none",

    "& > li": {
      marginTop: "10px",
      transition: "all .25s",

      "&:hover": {
        color: "blue",

        cursor: "pointer",
      },
    },
  },
}));

FilterByCategory.propTypes = {
  onChange: PropTypes.func,
  categoryList: PropTypes.array
};

function FilterByCategory({ onChange, categoryList }) {
  const classes = useStyles();

 

  const handleCategoryOnclick = (category) => {
    if (onChange) {
      onChange(category.id);
    }
  };

  return (
    <Box className={classes.root}>
      <Typography variant="subtitle2">DANH MUC SAN PHAM</Typography>

      <ul className={classes.menu}>
        {categoryList.map((category) => (
          <li key={category.id} onClick={() => handleCategoryOnclick(category)}>
            <Typography variant="body2">{category.name}</Typography>
          </li>
        ))}
      </ul>
    </Box>
  );
}

export default FilterByCategory;
