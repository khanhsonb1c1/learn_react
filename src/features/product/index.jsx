import React from 'react';
import PropTypes from 'prop-types';

import ListPage from './pages/listPage';
import { useRouteMatch } from 'react-router-dom';
import { Switch } from 'react-router-dom';
import { Route } from 'react-router-dom';
import { Box } from '@material-ui/core';



function ProductFeature(props) {

    const match = useRouteMatch();



    return (
        <Box pt={4}>
            <Switch>
                <Route path={match.url} exact component = {ListPage}/>
            </Switch>
        </Box>
    );
}

export default ProductFeature;