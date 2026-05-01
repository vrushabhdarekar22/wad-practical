const products = [
            { name: "Wireless Headphones", price: "7999", desc: "Noise-cancelling headphones", img: "images/img1.png" },
            { name: "Smartwatch", price: "12999", desc: "Fitness tracking smartwatch", img: "images/img2.png" },
            { name: "Gaming Mouse", price: "2499", desc: "Ergonomic gaming mouse", img: "images/img3.png" },
            { name: "Laptop Stand", price: "1999", desc: "Adjustable aluminium stand", img: "images/img4.png" },
            { name: "Keyboard", price: "1499", desc: "Mechanical keyboard", img: "images/img5.png" },
            { name: "Monitor", price: "10999", desc: "24 inch LED monitor", img: "images/img6.png" },
            { name: "USB Cable", price: "299", desc: "Fast charging cable", img: "images/img1.png" },
            { name: "Power Bank", price: "1999", desc: "10000mAh battery", img: "images/img2.png" },
            { name: "Speaker", price: "3499", desc: "Bluetooth speaker", img: "images/img3.png" },
            { name: "Router", price: "2499", desc: "WiFi router", img: "images/img4.png" },
            { name: "Tablet", price: "15999", desc: "Android tablet", img: "images/img5.png" },
            { name: "Camera", price: "25999", desc: "Digital camera", img: "images/img6.png" }
        ];

        let currentPage = 1;
        const rowsPerPage = 10;
        
        function displayProducts(){
            const tableBody = document.querySelector("#productTable tbody");
            tableBody.innerHTML = "";
            let start = (currentPage-1)*rowsPerPage;
            let end = start + rowsPerPage;

            let items = products.slice(start,end);

            items.forEach((item)=>{
                let row = `
                <tr>
                    <td><img src="${item.img}"></td>
                    <td>${item.name}</td>
                    <td>${item.price}</td>
                    <td>${item.desc}</td>
                </tr>
                `

                tableBody.innerHTML += row;
            })

            //pagination
            document.getElementById("Pageinfo")
            .innerText = `Page ${currentPage} of ${Math.ceil(products.length/rowsPerPage)}`;
        }
        
        function toPrev(){
            if(currentPage>1){
                currentPage--;
                displayProducts();
            }
        }
        function toNext(){
            if(currentPage < Math.ceil(products.length / rowsPerPage)){
                currentPage++;
                displayProducts();
            }
        }
        displayProducts()