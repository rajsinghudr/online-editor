let {loadConfig, RestServer} = require('@rajsinghudr/restserver');
var express = require('express');

const config = {PORT: 3000} || loadConfig();
const server = new RestServer(config);
server.pre();

server.use(express.static('public'));

const log = console.log;

var srv = require('http').Server(server.getServer());
const io = require('socket.io')(srv);
srv.listen(config.PORT, () => log(`server listening on port: ${config.PORT}`));

io.on('connection', (socket) => {
    log('connected')
    socket.on('message', (evt) => {
        log(evt)
        socket.broadcast.emit('message', evt)
    })
});

io.on('disconnect', (evt) => {
    log('Some user left')
});