var Router = require('koa-router')
var secured = function* (next) {
    if (this.isAuthenticated()) {
        yield next
    } else {
        this.status = 401
    }
}

module.exports = function (app) {
    var router = new Router();
    
    var indexController = require('../controllers/index')
    
    //main
    router.get('/', indexController.index);
    router.post('/testAjax', indexController.testAjax);

    // //contact
    // router.post('/contact', siteController.doContact)

    // //register
    // router.get('/register', authController.register)
    // router.post('/register', authController.doRegister)

    // //auth
    // router.get('/login', authController.login)
    // router.post('/login', authController.doLogin)
    // router.all('/logout', authController.logout)

    return router.middleware();
}
