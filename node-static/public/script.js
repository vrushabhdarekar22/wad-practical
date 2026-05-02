

async function loadUsers(){
    const userList = document.getElementById('userList');
    const status = document.getElementById('status');
    try{
        const response = await fetch("/api/users");
        console.log(response);
        
        if(!response.ok){
            throw new Error('Failed to fetch!')
        }


        const users = await response.json();

        console.log("users",users);
        if(!Array.isArray(users) || users.length === 0){
            status.innerHTML = 'No User Found';
            return;
        }

        userList.innerHTML = '';

        users.forEach((user)=>{
            let li = document.createElement('li');
            li.innerHTML = `<div>
                <p class="fw-bold">id:${user.id}</p>
                <p class="text-primary">Name:${user.name}</p>
                <p>email:${user.email}</p>
            </div>`;

            userList.appendChild(li);
        })
 
        status.innerHTML = `Loaded ${users.length} users`;
    }catch(error){
        status.innerHTML = 'Unable to load users'
    }
}

loadUsers();