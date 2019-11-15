const { createProvider } = require('sonorpc');
const MySQL = require('sonorpc-mysql');
const Redis = require('ioredis');

const config = require('../config');

const ctx = {
    mysql: new MySQL(config.mysql),
    redis: new Redis(config.redis)
};

module.exports = function start() {
    return createProvider({
        name: 'base',
        ctx,
        port: 3013,
        registry: {
            port: 3006
        },
        serviceClasses: [
            require('./AddressService'),
        ]
    })
        .start();
};