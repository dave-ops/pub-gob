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

    const parseEvent = (evt) => {
        const { data } = evt;
        if (data) {
            console.log(data);
            return JSON.parse(data);
        }
        return { message: null };
    };

    // Connect to the WebSocket server
    socket = new WebSocket('ws://localhost:3001/');

    // When the socket connection is open
    socket.onopen = function(event) {
        const div = document.createElement('div');
        div.textContent = parseEvent(event).message;
        document.getElementById('terminal').appendChild(div);
    };

    // When a message is received from the server
    socket.onmessage = function(event) {
        const div = document.createElement('div');
        div.textContent = parseEvent(event).message;
        document.getElementById('terminal').appendChild(div);
    };

    // When an error occurs
    socket.onerror = function(error) {
        const div = document.createElement('div');
        div.textContent =  parseEvent(event).message;
        document.getElementById('terminal').appendChild(div);
    };

    // When the socket connection is closed
    socket.onclose = function(event) {
        const div = document.createElement('div');
        div.textContent =  parseEvent(event).message;
        document.getElementById('terminal').appendChild(div);
    };
};