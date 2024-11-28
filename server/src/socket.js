/**
 * Socket logic to manage chat communication.
 * @param {Object} io - Socket.IO server instance.
 */
function handleSocket(io) {
    // Event listener for new connections
    io.on('connection', (socket) => {
        console.log('A user connected.');

        // Handle username setup
        // This event is triggered when a user sets their username
        socket.on('set username', (username) => {
            socket.username = username; // Store the username on the socket object
            console.log(`${username} joined the chat.`); // Log the username to the server console
        });

        // Handle incoming chat messages
        // This event listens for the 'chat message' event from the client
        socket.on('chat message', (msg) => {
            // Format the message with the username, defaulting to 'Anonymous' if no username is set
            const fullMessage = `${socket.username || 'Anonymous'}: ${msg}`;
            
            // Broadcast the message to all other connected users (excluding the sender)
            socket.broadcast.emit('chat message', fullMessage);
            
            // Send the message back to the sender with a "You: ..." format
            socket.emit('chat message', `You: ${msg}`);
        });

        // Handle user disconnection
        // This event is triggered when a user disconnects from the server
        socket.on('disconnect', () => {
            // Log the disconnection to the server console
            console.log(`${socket.username || 'A user'} disconnected.`);
        });
    });
}

// Export the function to be used in other files (e.g., the main server file)
module.exports = { handleSocket };
