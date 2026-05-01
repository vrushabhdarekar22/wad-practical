let users = JSON.parse(localStorage.getItem("users")) || [];

let table = document.getElementById("userTable");

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
