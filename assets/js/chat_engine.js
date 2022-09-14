class chatEngine{
    constructor(chatboxId,userEmail){
        this.chatboxId = $(`#${chatboxId}`);
        this.userEmail = userEmail;
        this.socket = io.connect('http://localhost:5000');

        if(userEmail){
            this.connectionHandeler();
        }
    }

    connectionHandeler(){

        let self = this;
        this.socket.on('connect',function(){
            console.log("Connection established using sockets!");

            self.socket.emit('join_room',{
                user_email: self.userEmail,
                chatroom: 'codeial'
            });

            self.socket.on('user_joined',function(data){
                console.log('a user joined!',data);
            })
        });

        // send a message on clicking the send message button
        $('#send-message').click(function(){
            let msg = $('#chat-message-input').val();

            if(msg != ''){
                self.socket.emit('send-message',{
                    message: msg,
                    user_email: self.userEmail,
                    chatroom: 'codeial'
                });
            }
        });

        // detect the received message and append it to UI

        self.socket.on('receive_message',function(data){
            console.log('message received',data.message);

            let newMessage = $('<li>');

            let messageType = 'other-message';

            if(data.user_email == self.userEmail){
                messageType = 'self-message';
            }

            newMessage.append($('<span>',{
                'html': data.message
            }));

            newMessage.append($('<sub>',{
                'html': data.user_email
            }));

            newMessage.addClass(messageType);

            $('#chat-message-input').append(newMessage);

        })


    }
}
