window.onload = function() {
    let socket;

    const send = (message) => {
        if (socket) {
            socket.send(message);
        } else {
            alert('WebSocket connection has not been established or has closed.');
        }
    };

    document.getElementById('cmd').addEventListener('keyup', function(event) {
        if (event.key === 'Enter') {
            event.preventDefault();
            const ele = document.getElementById('cmd');
            const { value } = ele;
            send(value);
            displayPrompt(value);
            ele.select();
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

    const appendMessage = (message) => {
        const div = document.createElement('div');
        div.textContent = message;
        document.getElementById('terminal').appendChild(div);
    };

    const appendError = (message) => {
        const div = document.createElement('div');
        div.className = 'error';
        div.textContent = message;
        document.getElementById('terminal').appendChild(div);
    };

    const displayPrompt = (prompt, placeholder) => {
        appendMessage(prompt);
        const ele = document.getElementById('cmd');
        if (placeholder) {
            ele.placeholder = placeholder;
        }
    }

    // Connect to the WebSocket server
    socket = new WebSocket('ws://localhost:3001/');

    // When the socket connection is open
    socket.onopen = (event) => appendMessage(parseEvent(event).message);

    // When a message is received from the server
    socket.onmessage = (event) => appendMessage(parseEvent(event).message);

    // When an error occurs
    socket.onerror = (event) => appendError(parseEvent(event).message);

    // When the socket connection is closed
    socket.onclose = (event) => appendMessage(parseEvent(event).message);
};