module.exports.chatSockets = function(socketServer){
    // different from sir, Since Socket.IO v3, you need to explicitly enable Cross-Origin Resource Sharing (CORS). 
    let io = require('socket.io')(socketServer,{
        cors: {
            origin: "http://localhost:8000",
            methods: ["GET", "POST"]
          }
    });

    io.sockets.on('connection',function(socket){
        console.log("New connection received",socket.id);

        socket.on('disconnect',function(){
            console.log('Socket disconnected!');
        });

        socket.on('join_room',function(data){
            console.log('joining request received',data);

            socket.join(data.chatroom);

            io.in(data.chatroom).emit('user_joined',data);
        })

        // detect send message and broadcast to everyone in the room
        socket.on('send message',function(data){
            io.in(data.chatroom).emit('receive_message',data);
        })

    });
}

