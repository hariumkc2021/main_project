import React, { useContext } from 'react';
import './Product-card.css';
import { useHistory } from 'react-router-dom';
import { AppContext } from '../contexts/AppContext';



function ProductCard(props) {
    const history = useHistory();
    const { setSelectedProductfn } = useContext(AppContext)
    const { user } = useContext(AppContext);
    const { setUser } = useContext(AppContext);
    const onProductSelect = (item) => {
        setSelectedProductfn(item);
        const userLs = localStorage.getItem('user');
        if(userLs){
            setUser(JSON.stringify(userLs));
        }
        history.push('productDetails');
    }


    return (
        <div className="card-container" onClick={e => onProductSelect(props.data)}>
            <img className="card-img" src={props.data.img}></img>
            <span className="card-name" >{props.data.name}</span>
            <span className="card-price">{ props.data.price}<span className="cost-reduce"> {(Math.floor(Math.random() * 10) + Number(props.data.price.replace('$','')))+'$'}</span></span>
            <span>{props.data.Duration}</span>
            <span>{props.data.lessons} videos</span>
        </div>
    );
}

export default ProductCard;
