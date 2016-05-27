module.exports = {
    index: function* () {
        yield this.render('index', {
            title: 'Index!!!!!!'
        });
    },
    testAjax: function* () {
        this.body = { success: true };
    }
}