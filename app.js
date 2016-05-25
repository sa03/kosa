var koa = require('koa');
var app = koa();
var Router = require('koa-router');
var session = require('koa-session');

var myRouter = new Router();

//x-response-time

app.use(function *(next) {
    var start = new Date;
    yield next;
    var ms = new Date - start;
    this.set('X-Response-Time', ms + 'ms');
    //logger
    console.log('%s %s - %s', this.method, this.url, ms);
    console.log(this.res.status);
});

//router

app.get('/users/:user', function *(next) {
    this.body = 'Fuck u : ' + this.user;
}).param('user', function *(id, next) {
    var users = [ '0号用户', '1号用户', '2号用户'];
    this.user = users[id];
    if(!this.user) return this.status = 404;
    yield next; 
});

app.redirect('/login', 'sign-in');
//等同于
app.all('/login', function *() {
   this.redirect('/sign-in');
   this.status = 301; 
});

//Session
app.keys = ['fuck up all'];
app.use(session(app));

app.use(function *(){
    var n = this.session.views || 0;
    this.session.views = ++n;
    this.body = n + ' views'; 
});


// app.use(myRouter.routes());
//error

app.on('error', function(err) {
    log.error('server error', err);    
});

app.on('error', function(err, ctx){
    log.error('server error', err, ctx);
});

var devPort = 3132;
app.listen(devPort);
console.log('listening on port ' + devPort);
