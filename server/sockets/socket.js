const { io } = require('../server');
const { TicketControl } = require('../classes/ticket-control');

const ticketControl = new TicketControl();

io.on('connection', (client) => {


    client.on('nextTicket', (data, callback) => {

        let nextTicket = ticketControl.next();
        callback(nextTicket);

    });

    client.emit('actualState', {
        actual: ticketControl.getLastTicket(),
        last4: ticketControl.getLast4()
    });

    client.on('resolveTicket', (data, callback) => {
        if (!data.desktop) {
            return callback({
                err: true,
                message: 'Desktop is required'
            });
        }

        let resolveTicket = ticketControl.resolveTicket(data.desktop);

        callback(resolveTicket);

        client.broadcast.emit('last4', {
            last4: ticketControl.getLast4()
        })

    });

});