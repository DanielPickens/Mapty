'use strict';

const express = require('express');
const app = express();

const redis = require('redis');
const client = redis.createClient({
    host: 'redis',
    port: 6379
});

app.get('/', (req, res) => {
    client.incr('hits');
    client.get('hits', (err, hit) => {
        if (err) throw err;
        res.send(`Hits: ${hit}`);
    });
});

const port = 3000;
app.listen(port, () => {
    console.log(`Running on http://localhost:${port}`);
});
