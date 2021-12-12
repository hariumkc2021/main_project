import React, { useContext, useState } from 'react';
import './CheckOut.css';
import { Button } from '@material-ui/core';
import { ToastContainer, toast } from 'react-toastify';
import { useHistory } from 'react-router-dom';
import LoadingOverlay from 'react-loading-overlay';
import { AppContext } from '../../contexts/AppContext';
import axios from 'axios';
import useRazorpay, { RazorpayOptions } from "react-razorpay";


function CheckOut(props) {
    const history = useHistory();
    const { setCartItemsfn } = useContext(AppContext);
    const [enabSpinner, setSinner] = useState(false);
    const userLs = localStorage.getItem('user');
    const userData=JSON.parse(userLs);
    const { cartItems } = useContext(AppContext);
    const Razorpay = useRazorpay();
    let totalAmount;
   


    const placeOrder = async () => {
        let orderObj=await axios.post(`http://localhost:5001/orders`,{amount:totalAmount+15});
        console.log("orderObj",orderObj);
        const options = {
            key: "rzp_test_kjMNJwg5AL3w2f", // Enter the Key ID generated from the Dashboard
            amount: "50000", // Amount is in currency subunits. Default currency is INR. Hence, 50000 refers to 50000 paise
            currency: "USD",
            name: "Acme Corp",
            description: "Test Transaction",
            image: "https://example.com/your_logo",
            order_id: orderObj.data.order_id, //This is a sample Order ID. Pass the `id` obtained in the response of createOrder().
            handler: function (response) {
                axios.put(`https://umkc-project.herokuapp.com/enrollments?userName=${userData.data.userName}`,cartItems)
                .then(function (response) {
                   console.log("response",response);
                   setSinner(true);
                   setTimeout(() => {
                        history.go(-3);
                        setCartItemsfn([]);
                        setSinner(false);
                    }, 4000)
                   })
              .catch(function (error) {
                 console.log(error);
                 })
            //   alert(response.razorpay_payment_id);
            //   alert(response.razorpay_order_id);
            //   alert(response.razorpay_signature);
            },
            prefill: {
              name: "Piyush Garg",
              email: "piyushgarg.dev@gmail.com",
              contact: "9999999999",
            },
            notes: {
              address: "Razorpay Corporate Office",
            },
            theme: {
              color: "#3399cc",
            },
          };
        
          const rzp1 = new Razorpay(options);
        
          rzp1.on("payment.failed", function (response) {
            // alert(response.error.code);
            // alert(response.error.description);
            // alert(response.error.source);
            // alert(response.error.step);
            // alert(response.error.reason);
            // alert(response.error.metadata.order_id);
            // alert(response.error.metadata.payment_id);
          });
        
          rzp1.open();
         
        // setSinner(true);
        // axios.put(`https://umkc-project.herokuapp.com/enrollments?userName=${userData.data.userName}`,cartItems)
        // .then(function (response) {
        //     console.log("response",response);
        // })
        // .catch(function (error) {
        //   console.log(error);
        // })
        // setTimeout(() => {
        //     history.go(-3)
        //     setCartItemsfn([]);
        //     setSinner(false);
        // }, 4000)
        // toast.success("Order placed")
    }
   

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
                    text='At-home health & fitness made easy'
                >
                </LoadingOverlay> : null
            }
            <ToastContainer position="bottom-center" autoClose={3000} />
            <div className="chot-Container">
                <div className="chot-details">
                    <div style={{ "fontSize": "25px", "borderBottom": "solid beige" }}>Order Summary</div>
                    <div class="sub-details" >
                        <span>Items:</span>
                        <span>${getTotal(cartItems)}</span>
                    </div>
                    <div class="sub-details" style={{ "borderBottom": "solid beige" }} >
                        <span>Tax:</span>
                        <span>$15</span>
                    </div>
                    <div class="sub-details" style={{ "color": "red", "fontSize": "23px", "borderBottom": "solid beige" }}>
                        <span>Order Total</span>
                        <span>${totalAmount + 15}</span>
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

