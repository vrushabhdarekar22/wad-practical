 async function loadUsers() {
      const statusEl = document.getElementById('status');
      const listEl = document.getElementById('userList');

      try {
        const response = await fetch('/api/users');
        if (!response.ok) {
          throw new Error('Failed to fetch users.');
        }

        // important convert into JSON.
        const users = await response.json();
        listEl.innerHTML = '';

        if (!Array.isArray(users) || users.length === 0) {
          statusEl.textContent = 'No users found.';
          return;
        }

        users.forEach((user) => {
          const item = document.createElement('li');
          item.innerHTML = `
            <div class="name">${user.name}</div>
            <div class="meta">Email: ${user.email}</div>
            <div class="meta">City: ${user.city}</div>
          `;
          listEl.appendChild(item);           
        });

        

        statusEl.textContent = `Loaded ${users.length} users.`;
      } catch (error) {
        statusEl.textContent = 'Unable to load users at the moment.';
      }
    }




    loadUsers();