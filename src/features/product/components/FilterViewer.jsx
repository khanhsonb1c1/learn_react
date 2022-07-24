import React, { useMemo } from "react";
import PropTypes from "prop-types";
import { Box, Chip } from "@material-ui/core";
import { makeStyles } from "@material-ui/styles";

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    flexFlow: "row wrap",
    alignItems: "center",

    padding: 0,

    margin: "20px 0px",
    listStyleType: "none",

    "& > li": {
      margin: 0,
      padding: "10px",
    },
  },
}));


FilterViewer.propTypes = {
  filters: PropTypes.object,
  onChange: PropTypes.func,
  categoryList: PropTypes.array
};

function FilterViewer({ filters = {}, onChange = null , categoryList}) {
  const classes = useStyles();


  
const FILTER_LIST = [
  {
    id: 1,
    getLabel: () => "Giao hàng miễn phí",
    isActive: (filters) => filters.isFreeShip,
    isVisible: () => true,
    isRemovable: false,
    onRemove: () => {},
    onToggle: (filters) => {
      const newFilters = { ...filters };
      if (newFilters.isFreeShip) {
        delete newFilters.isFreeShip;
      } else {
        newFilters.isFreeShip = true;
      }

      return newFilters;
    },
  },

  {
    id: 2,
    getLabel: () => "Có khuyến mãi",
    isActive: () => true,
    isVisible: (filters) => filters.isPromotion,
    isRemovable: true,
    onRemove: (filters) => {
        const newFilters = {...filters}
        delete newFilters.isPromotion;
        return newFilters;
    },
    onToggle: () => {},
  },

  {
    id: 4,
    getLabel: (filters) => `Loai: ${categoryList.find((item ) => item.id === parseInt(filters['category.id']))?.name}`,
    isActive: () => true,
    isVisible: (filters) => filters['category.id'],
    isRemovable: true,
    onRemove: (filters) => {
        const newFilters = {...filters}
        delete newFilters['category.id'];
        return newFilters;
    },
    onToggle: () => {},
  },

  {
    id: 3,
    getLabel: (filters) => `Từ ${filters.salePrice_gte} đến ${filters.salePrice_lte}`,
    isActive: () => true,
    isVisible: (filters) => Object.keys(filters).includes('salePrice_lte') 
                         && Object.keys(filters).includes('salePrice_gte'),
    isRemovable: true,
    onRemove: (filters) => {
        const newFilters = {...filters}
        delete newFilters.salePrice_lte;
        delete newFilters.salePrice_gte;
        return newFilters;
    },
    onToggle: () => {},
  },

 
];

  const visibleFilters = useMemo(() => {
    console.log('filters', filters)
    return FILTER_LIST.filter((x) => x.isVisible(filters));
  }, [filters])




  return (
    <Box component="ul" className={classes.root}>
      {visibleFilters.map((x) => (
        <li key={x.id}>
          <Chip
            label={x.getLabel(filters)}
            color={x.isActive(filters) ? "primary" : "default"}
            clickable={x.isRemovable ? null : () => {}}
            onClick={
              x.isRemovable
                ? null
                : () => {
                    if (!onChange) return;

                    const newFilters = x.onToggle(filters);
                    onChange(newFilters);
                  }
            }
            onDelete={
              x.isRemovable
                ? () => {
                    if (!onChange) return;

                    const newFilters = x.onRemove(filters);
                    onChange(newFilters);
                  }
                : null
            }
          />
        </li>
      ))}
    </Box>
  );
}

export default FilterViewer;
