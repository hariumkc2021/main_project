import React, { useContext } from 'react';
import './Product-card.css';
import { useHistory } from 'react-router-dom';
import { AppContext } from '../contexts/AppContext';




function ProductCard(props) {
    const history = useHistory();
    const { setSelectedProductfn } = useContext(AppContext)

    const onProductSelect = (item) => {
        setSelectedProductfn(item);
        history.push('productDetails');
    }


    return (
        <div className="card-container" onClick={e => onProductSelect(props.data)}>
            <img className="card-img" src={props.data.image}></img>
            <span className="card-name" >{props.data.product_name}</span>
            <span className="card-price">{"₹" + props.data.unit_price}<span className="cost-reduce"> {"₹" + (Math.floor(Math.random() * 10000) + Number(props.data.unit_price))}</span></span>
        </div>
    );
}

export default ProductCard;
