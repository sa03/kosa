var router = require('koa-router')();

router.get('/', function *(next) {
    yield this.render('index', {
        title: 'Index!!!!!'
    });
});

module.exports = router;
