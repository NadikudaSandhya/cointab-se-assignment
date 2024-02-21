// server.js
const express = require('express');
const bodyParser = require('body-parser');
const axios = require('axios');
const mysql = require('mysql');

const app = express();
const port = 3000;

app.use(bodyParser.json());

const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'password',
    database: 'cointab'
});

connection.connect();

// Home Page Route
app.get('/', (req, res) => {
    res.sendFile(__dirname + '/index.html');
});

// API to fetch users
app.get('/api/users', (req, res) => {
    axios.get('https://jsonplaceholder.typicode.com/users')
        .then(response => {
            res.json(response.data);
        })
        .catch(error => {
            res.status(500).send('Error fetching users from API');
        });
});

// Add User Route
app.post('/api/addUser', (req, res) => {
    const user = req.body;
    connection.query('INSERT INTO users SET ?', user, (error, results) => {
        if (error) {
            res.status(500).send('Error adding user to database');
        } else {
            res.send('User added successfully');
        }
    });
});

// Post Page Route
app.get('/post/:userId', (req, res) => {
    res.sendFile(__dirname + '/post.html');
});

// API to fetch posts
app.get('/api/posts/:userId', (req, res) => {
    const userId = req.params.userId;
    axios.get(`https://jsonplaceholder.typicode.com/posts?userId=${userId}`)
        .then(response => {
            res.json(response.data);
        })
        .catch(error => {
            res.status(500).send('Error fetching posts from API');
        });
});

// Add Post Route
app.post('/api/addPost', (req, res) => {
    const post = req.body;
    connection.query('INSERT INTO posts SET ?', post, (error, results) => {
        if (error) {
            res.status(500).send('Error adding post to database');
        } else {
            res.send('Post added successfully');
        }
    });
});

app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});
