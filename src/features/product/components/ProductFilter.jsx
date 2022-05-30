import React from "react";
import PropTypes from "prop-types";
import { Box } from "@material-ui/core";
import FilterByCategory from "./Filters/FilterByCategory";
import FilterByPrice from "./Filters/FilterByPrice";

ProductFilter.propTypes = {
  filters: PropTypes.object.isRequired,
  onChange: PropTypes.func,
};

function ProductFilter({ filters, onChange }) {
  const handleCategoryChange = (newCategoryId) => {
    if (!onChange) return; // neu k co onChange => k lam j ca

    const newFilters = {
      // ...filters,
      "category.id": newCategoryId,
    };

    onChange(newFilters);
  };

  const handlePriceChange = (values) => {
    if (onChange) onChange(values);
  };

  return (
    <Box>
      <FilterByCategory onChange={handleCategoryChange} />
      <FilterByPrice onChange={handlePriceChange} />
    </Box>
  );
}

export default ProductFilter;
