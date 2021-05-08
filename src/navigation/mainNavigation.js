import React from 'react';
import MainHeader from '../components/MainHeader';
import { BrowserRouter as Router, Switch, Route, Redirect } from 'react-router-dom';
import ProductsPage from '../pages/products/productsPage';
import ProductPage from '../pages/product/productPage';
export const homePage = '/home';

function MainNavigation() {
    return (
        <Router>
            <MainHeader />
            <Switch>
                <Route path={homePage} component={ProductsPage} notPrivate />
                <Route path='/product/:productId' component={ProductPage} notPrivate />
                <Redirect to={homePage} />
            </Switch>
        </Router>

    )
}

export default MainNavigation;