let currentCategory = "all"

document.querySelectorAll(".dropdown-item").forEach(item => {
    item.addEventListener("click", function () {
        currentCategory = this.dataset.filter;
        filterProducts();
    })
})

document.getElementById("sortSelect").addEventListener("change", filterProducts)

// filter using checkbox
document.getElementById("stockCheck").addEventListener("change", filterProducts);
document.getElementById("bestCheck").addEventListener("change", filterProducts);
document.getElementById("newCheck").addEventListener("change", filterProducts);




function filterProducts() {

    let stock = document.getElementById("stockCheck").checked;
    let best = document.getElementById("bestCheck").checked;
    let newArr = document.getElementById("newCheck").checked;




    document.querySelectorAll(".product").forEach(product => {
        let isStock = product.dataset.stock === "true";
        let category = product.dataset.category;
        let tag = product.dataset.tag;

        let show = true;

        if (currentCategory !== "all" && currentCategory !== category) {
            show = false;
        }

        if (stock && !isStock) {
            show = false;
        }

        if (best && tag !== "bestseller") {
            show = false;
        }

        if (newArr && tag !== "new") {
            show = false;
        }



        product.style.display = show ? "" : "none";

    })


    let container = document.getElementById("productContainer");
    let products = Array.from(container.querySelectorAll(".product"));

    let sortValue = document.getElementById("sortSelect").value;

    products.sort((a, b) => {
        let priceA = Number(a.dataset.price);
        let priceB = Number(b.dataset.price);

        let ratingA = Number(a.dataset.rating);
        let ratingB = Number(b.dataset.rating);


        if (sortValue === "priceLow") return priceA - priceB;
        if (sortValue === "priceHigh") return priceB - priceA;
        if (sortValue === "ratingHigh") return ratingB - ratingA;


        return 0;

    });


    products.forEach((p) => container.appendChild(p));
}