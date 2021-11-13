import { Button, TextField } from '@material-ui/core';
import React, { useContext,useState,useEffect } from 'react';
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
    const [disableBtn,setDisableBtn]=useState(false);
    
    useEffect(() => {
        cartItems.forEach(element => {
           if(element.id==selectedProduct.id){
            setDisableBtn(true);
           }
        });
    },[])

    const addToCart = (item) => {
        setDisableBtn(true);
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
                <img className="pd-img" src={selectedProduct['img']}></img>
                <div className="pd-details">
                    <div className="pd-name" > {selectedProduct['name']}</div>
                    <div>
                        <span><span style={{ "color": "red", "fontSize": "30px" }}>{"₹" + selectedProduct['price']}</span>(Inclusive of all taxes)</span>
                    </div>
                    <Button disabled={disableBtn} onClick={e => addToCart({ ...selectedProduct })} color="primary" variant="contained" startIcon={<ControlPointIcon />}>Add to cart</Button>
                </div>
            </div>
        </>
    )
}

export default ProductDetails;