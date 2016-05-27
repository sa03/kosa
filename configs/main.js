var path = require('path');

var env = process.env.NODE_ENV || 'development';
var port = process.env.PORT || 3000;
var host = 'http://localhost' + (port != 80 ? ':' + port : '');

var DEBUG = env !== 'production';

module.exports = {
    name: "kosa",
    keys: ['fuckkosaasokkcuf'],
    env: env,
    port: port,
    static: {
        directory: path.resolve(__dirname, '../static')
    },
    bodyparser: {},
    session: {
        cookie: {
            maxAge: 1000 * 60 * 60 * 24//24 hours
        }
    },
    auth: {},
    view: {
        root: path.resolve(__dirname, '../views'),
        cache: DEBUG ? false : 'memory',
        layout: false
    },
    error: {
        view: 'error/error',
        layout: 'layouts/error',
        custom: {
            401: 'error/401',
            403: 'error/403',
            404: 'error/404',
        }
    }
}