const Like = require('../models/like');
const Post = require('../models/post');
const Comment = require('../models/comment');


module.exports.toggleLike = async function (req, res) {
    try {

        // URL will be like => /like/toggle/?id=abcdef&type=Post
        let likeable;
        let deleted = false;

        if (req.query.type == "Post") {
            likeable = await Post.findById(req.query.id).populate('likes');
        } else {
            likeable = await Comment.findById(req.query.id).populate('likes');
        }

        // check if like already exists

        let exisitingLike = await Like.findOne({
            likeable: req.query.id,
            onModel: req.query.type,
            user: req.user._id
        })

        // if a like already exists then delete it
        if (exisitingLike) {
            likeable.likes.pull(exisitingLike._id);
            likeable.save();

            exisitingLike.remove();
            deleted = true;
        } else {
            // else make a new like

            let newLike = await Like.create({
                user: req.user._id,
                likeable: req.query._id,
                onModel: req.query.type
            });

            likeable.likes.push(newLike._id);
            likeable.save();

        }

        return res.json(200,{
            message: "Request successfull!",
            data:{
                deleted: deleted
            }
        })
    } catch (err) {
        console.log(`Error in toggleLike!\nError code-${err}`);
        return res.json(500, {
            message: "Interal Server Error"
        })
    }
}