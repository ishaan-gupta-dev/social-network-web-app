const Post = require('../../../models/post');
const Comment = require('../../../models/comment');

module.exports.index = async function (req, res) {

    let posts = await Post.find({})
        .sort('-createdAt')
        .populate('user')
        .populate({
            path: 'comment',
            populate: {
                path: 'user'
            }
        })
    return res.json(200, {
        message: "List of posts",
        posts: posts
    });
}


module.exports.destroyPost = async function (req, res) {
    try {
        let post = await Post.findById(req.params.id);
        //.id means converting the object id into string
        if (post.user == req.user.id) {
            post.remove();

            await Comment.deleteMany({
                post: req.params.id,
            });
            return res.status(200).json({
                data: {
                    post_id: req.params.id
                },
                message: "Post deleted!"
            });
        } else {
            return res.json(401, {
                message: "Unauthorized! You are not allowed to delete this post"
            })
        }

    } catch (err) {
        console.log(`Error: ${err}! \nCannot delete the post`);
        return res.json(500, {
            message: "Internal Server Error"
        });
    }

}