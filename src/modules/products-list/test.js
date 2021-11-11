import firebase from "../firebase";

let products = [
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
        "category": "Mobile",
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
    }

]

for (let obj in products) {
    // Add a new document in collection "cities"
    console.log('obj', obj)
    firebase.firestore().collection("totalProducts").doc("products").set(obj)
        .then(function () {
            console.log("Document successfully written!");
        })
        .catch(function (error) {
            console.error("Error writing document: ", error);
        });
}

