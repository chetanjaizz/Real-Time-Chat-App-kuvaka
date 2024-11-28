// Import required modules
const express = require('express'); // Web framework for Node.js
const http = require('http'); // HTTP module to create the server
const { Server } = require('socket.io'); // WebSocket library for real-time communication
const path = require('path'); // Path module for resolving directory paths
const { handleSocket } = require('./socket'); // Custom module for handling socket connections

// Create an Express app instance
const app = express();

// Create an HTTP server using the Express app
const server = http.createServer(app);

// Create a new Socket.IO server, passing the HTTP server to it
const io = new Server(server);

// Serve static files from the 'public' folder in the client directory
// This allows the client to access JS, CSS, and other assets
app.use(express.static(path.join(__dirname, '../../client/public')));

// Set the view engine to EJS for rendering HTML templates
app.set('view engine', 'ejs');

// Set the directory where the views (EJS templates) are stored
app.set('views', path.join(__dirname, '../../client/views'));

// Define the route for the main chat page
// When a user navigates to the root URL '/', the server will render the 'index' view (EJS template)
app.get('/', (req, res) => {
    res.render('index'); // Renders 'index.ejs' from the views folder
});

// Initialize the Socket.IO event handling logic
// This function handles the connection and communication between clients through WebSockets
handleSocket(io);

// Start the server on port 3000
// This allows the server to listen for incoming requests on port 3000
const PORT = 3000;
server.listen(PORT, () => {
    // Log to the console that the server is running and ready
    console.log(`Server running on http://localhost:${PORT}`);
});
