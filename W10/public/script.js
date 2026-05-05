const inputText = document.getElementById('inputText');
const listItem = document.getElementById('listItem');

function load(){
    const xhr = new XMLHttpRequest();

    xhr.open('GET','/tasks',true);

    xhr.onreadystatechange = function(){
        if(xhr.readyState !== 4){
            return;
        }
        
        if(xhr.status !== 200){
            listItem.textContent='Failed to load tasks';
            return;
        }
        
        try{
            const data = JSON.parse(xhr.responseText);
            let html = "";
            // console.log("I am in load success")
            for(let i=0;i<data.length;i++){
                html += `
                <div class="task">
                    ${data[i].text}
                    </br>
                    <button onClick="del(${i})">Del</button>
                    <button onClick="update(${i})">Update</button>
                </div>
                `;
            };

            listItem.innerHTML = html;

        }catch(e){

        }
    }
    xhr.send();

}



function add(){
    const text = inputText.value.trim();

    if(!text) return;

    const xhr = new XMLHttpRequest();

    xhr.open('POST','/add',true);

    // here we have to set content type like by passing two separate attributes
    xhr.setRequestHeader("Content-Type","application/json");
    console.log("I am in add");

    xhr.onreadystatechange = function(){
        if(xhr.readyState !== 4){
            return;
        }

        if(xhr.status !== 200){
            return;
        }

        console.log("I am in add success");
        inputText.value = "";
        load();
    }


    xhr.send(JSON.stringify({text}));
    console.log("Here is mistake")
}


function del(i){
    const xhr = new XMLHttpRequest();

    xhr.open('DELETE','/delete/'+i,true);

    xhr.onreadystatechange = function(){
        if(xhr.readyState !== 4){
            return;
        }

        if(xhr.status !== 200){
            return;
        }

        load();
    }

    xhr.send();
}

function update(i){

    let text = prompt("New Task:");

    const xhr = new XMLHttpRequest();

    xhr.open('PUT','/update/'+i,true);

    console.log("In update at script success")
    xhr.setRequestHeader("Content-Type","application/json");
    
    xhr.onreadystatechange = function(){
        if(xhr.readyState !== 4){
            return;
        }
        
        if(xhr.status !== 200){
            return;
        }

        load();
    }

    xhr.send(JSON.stringify({text:text.trim()}));
}