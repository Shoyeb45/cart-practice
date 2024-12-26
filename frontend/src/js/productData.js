function getProductData() {
    fetch("http://localhost:8000/api/v1/product/getProduct")
        .then((product) => {
            return product.json()
        })  
        .then((product) => {
            console.log(product);
        })
        .catch((err) => {
            console.log(err?.message);
        }
    )
}


const productData = getProductData();
console.log(productData);
