const socket = io();

Notification.requestPermission().then(function (result) {
    console.log(result);
});

function notifyMe(message = 'Hi there!') {
    // Let's check if the browser supports notifications
    if (!("Notification" in window)) {
        alert("This browser does not support desktop notification");
    }

    // Let's check whether notification permissions have already been granted
    else if (Notification.permission === "granted") {
        // If it's okay let's create a notification
        var notification = new Notification(message);
    }

    // Otherwise, we need to ask the user for permission
    else if (Notification.permission !== 'denied') {
        Notification.requestPermission(function (permission) {
            // If the user accepts, let's create a notification
            if (permission === "granted") {
                var notification = new Notification(message);
            }
        });
    }

    // At last, if the user has denied notifications, and you 
    // want to be respectful there is no need to bother them any more.
}

socket.on('new message', (data) => {
    console.log('new sms')
    notifyMe('New SMS received!');
    // you can change this part with your favorite javascript framework/library
    const messagesList = document.getElementById('messages');

    const li = document.createElement('li');
    li.classList = 'list-group-item list-group-warning list-group-item-action';

    const body = document.createElement('p')
    body.appendChild(document.createTextNode('Message: ' + data.body))

    const from = document.createElement('span');
    from.appendChild(document.createTextNode('from: ' + data.from))

    const to = document.createElement('span');
    from.appendChild(document.createTextNode('to: ' + data.to));

    const type = document.createElement('span');
    from.appendChild(document.createTextNode('type: ' + data.type))

    const time = document.createElement('span');
    from.appendChild(document.createTextNode(timeago.format(data.type)))

    li.appendChild(body);
    li.appendChild(from);
    li.appendChild(to);
    li.appendChild(type);
    li.appendChild(time);

    messagesList.prepend(li)
});