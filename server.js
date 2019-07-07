var express = require('express')
var bodyParser = require('body-parser')
const flash = require('express-flash')
const session = require('express-session')
var app = express()

app.set('views',__dirname+'/client/views')
app.set('view engine','ejs')

app.use(bodyParser.urlencoded({extended: true}))
app.use(flash())
app.use(session({
    secret:'keyboard cat',
    resave: false,
    saveUninitialized: true,
    cookie: { maxAge: 60000 }
}))

require("./server/config/routes")(app)

app.listen(8000,function(){
    console.log('listening on port 8000')
})