var app = require('koa')();
var router = require('koa-router')();
var logger = require('koa-logger');
var json = require('koa-json');
var views = require('koa-views');
var static = require('koa-static');

var index = require('./routes/index');

// Init views
app.use(views(__dirname + '/views', {
    map: {
        html: 'underscore'
    }
}));

// Init bodyparser
app.use(require('koa-bodyparser')());

// Init json
app.use(json());

// Init logger
app.use(logger());

app.use(function *(next) {
    var start = new Date;
    yield next;
    var ms = new Date - start;
    this.set('X-Response-Time', ms + 'ms');
    console.log('%s %s - %s', this.method, this.url, ms);
});

// Init static
app.use(static(__dirname + '/static'));

// Set router
router.use('/', index.routes(), index.allowedMethods());

// Init routes
app.use(router.routes());

// Init error
app.on('error', function(err, ctx){
    logger.error('server error', err, ctx);
});

var devPort = 3132;
app.listen(devPort);
console.log('listening on port ' + devPort);
