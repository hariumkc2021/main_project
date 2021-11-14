import React, { useContext, useState } from 'react';
import './CheckOut.css';
import { Button } from '@material-ui/core';
import { ToastContainer, toast } from 'react-toastify';
import { useHistory } from 'react-router-dom';
import LoadingOverlay from 'react-loading-overlay';
import { AppContext } from '../../contexts/AppContext';
import axios from 'axios';


function CheckOut(props) {
    const history = useHistory();
    const { setCartItemsfn } = useContext(AppContext);
    const [enabSpinner, setSinner] = useState(false);
    const userLs = localStorage.getItem('user');
    const userData=JSON.parse(userLs);
    const { cartItems } = useContext(AppContext);
    const placeOrder = () => {
        setSinner(true);
        axios.put(`https://umkc-project.herokuapp.com/enrollments?userName=${userData.data.userName}`,cartItems)
        .then(function (response) {
            console.log("response",response);
        })
        .catch(function (error) {
          console.log(error);
        })
        setTimeout(() => {
            history.go(-3)
            setCartItemsfn([]);
            setSinner(false);
        }, 4000)
        toast.success("Order placed")
    }
   
    let totalAmount
    const getTotal = (array) => {
        let total = 0;
        array.forEach(element => {
            total += Number(element.price.replace('$',''))
        });
        totalAmount = total
        return total;
    }

    return (
        <>
            {
                enabSpinner ? <LoadingOverlay
                    active={true}
                    spinner
                    text='A Moments of Delivered on Time'
                >
                </LoadingOverlay> : null
            }
            <ToastContainer position="bottom-center" autoClose={3000} />
            <div className="chot-Container">
                <div className="chot-details">
                    <div style={{ "fontSize": "25px", "borderBottom": "solid beige" }}>Order Summary</div>
                    <div class="sub-details" >
                        <span>Items:</span>
                        <span>₹{getTotal(cartItems)}</span>
                    </div>
                    <div class="sub-details" style={{ "borderBottom": "solid beige" }} >
                        <span>Delivery:</span>
                        <span>15$</span>
                    </div>
                    <div class="sub-details" style={{ "color": "red", "fontSize": "23px", "borderBottom": "solid beige" }}>
                        <span>Order Total</span>
                        <span>₹{totalAmount + 15}</span>
                    </div>
                    <div style={{ "textAlign": "center" }}>
                        <Button onClick={e => placeOrder()} variant="contained" color="primary" type="submit">Place your order</Button>
                    </div>
                </div>
            </div>
        </>
    );
}

export default CheckOut;

