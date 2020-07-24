const stream = (socket) => {
    console.log("Here we go >....");
    socket.on('subscribe', (data) => {
        //subscribe/join a room
        socket.join(data.room);
        socket.join(data.socketId);

        //Inform other members in the room of new user's arrival
        if (socket.adapter.rooms[data.room].length > 1) {
            console.log("SocketId: " + data.socketId);
            socket.to(data.room).emit('new user', { socketId: data.socketId });
        }
    });


    socket.on('newUserStart', (data) => {
        socket.to(data.to).emit('newUserStart', { sender: data.sender });
    });


    socket.on('sdp', (data) => {
        console.log("Data Address finding: " + data.sender);
        socket.to(data.to).emit('sdp', { description: data.description, sender: data.sender });
    });


    socket.on('ice candidates', (data) => {
        console.log("Data canditate: " + data.candidate);
        socket.to(data.to).emit('ice candidates', { candidate: data.candidate, sender: data.sender });
    });


    socket.on('chat', (data) => {
        console.log("Data room: " + data.room);
        socket.to(data.room).emit('chat', { sender: data.sender, msg: data.msg });
    });
};

module.exports = stream;