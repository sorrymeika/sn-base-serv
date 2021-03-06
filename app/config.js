exports.provider = {
    name: 'base',
    port: 3013,
};

exports.registry = {
    port: 3006
};

exports.mysql = {
    connectionLimit: 2,
    host: 'localhost',
    user: 'dev',
    password: '12345Qwert',
    database: 'sn_base'
};

exports.redis = {
    port: 6379,
    host: "127.0.0.1",
    // This is the default value of `retryStrategy`
    retryStrategy: function (times) {
        const delay = Math.min(times * 50, 2000);
        return delay;
    }
};