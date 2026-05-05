let users = JSON.parse(localStorage.getItem("users")) || [];

/* ---------------- REGISTER ---------------- */
document.getElementById("registerForm").addEventListener("submit", function (e) {
    e.preventDefault();

    let name = document.getElementById("name").value.trim();
    let email = document.getElementById("email").value.trim();
    let mobile = document.getElementById("mobile").value.trim();
    let dob = document.getElementById("dob").value;
    let city = document.getElementById("city").value.trim();
    let address = document.getElementById("address").value.trim();
    let username = document.getElementById("username").value.trim();
    let password = document.getElementById("password").value.trim();

    // Validations
    if (name === "" || email === "" || mobile === "" || dob === "" || city === "" || address === "" || username === "" || password === "") {
        alert("All fields are required!");
        return;
    }

    if (!/^[A-Za-z ]{2,}$/.test(name)) {
        alert("Name must be at least 2 letters (alphabets only)");
        return;
    }

    let emailPattern = /^[^ ]+@[^ ]+\.[a-z]{2,3}$/;
    if (!email.match(emailPattern)) {
        alert("Invalid Email");
        return;
    }

    if (!/^[0-9]{10}$/.test(mobile)) {
        alert("Invalid Mobile Number");
        return;
    }


    if (!/^[A-Za-z ]{2,}$/.test(city)) {
        alert("City must be at least 2 letters (alphabets only)");
        return;
    }

    if (address.length < 5) {
        alert("Address must be at least 5 characters");
        return;
    }

    if (!/^[A-Za-z0-9_]{4,}$/.test(username)) {
        alert("Username must be at least 4 characters (letters/numbers/_)");
        return;
    }

    if (password.length < 6) {
        alert("Password must be at least 6 characters");
        return;
    }

    if (users.some(u => u.username === username)) {
        alert("Username already exists");
        return;
    }

    let user = { name, email, mobile, dob, city, address, username, password };

    let xhr = new XMLHttpRequest();
    xhr.open("POST", "/register", true);
    xhr.setRequestHeader("Content-Type", "application/json");

    xhr.onreadystatechange = function () {
        if (xhr.readyState !== 4) {
            return;
        }

        if (xhr.status === 200) {
            users.push(user);
            localStorage.setItem("users", JSON.stringify(users));
            alert("Registration Successful!");
            document.getElementById("registerForm").reset(); //reset the form
        } else {
            alert("Registration Failed");
        }
    };

    xhr.send(JSON.stringify(user));
});


//see here there is no route for login we are just checking it using loccalstorage.

/* ---------------- LOGIN ---------------- */
document.getElementById("loginForm").addEventListener("submit", function (e) {
    e.preventDefault();

    let loginUser = document.getElementById("loginUser").value.trim();
    let loginPass = document.getElementById("loginPass").value.trim();

    users = JSON.parse(localStorage.getItem("users")) || [];
    let found = users.find(u => u.username === loginUser && u.password === loginPass);

    if (found) {
        document.getElementById("loginMsg").innerHTML = "Login Successful!";
        window.location.href = "data.html";
    } else {
        document.getElementById("loginMsg").innerHTML = "Invalid Credentials!";
    }
});


