const { createProvider } = require('sonorpc');
const MySQL = require('sonorpc-mysql');
const Redis = require('ioredis');

const config = require('./config');

const application = {
    mysql: new MySQL(config.mysql),
    redis: new Redis(config.redis)
};

exports.start = function start() {
    return createProvider({
        name: 'base',
        extentions: {
            application
        },
        port: 3013,
        registry: {
            port: 3006
        },
        services: [
            require('./services/AddressService'),
        ]
    })
        .start();
};