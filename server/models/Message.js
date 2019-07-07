const mongoose = require('mongoose')

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

module.exports = mongoose.model('Message',MessageSchema)
const Message = mongoose.model('Message')