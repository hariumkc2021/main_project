import React, { useContext } from 'react';
import './Cart.css';
import { useHistory } from 'react-router-dom';
import { AppContext } from '../../contexts/AppContext';
import CartCard from '../../components/Cart-card/CartCard'
import { Button } from '@material-ui/core';
import { ToastContainer, toast } from 'react-toastify';

function Cart(props) {
    const history = useHistory();
    const { cartItems } = useContext(AppContext);
    const getTotal = (array) => {
        let total = 0;
        array.forEach(element => {
            total += Number(element.unit_price)
        });
        return total;
    }
    const proceedTOPay = () => {
        if (cartItems.length > 0) {
            history.push('/CheckOut')
        } else {
            toast.warning("Cart is empty")
        }
    }

    return (
        <>
            <ToastContainer position="bottom-center" autoClose={2000} />
            <div className="cards-container" >
                <div className="cart-container">
                    {cartItems.map((item) => <CartCard key={item.id} data={item}></CartCard>)}
                </div>
                <div class="cart-subtot">
                    <span>Subtotal({cartItems.length} ) :₹<span style={{ "color": "red", "fontSize": "30px" }}> {getTotal(cartItems)}</span></span>
                    <Button onClick={e => proceedTOPay()} variant="contained" color="primary" type="submit">Proceed to pay</Button>
                </div>
            </div >
        </>
    );
}

export default Cart;
