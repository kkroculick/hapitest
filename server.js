'use strict';

const Hapi = require('hapi');
const Good = require('good');
const Inert = require('inert');

const server = new Hapi.Server();
server.connection({ port: 3000, host: 'localhost' });

server.route({
    method: 'GET',
    path: '/',
    handler: function (request, reply) {
        reply('hello world');
    }

});

server.route({
    method: 'GET',
    path: '/{name}',
    handler: function (request, reply) {
        reply('Hello, ' + encodeURIComponent(request.params.name) + '!');
    }
});





server.register({register:Inert}, (err) => {

    if (err) throw err;


    server.route({
        method: 'GET',
        path: '/hello',
        handler: function (request, reply) {
            reply.file('./public/hello.html');
        }
    });
});



server.register({
    
    register: Good,
    options: {
        reporters: {
            console: [{
                module: 'good-squeeze',
                name: 'Squeeze',
                //args
                args: [{
                    response: '*',
                    log: '*'
                }]
                //end args
            }, {
                module: 'good-console'
            }, 'stdout'
            ]
        }
    }
}, (err) => {
    if (err) throw err;

    server.start((err) => {
        if (err) throw err;

        console.log(`Server running at: ${server.info.url}`)

    });

});












