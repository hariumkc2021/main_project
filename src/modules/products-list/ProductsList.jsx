import React, { useContext, useEffect, useState } from 'react';
import axios from 'axios';
import './ProductList.css';
import ProductCard from '../../components/Product-card.jsx';
import { AppContext } from '../../contexts/AppContext';
import { Button, TextField } from '@material-ui/core';
import { css } from "@emotion/react";
import ClipLoader from "react-spinners/ClipLoader";
const override = css`
  display: block;
  margin: 0 auto;
  border-color: red;
`;
function ProductList() {
    //const { productList, } = useContext(AppContext);
    let [loading, setLoading] = useState(true);
    let [color, setColor] = useState("#ffffff");
    const[productList,setProductList]=useState([]);
    const [filteredItems, setFilteredItems] = useState([])
    useEffect(() => {
        axios.get('https://umkc-project.herokuapp.com/programs')
        .then(function (response) {
            setProductList(response.data);
            setFilteredItems(response.data);
            setLoading(false);
        })
        .catch(function (error) {
          console.log(error);
        })
    }, []);
    const Search = (e) => {
        // console.log("ee", e.currentTarget.value)
        let value = e.currentTarget.value.toLowerCase();
        let filtArry = [];
        productList.forEach(element => {
            let text = element.name.toLowerCase() ;
            if (text.indexOf(value) >= 0) {
                filtArry.push(element)
            }
        });
        setFilteredItems(filtArry);
    }
    return (
        <>
        <div className="product-container">
         {loading? <ClipLoader color={color} loading={loading} css={override} size={150} />:
            <div>
            < TextField placeholder="category/product" label="Search" onChange={e => Search(e)} name="email" variant="outlined" />
            <div className="product-list-container">
                {filteredItems.map((ele) =>
                    <ProductCard key={ele.id} data={ele} ></ProductCard>
                )}
            </div>
            </div>}
        </div>
        </>
    );
}

export default ProductList

