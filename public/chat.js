//Make connection
var socket = io.connect('http://localhost:4000');
//Query DOM
var message = document.getElementById('message');
var handle = document.getElementById('handle');
var btn = document.getElementById('send');
var output = document.getElementById('output');
var feedback = document.getElementById('feedback');

//Emit events

btn.addEventListener('click', function() {
    if (message.value.trim().length <= 0 || handle.value.trim().length <= 0) {
        return;
    }
    socket.emit('chat', {
        message: message.value.trim(),
        handle: handle.value.trim()
    });
    message.value = '';
})
message.addEventListener('keyup', function(e) {
    if (e.key == 'Enter') {
        btn.click();
        return;
    }
    socket.emit('typing', handle.value.trim())
})

//Listen for events
socket.on('chat', function(data) {
    feedback.innerHTML = '';
    output.innerHTML += '<p><strong>' + data.handle.trim() + ':</strong>' + data.message.trim() + '</p>';
});
socket.on('typing', function(data) {
    feedback.innerHTML = '<p><em>' + data + ' is typing a message...</em></p>';
});