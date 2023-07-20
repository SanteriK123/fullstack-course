const EventEmitter = require('events');
const uuid = require('uuid');

class Logger extends EventEmitter {
    log(msg) {
        // Call event
        this.emit('message',{ id: uuid.v4(), msg });
    } 
}

// module.exports = Logger;

const logger = new Logger();

logger.on('message',(data) => console.log('Called Listener: ', data));

logger.log('Hello World');

const users = [
    {name: 'Bob', age: 40},
    {name: 'Mb', age: 23},
    {name: 'rob', age: 42}
];
res.writeHead(200, {'Content-Type': 'application/json'});
res.end(JSON.stringify(users));