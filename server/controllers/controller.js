const Message = require('../models/Message')

module.exports = {
    index: function(req,res){
        Message.find({},function(err,messages){
            if(err){
                res.redirect('/')
            }else{
                console.log(messages)
                res.render('index',{messages: messages})
            }
        })
    },

    postMessage: function(req,res){
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
    },
    addComment: function(req,res){
        Message.findById({_id: req.params.id},function(err,msg){
            if(err){
                res.redirect('/')
            }else{
                msg.comments.push(req.body)
                msg.save()
                console.log('success added a comment')
                res.redirect('/')
        }})
    }
}

   