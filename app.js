var app = require('koa')();
var config = require('./configs/main');

app.name = config.name;
app.keys = config.keys;
app.env = config.env;

// if (config.env === 'development')
//     var debug = require('debug')('kosa');

// Init bodyparser
app.use(require('koa-bodyparser')(config.bodyparser));
// Init view
require('koa-ejs')(app, config.view);
// Init view error
app.use(require('koa-error-ejs')(config.error));
// Init static
app.use(require('koa-static')(config.static.directory, config.static));
// Init json
app.use(require('koa-json')());
// Init logger
app.use(require('koa-logger')());
// Init passport
// var passport=require('./configs/auth')(app, config.auth)
// app.use(passport.initialize())
// app.use(passport.session())


// Init routes
app.use(require('./configs/routes')(app));

app.use(function* (next) {
    var start = new Date;
    yield next;
    var ms = new Date - start;
    this.set('X-Response-Time', ms + 'ms');
    console.log('%s %s - %s', this.method, this.url, ms);
});

if (!module.parent) {
    app.listen(config.port || 3000, function () {
        console.log('Server running on port ' + config.port || 3000)
    })
} else {
    module.exports = app
}
