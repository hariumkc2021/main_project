import React, { useContext } from 'react';
import './CartCard.css';
//import { useHistory } from 'react-router-dom';
//import { AppContext } from '../contexts/AppContext';
import DeleteIcon from '@material-ui/icons/Delete';
import Button from '@material-ui/core/Button';
import { AppContext } from '../../contexts/AppContext';
import { ToastContainer, toast } from 'react-toastify';

function CartCard(props) {
    // const history = useHistory();
    const { setCartItemsfn } = useContext(AppContext);
    const { cartItems } = useContext(AppContext);
    const deleteFromCart = (item) => {
        let modArray = cartItems.filter((ele) => {
            return ele.id != item.id;
        })
        setCartItemsfn(modArray);
        toast.warning("Removed from cart");
    }

    return (
        <>
            <ToastContainer position="bottom-center" autoClose={3000} />
            <div className="crtcd-container">
                <img style={{ "height": "100%", "width": "30%" }} src={props.data.image}></img>
                <div class="crtcd-details">
                    <div class="crtcd-rate">
                        <span style={{ "fontSize": "30px", "fontWeight": "300" }} >{props.data.product_name}</span>
                        <span style={{ "fontSize": "30px" }}>{"₹" + props.data.unit_price}</span>
                    </div>
                    <span style={{ "color": "green" }}>In Stock</span>
                    <div><Button onClick={e => deleteFromCart(props.data)} variant="contained" color="secondary" startIcon={<DeleteIcon />}> Remove From Cart </Button></div>
                </div>
            </div>
        </>
    );
}

export default CartCard;

