const input = document.getElementById("t");
const list = document.getElementById("list");

// LOAD TASKS
function load() {
    const xhr = new XMLHttpRequest();
    xhr.open("GET", "/task", true);

    xhr.onreadystatechange = function () {
        if (xhr.readyState !== 4) {
            return;
        }
        if (xhr.status !== 200) {
            list.innerHTML = "Failed to load tasks.";
            return;
        }

        try {
            const data = JSON.parse(xhr.responseText);
            let html = "";
            for (let i = 0; i < data.length; i++) {
                html += `
          <div class="task">
            ${data[i].text}
            <br> 
            <button onclick="del(${i})">Del</button>
            <button onclick="edit(${i})">Edit</button>
          </div>
        `;
            }
            list.innerHTML = html;
        } catch (error) {
            list.innerHTML = "Failed to parse tasks.";
        }
    };

    xhr.send();
}

// ADD
function add() {
    const text = input.value.trim();
    if (!text) return;

    const xhr = new XMLHttpRequest();
    xhr.open("POST", "/add", true);

    // this tells that i am sending JSON data
    xhr.setRequestHeader("Content-Type", "application/json");

    xhr.onreadystatechange = function () {
        if (xhr.readyState !== 4) {
            return;
        }
        if (xhr.status !== 200) {
            return;
        }
        input.value = "";
        load(); // imp hith load kelay parat
    };

    xhr.send(JSON.stringify({ text }));
}

// DELETE
function del(i) {
    const xhr = new XMLHttpRequest();
    xhr.open("DELETE", "/delete/" + i, true);

    xhr.onreadystatechange = function () {
        if (xhr.readyState !== 4) {
            return;
        }
        if (xhr.status !== 200) {
            return;
        }
        load();
    };

    xhr.send();
}

// UPDATE
function edit(i) {
    const text = prompt("New task:"); //this will be like popup 

    if (!text || !text.trim()) return;

    const xhr = new XMLHttpRequest();

    xhr.open("PUT", "/update/" + i, true);

    xhr.setRequestHeader("Content-Type", "application/json");

    xhr.onreadystatechange = function () {
        if (xhr.readyState !== 4) {
            return;
        }
        if (xhr.status !== 200) {
            return;
        }
        load();
    };

    xhr.send(JSON.stringify({ text: text.trim() })); //in add also we are doing same 
}

// INITIAL LOAD
load();
