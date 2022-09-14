{
  // console.log('hello');
  // method to submit the form data for new post using AJAX 
  let createPost = function () {
    let newPostForm = $('#new-post-form');

    newPostForm.submit(function (e) {
      e.preventDefault();

      $.ajax({
        type: 'post',
        url: '/post/create',
        data: newPostForm.serialize(),
        success: function (data) {
          //console.log(data);
          let newPost = newPostDom(data.data.post);
          $('#post-list-cont>ul').prepend(newPost);
          deletePost($('.delete-post-button', newPost));
          new ToggleLike($(' .toggle-like-button',newPost));
        }, error: function (error) {
          console.log(error.responseText);
        }

      });
    });

  }

  // method to create a post in DOM

  let newPostDom = function (post) {
    return $(`
              <li id="post-${post._id}">
              <div class="post-card">
                <p>${post.content} &nbsp; <small> -${post.user.name} </small> &emsp;
                  <button><a class="delete-post-button" href="/post/destroy/${post._id}">delete post</a></button>
                  <span>
                    <small>
                        <button><a class="toggle-like-button" data-likes="0" href="/likes/toggle/?id=${post._id}&type=Post">
                          0 Likes 
                        </a></button>  
                    </small>
                  </span>
                </p>
        <div class="post-comments">
          <div class="post-comments-list-cont">
            <ul id="post-comments-${post._id}">
            </ul>
          </div>
            <form id="post-${ post._id }-comments-form" action="/comment/create" method="POST">
              <input type="text" name="content" placeholder="Type here to add comment..." required />
              <input type="hidden" name="post" value="${post._id}" />
              <input type="submit" name="" id="" value="Add Comment" />
        </form>
        </div>
        </div>
        </li>
        `)

  }

  // method to delete a post from DOM

  let deletePost = function(deleteLink){
    $(deleteLink).click(function(e){
        e.preventDefault();

        $.ajax({
            type: 'get',
            url: $(deleteLink).prop('href'),
            success: function(data){
                $(`#post-${data.data.post_id}`).remove();
                new Noty({
                    theme: 'relax',
                    text: "Post Deleted",
                    type: 'success',
                    layout: 'topRight',
                    timeout: 1500
                    
                }).show();
            },error: function(error){
                console.log(error.responseText);
            }
        });

    });
}

// loop over all the existing posts on the page (when the window loads for the first time) and call the delete post method on delete link of each, also add AJAX (using the class we've created) to the delete button of each
    let convertPostsToAjax = function(){
        $('#posts-list-container>ul>li').each(function(){
            let self = $(this);
            let deleteButton = $(' .delete-post-button', self);
            deletePost(deleteButton);

            // get the post's id by splitting the id attribute
            let postId = self.prop('id').split("-")[1]
            new PostComments(postId);
        });
    }


  createPost();
  convertPostsToAjax();
}