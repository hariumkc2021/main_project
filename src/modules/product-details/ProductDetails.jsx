import { Button, TextField } from '@material-ui/core';
import React, { useContext } from 'react';
import { useHistory } from 'react-router-dom';
import { AppContext } from '../../contexts/AppContext';
import "./ProductDetails.css";
import ControlPointIcon from '@material-ui/icons/ControlPoint';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
const ProductDetails = (props) => {
    const { selectedProduct } = useContext(AppContext);
    const { setCartItemsfn } = useContext(AppContext);
    const { cartItems } = useContext(AppContext);
    const addToCart = (item) => {
        //  item.id = Math.floor(Math.random() * 10) + Math.floor(Math.random() * 100) + Math.floor(Math.random() * 1000);
        // let nums = cartItems.map((ele) => ele.id)
        item.id = cartItems.length > 0 ? Math.max(...cartItems.map((ele) => ele.id)) + 1 : 1
        setCartItemsfn([...cartItems, item]);
        toast.success("Added to cart", { hideProgressBar: false });
    }
    return (
        <>
            <ToastContainer position="bottom-center" autoClose={2000} />
            <div className="pd-container">
                <img className="pd-img" src={selectedProduct['image']}></img>
                <div className="pd-details">
                    <div className="pd-name" > {selectedProduct['product_name']}</div>
                    <div>
                        <span>M.R.P :<span style={{ "color": "red", "fontSize": "30px" }}>{"₹" + selectedProduct['unit_price']}</span>(Inclusive of all taxes)</span>
                    </div>
                    <Button onClick={e => addToCart({ ...selectedProduct })} color="primary" variant="contained" startIcon={<ControlPointIcon />}>Add to cart</Button>
                </div>
            </div>
        </>
    )
}

export default ProductDetails;