async function getProductData() {
    try {
        const response = await fetch("http://localhost:8000/api/v1/product/getProduct");
        const product = await response.json();
        
        console.log(product);
        const cards = document.querySelector("div");
        
    } catch (err) {
        console.log(err?.message);
    }
}

getProductData();

