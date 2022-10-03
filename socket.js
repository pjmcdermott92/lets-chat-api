const socketIo = require('socket.io');

const socket = server => {
    const io = socketIo(server, {
        cors: {
            origin: process.env.CLIENT_URI,
            methods: ['GET', 'POST', 'PUT', 'DELETE'],
            credentials: true
        }
    });

    io.on('connection', client => {
        // const id = client.handshake.query.id;
        // client.join(id);

        console.log('[socket]: A user connected...');

        client.on('addRoom', room => {
            console.log('[socket]: New room added');
            io.emit('roomAdded', room);
        });
    
        client.on('disconnect', () => {
            console.log('A user disconnected')
        })
    });

    return io;
}

module.exports = socket;
