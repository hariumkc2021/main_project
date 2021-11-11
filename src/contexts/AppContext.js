import React, { useState, useContext, useCallback } from 'react';
import { useHistory } from 'react-router-dom';

export const AppContext = React.createContext({
    productList: [
        {
            "product_id": "PID_001",
            "product_name": "Oneplus 6",
            "image": "https://cdn2.gsmarena.com/vv/pics/oneplus/oneplus-6-amber-red.jpg",
            "type": "Electric",
            "category": "Mobile",
            "quantity": 35575,
            "unit_price": "36999"
        },
        {
            "product_id": "PID_002",
            "product_name": "Dell Inspiron Laptop",
            "image": "https://cdn.gsmarena.com/imgroot/news/16/12/dell-inspiron15-deal/inline/gsmarena_001.jpg",
            "type": "Electric",
            "category": "Laptop",
            "quantity": 3250,
            "unit_price": "59999"
        },
        {
            "product_id": "PID_003",
            "product_name": "Apple Macbook Pro",
            "image": "https://cdn.gsmarena.com/imgroot/news/16/12/macbook-pro-deal/-344x215/gsmarena_001.jpg",
            "type": "Electric",
            "category": "Laptop",
            "quantity": 2250,
            "unit_price": "68999"
        },
        {
            "product_id": "PID_004",
            "product_name": "iPhone X",
            "image": "https://cdn2.gsmarena.com/vv/bigpic/apple-iphone-x.jpg",
            "type": "Electric",
            "category": "Mobile",
            "quantity": 66250,
            "unit_price": "92999"
        },
        {
            "product_id": "PID_005",
            "product_name": "Samsung Galaxy S9",
            "image": "https://cdn2.gsmarena.com/vv/bigpic/samsung-galaxy-s9-plus-blue.jpg",
            "type": "Electric",
            "category": "Mobile",
            "quantity": 22550,
            "unit_price": "48999"
        },

    ],
    user: null,
    selectedProduct: null,
    setUser: () => { },
    setSelectedProduct: () => { },
    clearSession: () => { },
    cartItems: [],
    setCartItemsfn: () => { }
});

export const AppProvider = ({ children }) => {
    const history = useHistory();
    const appContext = useContext(AppContext);
    const [productList, setProductList] = useState(appContext.productList);
    const [user, setUserDetails] = useState(appContext.user);
    const [selectedProduct, setSelectedProduct] = useState(appContext.selectedProduct);
    const [cartItems, setcartItems] = useState(appContext.cartItems);

    const setUser = (userData) => {
        setUserDetails(userData);
    };
    const setSelectedProductfn = (product) => {
        setSelectedProduct(product);
    }
    const setCartItemsfn = (items) => {
        setcartItems(items);
    };

    const clearSession = () => {
        setUserDetails(null);
        history.push(`/auth`);
    };

    const provider = {
        productList,
        user,
        selectedProduct,
        cartItems,
        setUser: useCallback(setUser, []),
        setSelectedProductfn: useCallback(setSelectedProductfn, []),
        setCartItemsfn: useCallback(setCartItemsfn, []),
        clearSession: useCallback(clearSession, []),
    };

    return (
        <AppContext.Provider value={provider}>{children}</AppContext.Provider>
    );
};