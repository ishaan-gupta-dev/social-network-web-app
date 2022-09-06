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
        }, error: function (error) {
          console.log(error.responseText);
        }

      });
    });

  }

  // method to create a post in DOM

  let newPostDom = function (post) {
    return $(`
            <div class="post-card">
              <li id="post-${post._id}">
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
              </li>
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
        `)

  }

  // method to delete a post from DOM

  let deletePost = function (deleteLink) {
    console.log(deleteLink);
    $(deleteLink).click(function (e) {
      e.preventDefault();

      $.ajax({
        type: 'get',
        url: $(deleteLink).prop('href'),
        success: function (data) {
          $(`#post-${data.data.post_id}`).remove();
        }, error: function (error) {
          console.log(error.responseText);
        }
      });
    });
  }

  createPost();
}