const { Server } = require('socket.io');
const { createChatEvent} = require('./controllers/chat.controller');


module.exports = function initSocket(server) {
    const io = new Server(server, {
        cors: {
            origin: '*',
        },
    });

    console.log('Socket.IO server started');

    // Handle Socket.IO connections
    io.on('connection', (socket) => {
        console.log(`User connected: ${socket.id}`);


        // Handle joining chat room
        socket.on('joinChat', ({ businessId, investorId }) => {
            const room = `${businessId}-${investorId}`;
            socket.join(room);
            console.log(`User joined room: ${room}`);
        });

        // Handle sending messages
        socket.on('sendMessage', async ({
            sender,
            message,
            investorId,
            businessId
        }) => {
            const room = `${businessId}-${investorId}`;
            await createChatEvent(message, sender, investorId, businessId);
            socket.broadcast.to(room).emit('receiveMessage', {
                message,
                senderType: sender,
            });
        });

        // Handle disconnection
        socket.on('disconnect', () => {
            console.log(`User disconnected: ${socket.id}`);
        });
    });
}
