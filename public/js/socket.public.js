let socket = io();

let lblTicket1 = $('#lblTicket1');
let lblTicket2 = $('#lblTicket2');
let lblTicket3 = $('#lblTicket3');
let lblTicket4 = $('#lblTicket4');

let lblDesktop1 = $('#lblDesktop1');
let lblDesktop2 = $('#lblDesktop2');
let lblDesktop3 = $('#lblDesktop3');
let lblDesktop4 = $('#lblDesktop4');

let lblTickets = [lblTicket1, lblTicket2, lblTicket3, lblTicket4];
let lblDesktops = [lblDesktop1, lblDesktop2, lblDesktop3, lblDesktop4];

socket.on('actualState', (resp) => {
    updateHTML(resp.last4);
});

socket.on('last4', (resp) => {

    let audio = new Audio('audio/new-ticket.mp3');

    audio.play();

    updateHTML(resp.last4);
})

const updateHTML = (last4) => {
    for (let index = 0; index <= last4.length - 1; index++) {
        lblTickets[index].text(`Ticket ${last4[index].number}`);
        lblDesktops[index].text(`Desktop ${last4[index].desktop}`);
    }
};