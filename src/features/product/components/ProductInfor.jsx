import React from 'react';
import PropTypes from 'prop-types';
import { Box, makeStyles, Typography } from '@material-ui/core';
import { formatPrice } from 'utils';

ProductInfor.propTypes = {
    product: PropTypes.object,
    
};


const useStyles = makeStyles((theme) => ({
    root: {
        paddingBottom: "20px",
        borderBottom: "1px solid #E6E6FA",

    },
    
    description: {
        margin: "20px 0px",
    },

    priceBox: {

        padding: "20px",
        backgroundColor: "#E6E6FA",
        

    },

    salePrice: {
        fontSize:"25px",
        fontStyle: "oblique",
        fontWeight: "bold",
        marginRight: "30px", 
    },

    originalPrice: {
        marginRight: "20px", 
        textDecoration: 'line-through',
    },

    promotionPercent: {},

  
  }));
  

function ProductInfor({ product = {}    }) {

    const classes = useStyles();

    const { name, shortDescription, salePrice, originalPrice, promotionPercent } = product;

    
    return (
        <Box className={classes.root}>
            <Typography component="h1" variant="h4"> {name} </Typography>

            <Typography variant='body2' className='classes.description'> {shortDescription}</Typography>

            <Box className={classes.priceBox}>
                <Box component="span" className={classes.salePrice}> {formatPrice(salePrice)} </Box>

                    {promotionPercent > 0 && (
                        <>
                            <Box component="span" className={classes.originalPrice}> {formatPrice(originalPrice)} </Box>
                            <Box component="span" className={classes.promotionPercent}> {`-${promotionPercent}%`} </Box>
                        
                        </>
                    ) }

                
            </Box>

            
        </Box>
    );
}

export default ProductInfor;