import React, { useContext, useEffect, useState } from 'react';
import './ProductList.css';
import ProductCard from '../../components/Product-card.jsx';
import { AppContext } from '../../contexts/AppContext';
import { Button, TextField } from '@material-ui/core';

function ProductList() {
    const { productList } = useContext(AppContext);
    const [filteredItems, setFilteredItems] = useState(productList)
    useEffect(() => {

    }, []);
    const Search = (e) => {
        // console.log("ee", e.currentTarget.value)
        let value = e.currentTarget.value.toLowerCase();
        let filtArry = [];
        productList.forEach(element => {
            let text = element.product_name.toLowerCase() + element.category.toLowerCase();
            if (text.indexOf(value) >= 0) {
                filtArry.push(element)
            }
        });
        setFilteredItems(filtArry);
    }
    return (
        <div className="product-container">
            < TextField placeholder="category/product" label="Search" onChange={e => Search(e)} name="email" variant="outlined" />
            <div className="product-list-container">
                {filteredItems.map((ele) =>
                    <ProductCard key={ele.product_id} data={ele} ></ProductCard>
                )}
            </div>
        </div>
    );
}

export default ProductList

