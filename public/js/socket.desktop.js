let socket = io();


let searchParams = new URLSearchParams(window.location.search);

if (!searchParams.has('escritorio')) {
    window.location = 'index.html';
    throw new Error('Desktop is required');
}

let desktop = searchParams.get('escritorio');
let label = $('small');

console.log(desktop);


$('h1').text(`Desktop: ${desktop}`);

$('button').on('click', () => {
    socket.emit('resolveTicket', { desktop }, (resp) => {

        if (resp === "No tickets") {
            label.text(resp);
            alert(resp);
            return;
        }

        label.text(`Ticket: ${resp.number}`)
    })
})