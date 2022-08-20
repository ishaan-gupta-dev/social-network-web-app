const Comment = require('../models/comment');
const Post = require('../models/post');

module.exports.createComment = function (req, res) {
    Post.findById(req.body.post, function (err, post) {

        if (err) {
            console.log(`Error ${err} \nCannot find the post`);
            return;
        }
        if (post) {
            Comment.create({
                content: req.body.content,
                user: req.user._id,
                post: req.body.post
            }, function (err, comment) {
                if (err) {
                    console.log(`Error ${err} \nCannot create the comment`);
                    return;
                }
                post.comment.push(comment);
                post.save();
                res.redirect('back');
            });
        }
    });

}

module.exports.destroyComment = function(req,res){
    Comment.findById(req.params.id, function(err,comment){
        if(comment.user == req.user.id){
            let postId = comment.post;

            comment.remove();

            Post.findByIdAndUpdate(postId, {$pull: {comment: req.params.id}},function(err,post){
                return res.redirect('back'); 
            })
        }else{
            return res.redirect('back');
        }
    })
}
