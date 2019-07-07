var express = require('express')
var mongoose = require('mongoose')
var bodyParser = require('body-parser')
const flash = require('express-flash')
const session = require('express-session')

mongoose.connect('mongodb://localhost/messageDashboard',{ useNewUrlParser: true })
const CommentSchema = new mongoose.Schema({
    commenter: { type: String, required: [true,'Commenter cannot be empty']},
    comment: { type: String, required: [ true, 'Comment cannot be empty']},},
    {timestamps: true})

const MessageSchema = new mongoose.Schema({
    name:{type: String, required: [ true, 'Name cannot be empty' ]},
    message: { type: String, required: [true,'Message cannot be empty']},
    comments: [ CommentSchema ]},
    { timestamps:true })

const Message = mongoose.model('Message', MessageSchema)

var app = express()
app.set('views',__dirname+'/views')
app.set('view engine','ejs')
app.use(bodyParser.urlencoded({extended: true}))
app.use(flash())
app.use(session({
    secret:'keyboard cat',
    resave: false,
    saveUninitialized: true,
    cookie: { maxAge: 60000 }
}))

app.get('/',function(req,res){
    Message.find({},function(err,messages){
        if(err){
            res.redirect('/')
        }else{
            console.log(messages)
            res.render('index',{messages: messages})
        }
    })
})


app.post('/postMessage',function(req,res){
    var newMessage = new Message(req.body)
    newMessage.save(function(err){
        if(err){
            console.log('there is a error when posting',err.errors)
            for(var e in err.errors){
                req.flash('postMsg',err.errors[e].message)   
            }
            res.render('validation',{errors: newMessage.errors })
        }else{
            console.log('success added a user')
            res.redirect('/')
        }
    })
})

app.post('/newComment/:id',function(req,res){
    Message.findById({_id: req.params.id},function(err,msg){
        if(err){
            res.redirect('/')
        }else{
            msg.comments.push(req.body)
            msg.save()
            console.log('success added a comment')
            res.redirect('/')
    }})
})

app.listen(8000,function(){
    console.log('listening on port 8000')
})