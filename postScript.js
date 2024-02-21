// postScript.js
const bulkAddBtn = document.getElementById('bulkAddBtn');
const downloadExcelBtn = document.getElementById('downloadExcelBtn');
const postData = document.getElementById('postData');

bulkAddBtn.addEventListener('click', () => {
    const userId = window.location.pathname.split('/')[2];
    axios.get(`/api/posts/${userId}`)
        .then(response => {
            const posts = response.data;
            posts.forEach(post => {
                axios.post('/api/addPost', { userId, ...post })
                    .then(response => {
                        bulkAddBtn.style.display = 'none';
                        downloadExcelBtn.style.display = 'block';
                    })
                    .catch(error => {
                        console.error(error);
                    });
            });
        })
        .catch(error => {
            console.error(error);
        });
});

downloadExcel
