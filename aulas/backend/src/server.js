const express = require('express');
const mongo = require('mongoose');
const cors = require('cors');

const routes = require('./routes');

const server = express();

mongo.connect('mongodb+srv://william:945513@cluster0-3rjtw.mongodb.net/omnistack8?retryWrites=true&w=majority', {
    useNewUrlParser: true
});

server.use(cors());
server.use(express.json());
server.use(routes);

server.listen(8080);