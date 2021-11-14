import React, { Suspense, useContext, lazy } from 'react';
import { Redirect, Route, Switch } from 'react-router-dom';
import { AppContext } from '../contexts/AppContext';
const Login = lazy(() => import('./login/Login'));
const ProductList = lazy(() => import('./products-list/ProductsList'));
const ProductDetails = lazy(() => import('./product-details/ProductDetails'));
const Cart = lazy(() => import('./cart/Cart'))
const CheckOut = lazy(() => import('./Check-out/CheckOut'))
const Enrollments =lazy(()=> import('./Enrollments/Enrollment'))

const Layout = (props) => {
    const { user } = useContext(AppContext);
    const userLs = localStorage.getItem('user');
    const validateAccess = (props) => {
        console.log("user", user)
        return (userLs) ? (props) : (<Redirect to="/auth" />);
    }
    const authValidate = (props) => {
        return userLs ? (<Redirect to="/productList" />) : (<Login />);
    }
    const validateInterAccess=(props)=>{
        return user ? (props):(<Redirect to="/productList" />)  ;
    }
    return (
        <Suspense
            fallback={<div className="page-loading-section"></div>}
        >
            <Switch>
                <Route path="/auth" render={(props) => authValidate(<Login />)} />
                <Route path="/productList" render={(props) => validateAccess(<ProductList />)} />
                <Route path="/productDetails" render={(props) => validateInterAccess(<ProductDetails />)} />
                <Route path="/Cart" render={(props) => validateInterAccess(< Cart />)} />
                <Route path="/CheckOut" render={(props) => validateInterAccess(< CheckOut />)} />
                <Route path="/enrollments" render={(props)=>validateAccess(<Enrollments />)} />
                <Route path="/" render={() => <Redirect to="/auth" />} />
                {/* <Route path="*" component={NotFound} /> */}
            </Switch>
        </Suspense>
    )
}

export default Layout;