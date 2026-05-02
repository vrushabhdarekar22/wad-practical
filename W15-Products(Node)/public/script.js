async function loadProducts(){

    const productList = document.getElementById('productList');
    const status = document.getElementById('status');

    try{

        const response = await fetch("/api/products");
        console.log("response",response);

        if(!response.ok){
            throw new Error("Failed to fetch products");
        }

        const products = await response.json();
        console.log(products);

        productList.innerHTML = "";
        if(!Array.isArray(products) || products.length === 0){
            status.innerHTML = "No products found";
            return;
        }

        
        
        products.forEach((product)=>{
            let div = document.createElement('div');

            div.className = "col-md-3 mb-3 d-flex justify-content-center"

            div.innerHTML = `
                <div class="card shadow-sm m-3 p-card">
                    <div class="card-body">
                        <p>Image:<img src=${product.img} class="img-fluid w-100 card-img-top"></p>
                        <p class="card-title">Name:${product.name}</p>
                        <p class="card-text">price:${product.price}</p>

                    </div>  
                </div>
            `;
            
            console.log("Working");
            productList.appendChild(div);

        })

        status.className = "text-muted badge bg-info p-2";
        status.innerHTML = `Loaded ${products.length} products`;
    }catch(error){
        status.innerHTML = "Unable to load products";
    }
}

loadProducts();