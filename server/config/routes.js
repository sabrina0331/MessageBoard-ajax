const controller = require('../controllers/controller')

module.exports = function(app){
    app.get('/',controller.index),
    app.post('/postMessage',controller.postMessage),
    app.post('/newComment/:id',controller.addComment)
}