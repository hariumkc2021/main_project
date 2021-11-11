import React, { Suspense, useContext, lazy } from 'react';
import { Redirect, Route, Switch } from 'react-router-dom';
import { AppContext } from '../contexts/AppContext';
const Login = lazy(() => import('./login/Login'));
const ProductList = lazy(() => import('./products-list/ProductsList'));
const ProductDetails = lazy(() => import('./product-details/ProductDetails'));
const Cart = lazy(() => import('./cart/Cart'))
const CheckOut = lazy(() => import('./Check-out/CheckOut'))

const Layout = (props) => {
    const { user } = useContext(AppContext);
    const validateAccess = (props) => {
        console.log("user", user)
        return user ? (props) : (<Redirect to="/auth" />);
    }
    const authValidate = (props) => {
        return user ? (<Redirect to="/productList" />) : (<Login />);
    }
    return (
        <Suspense
            fallback={<div className="page-loading-section"></div>}
        >
            <Switch>
                <Route path="/auth" render={(props) => authValidate(<Login />)} />
                <Route path="/productList" render={(props) => validateAccess(<ProductList />)} />
                <Route path="/productDetails" render={(props) => validateAccess(<ProductDetails />)} />
                <Route path="/Cart" render={(props) => validateAccess(< Cart />)} />
                <Route path="/CheckOut" render={(props) => validateAccess(< CheckOut />)} />
                <Route path="/" render={() => <Redirect to="/auth" />} />
                {/* <Route path="*" component={NotFound} /> */}
            </Switch>
        </Suspense>
    )
}

export default Layout;