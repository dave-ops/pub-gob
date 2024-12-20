window.onload = function() {
    let socket;

    document.getElementById('cmd').addEventListener('keyup', function(event) {
        if (event.key === 'Enter') {
            event.preventDefault();
            const message = document.getElementById('cmd').value;
            if (socket) {
                socket.send(message);
            } else {
                alert('WebSocket connection has not been established or has closed.');
            }
        }
    });

    // Connect to the WebSocket server
    socket = new WebSocket('ws://localhost:3001/');

    // When the socket connection is open
    socket.onopen = function(event) {
        document.getElementById('terminal').append('<div>connection established.</div>');
    };

    // When a message is received from the server
    socket.onmessage = function(event) {
        document.getElementById('terminal').append(`<div>server: ${event.data}</div>`);
    };

    // When an error occurs
    socket.onerror = function(error) {
        document.getElementById('terminal').append(`<div>error: ${error.message}</div>`);
    };

    // When the socket connection is closed
    socket.onclose = function(event) {
        document.getElementById('terminal').append('<div>connection closed.</div>');
    };
};