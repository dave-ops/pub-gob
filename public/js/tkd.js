const CLASS_PROMPT = 'prompt';

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
            const { value: prompt } = ele;
            send(prompt);
            displayPrompt({ prompt });
            ele.select();
        }
    });

    const appendMessage = (dom) => {
        if (!dom) {
            return;
        }
        document.getElementById('terminal').appendChild(dom);
    }

    const parseEvent = (evt) => {
        const { data } = evt;
        if (!data) {
            return null;
        }

        const { message, html } = data;

        if (html) {
            return parseHtmlString(html)
        }

        if (message) {
            return parseHtmlString(parseJsonToHtmlString(message));
        }

        return null;
    };

    const parseHtmlString = (html) => {
        const parser = new DOMParser();
        const doc = parser.parseFromString(html, 'text/html');
        const node = doc.body.firstChild;
        return node;
    };

    const parseJsonToHtmlString = (message, className) => {
        const div = document.createElement('div');
        div.textContent = message;
        if (className) {
            div.className = className;
        }
        return div;
    };

    const displayPrompt = ({ prompt, placeholder }) => {
        const html = `<div class="${CLASS_PROMPT}">${prompt}</div>`;
        const dom = parseHtmlString(html);
        appendMessage(dom);
    }

    // Connect to the WebSocket server
    socket = new WebSocket('ws://localhost:3001/');

    // When the socket connection is open
    socket.onopen = (event) => appendMessage(parseEvent(event));

    // When a message is received from the server
    socket.onmessage = (event) => appendMessage(parseEvent(event));

    // When an error occurs
    socket.onerror = (event) => appendError(parseEvent(event));

    // When the socket connection is closed
    socket.onclose = (event) => appendMessage(parseEvent(event));

    // set focus
    document.getElementById('cmd').focus();

};