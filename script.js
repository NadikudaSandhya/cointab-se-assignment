// script.js
const allUsersBtn = document.getElementById('allUsersBtn');
const userData = document.getElementById('userData');

allUsersBtn.addEventListener('click', () => {
    axios.get('/api/users')
        .then(response => {
            const users = response.data;
            users.forEach(user => {
                const div = document.createElement('div');
                div.innerHTML = `
                    <h3>${user.name}</h3>
                    <p>Email: ${user.email}</p>
                    <p>Phone: ${user.phone}</p>
                    <p>Website: ${user.website}</p>
                    <p>City: ${user.address.city}</p>
                    <p>Company: ${user.company.name}</p>
                    <button class="addUserBtn" data-user='${JSON.stringify(user)}'>Add</button>
                `;
                userData.appendChild(div);
            });
        })
        .catch(error => {
            console.error(error);
        });
});

userData.addEventListener('click', (e) => {
    if (e.target.classList.contains('addUserBtn')) {
        const user = JSON.parse(e.target.dataset.user);
        axios.post('/api/addUser', user)
            .then(response => {
                e.target.remove();
                const openBtn = document.createElement('button');
                openBtn.innerText = 'Open';
                userData.appendChild(openBtn);
                openBtn.addEventListener('click', () => {
                    window.location.href = `/post/${user.id}`;
                });
            })
            .catch(error => {
                console.error(error);
            });
    }
});
