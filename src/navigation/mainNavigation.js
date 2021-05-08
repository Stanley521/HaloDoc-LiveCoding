import React, { useEffect } from 'react';
import Route from './route';
import MainHeader from '../components/MainHeader';
import { BrowserRouter as Router, Switch, Redirect, Link } from 'react-router-dom';
// import {
//     BrowserRouter as Router,
// } from 'react-router-dom'

import ProductsPage from '../pages/products/productsPage';
import ProductPage from '../pages/product/productPage';
import history from './browserHistory';
export const homePage = '/home';

function MainNavigation(props) {
    const [mount, setMount] = React.useState(false);
    useEffect(() => {
        setMount(true);
    }, [])

    return (
        // <Router>
        //     <div>
        //         <nav>
        //             <ul>
        //                 <li>
        //                     <Link to="/">Home</Link>
        //                 </li>
        //                 <li>
        //                     <Link to="/about">About</Link>
        //                 </li>
        //                 <li>
        //                     <Link to="/users">Users</Link>
        //                 </li>
        //             </ul>
        //         </nav>

        //         {/* A <Switch> looks through its children <Route>s and
        //     renders the first one that matches the current URL. */}
        //         <Switch>
        //             <Route path="/about">
        //                 about
        //             </Route>
        //             <Route path="/users">
        //                 users
        //             </Route>
        //             <Route path="/">
        //                 home
        //             </Route>
        //         </Switch>
        //     </div>
        // </Router>
        <div>
            <MainHeader />
            <Switch>
                <Route path={homePage} exact component={ProductsPage} notPrivate />
                <Route path='/product/:productId' exact component={ProductPage} notPrivate />
                <Redirect to={homePage} />
            </Switch>
        </div>
    )
}

export default MainNavigation;