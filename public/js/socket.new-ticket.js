let socket = io();

let label = $('#lblNewTicket');

socket.on('connect', () => {
    console.log('Connected server');
});

socket.on('disconnect', () => {
    console.log('Disconnected server');
});

socket.on('actualState', (resp) => {
    label.text(resp.actual);
});

$('button').on('click', () => {

    socket.emit('nextTicket', null, (nextTicket) => {
        label.text(nextTicket);
    });

});