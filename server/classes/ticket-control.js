const fs = require('fs');

class Ticket {
    constructor(number, desktop) {
        this.number = number;
        this.desktop = desktop;
    }
}

class TicketControl {

    constructor() {

        this.last = 0;
        this.today = new Date().getDate();
        this.tickets = [];
        this.last4 = [];

        let data = require('../data/data.json');

        if (data.today === this.today) {
            this.last = data.last;
            this.tickets = data.tickets;
            this.last4 = data.last4;
        } else {
            this.resetCount();
        }
    }

    next() {
        this.last += 1;

        let ticket = new Ticket(this.last, null);
        this.tickets.push(ticket);

        this.saveFile();

        return `Ticket ${this.last}`;
    }

    getLastTicket() {
        return `Ticket ${this.last}`;
    }

    getLast4() {
        return this.last4;
    }

    resolveTicket(desktop) {

        if (this.tickets.length === 0) {
            return 'No tickets';
        }
        let numberTicket = this.tickets[0].number;

        this.tickets.shift();

        let resolveTicket = new Ticket(numberTicket, desktop);

        this.last4.unshift(resolveTicket);

        if (this.last4.length > 4) {
            this.last4.splice(-1, 1); //delete las element
        }

        console.log('last 4');
        console.log(this.last4);

        this.saveFile();

        return resolveTicket;
    }

    resetCount() {
        this.last = 0;
        this.tickets = [];
        this.last4 = [];
        console.log('Se inicializo');
        this.saveFile();
    }

    saveFile() {
        let jsonData = {
            last: this.last,
            today: this.today,
            tickets: this.tickets,
            last4: this.last4
        };

        let jsonDataString = JSON.stringify(jsonData);

        fs.writeFileSync('./server/data/data.json', jsonDataString);
    }
}


module.exports = {
    TicketControl
}