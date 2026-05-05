const table = document.getElementById("userTable");

function renderRows(users) {
    table.innerHTML = "";
    users.forEach(u => {
        let row = `<tr>
            <td>${u.name}</td>
            <td>${u.email}</td>
            <td>${u.mobile}</td>
            <td>${u.dob}</td>
            <td>${u.city}</td>
            <td>${u.address}</td>
            <td>${u.username}</td>
        </tr>`;
        table.innerHTML += row;
    });
}

const table = document.getElementById("usertable");

function renderRows(users){
    table.innerHTML = "";//important blank karayach
    users.forEach(u => {
        let row = `
        <tr>
        <td>${u.name}</td>
        <td>${u.email}</td>
            <td>${u.mobile}</td>
            <td>${u.dob}</td>
            <td>${u.city}</td>
            <td>${u.address}</td>
            <td>${u.username}</td>
        </tr>
        `;

        table.innerHTML+=row;
    })
}
function loadUsers() {
    const xhr = new XMLHttpRequest();
    xhr.open("GET", "/users", true);

    xhr.onreadystatechange = function () {
        if (xhr.readyState !== 4) {
            return;
        }

        if (xhr.status === 200) {
            try {
                const users = JSON.parse(xhr.responseText);
                renderRows(users);
                return;
            } catch (err) {
                // fallback below
            }
        }

        const fallback = JSON.parse(localStorage.getItem("users")) || [];
        renderRows(fallback);
    };

    xhr.send();
}

loadUsers(); // very very important 
