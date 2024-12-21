const CLASS_PROMPT = 'prompt';
const MESSAGE_TYPE_HTML = 'html'
const MESSAGE_TYPE_TEXT = 'info'

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
        console.log('parsing')
        console.log(evt)

        const { data } = evt;
        console.log(data);

        if (!data) {
            console.log('no data');
            return null;
        }


        const { message, html } = data;

        console.log({ message, html })
        if (html) {
            console.log('- parsing html')
            return parseHtmlString(html)
        }

        if (message) {
            console.log('- parsing message')
            return parseJsonToHtmlString(message);
        }

        console.log('no parsing today')
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

    const toJson = (data) => {
        if (!data) {
            return null;
        }

        console.log(event);
        if (!data) {
            console.log('not json')
            return null;
        }

        const json = JSON.parse(data);
        console.log(json);
        return json;
    }

    const handleEvent = (event) => {
        console.log(event);
        const { type: event_type, data } = event;
        console.log({ event_type });

        if (!data) {
            return null;
        }

        const { type, html, message } = toJson(data);
        const evt_req = html ? html : parseJsonToHtmlString(message);
        const dom = parseHtmlString(evt_req);
        return appendMessage(dom);
    }

    // Connect to the WebSocket server
    socket = new WebSocket('ws://localhost:3001/');

    // When the socket connection is open
    socket.onopen = (event) => handleEvent(event); //appendMessage(parseEvent(event));

    // When a message is received from the server
    socket.onmessage = (event) => handleEvent(event); //appendMessage(parseEvent(event));

    // When an error occurs
    socket.onerror = (event) => handleEvent(event); //appendError(parseEvent(event));

    // When the socket connection is closed
    socket.onclose = (event) => handleEvent(event); //appendMessage(parseEvent(event));

    // set focus
    document.getElementById('cmd').focus();

};