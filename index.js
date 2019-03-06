const tokenManagement = require('./tokenManagement');
const fs = require('fs');
const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const server = require('http').Server(app);

let port = process.env.PORT;
if (port == null || port == "") {
    port = 4800;
}

app.all('*', function(req, res, next) {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Methods', 'PUT, GET, POST, DELETE, OPTIONS');
    res.header('Access-Control-Allow-Headers', 'Content-Type');
    next();
});

app.use(bodyParser.text({ type: 'text/html' }));
app.use(bodyParser.json({ type: 'application/json' }));
app.use(bodyParser.urlencoded({type: 'application/x-www-form-urlencoded', extended: true}));

app.post('/jwt', (req, res, next) => {
    
    const subject = req.body.subject;
    const token = tokenManagement.generate(subject);
    const data = {
        token: token
    };

    res.send(data);

});



app.use(express.static('static', {'index': ['index.html']}));

server.listen(port, ()=>{
    console.log("I am Alive on " + port);
});
