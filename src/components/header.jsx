

import React, { useContext } from 'react';
import './header.css';
import { Button } from '@material-ui/core';
import AddShoppingCartIcon from '@material-ui/icons/AddShoppingCart';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import SubscriptionsIcon from '@material-ui/icons/Subscriptions';
import { AppContext } from '../contexts/AppContext';
import { useHistory } from 'react-router-dom';
import ReceiptLongIcon from '@material-ui/icons/Receipt';

const Login = (props) => {
    const history = useHistory();
    //const { user } = useContext(AppContext);
    const userLs = localStorage.getItem('user');
    const { setUser } = useContext(AppContext)
    const { cartItems } = useContext(AppContext);

    const Logout = () => {
        history.push('/auth');
        setUser(null);
        localStorage.removeItem('user');
    }
    const onCart = () => {
        if (cartItems.length > 0) {
            history.push('Cart')
        }
    }
    return (
        <>
            <div className="header-container">
                <img src="https://ucarecdn.com/f62c7374-7923-4535-8cc0-0a3bea547c7d/-/preview/100x100/"></img>
                <span className="header-name">UMKC Fitness Center</span>
                {userLs ? <span class="header-btns">
                   <Button onClick={e=>history.push('receipe')} variant="contained" color="default" startIcon={<ReceiptLongIcon />}>RECEIPES</Button>  
                    <Button onClick={e=>history.push('enrollments')} variant="contained" color="default" startIcon={<SubscriptionsIcon />}>STREAM</Button>  
                    <Button onClick={e => onCart()} variant="contained" color="default" startIcon={<AddShoppingCartIcon />}>{cartItems.length}</Button>
                    <Button onClick={Logout} variant="contained" color="default" startIcon={<ExitToAppIcon />}>Logout</Button>   
                </span> : null}
            </div >

        </>
    )
}

export default Login;