<template>
  <tr>
    <td><video :src="post.media.url" width="300px" height="200px" controls type="video/mp4"></video>
    </td>
    <td>{{post.user.username}}</td>
    <td>{{post.likes}}</td>
    <td>{{post.createdAt | moment('dddd, MMMM Do YYYY')}}</td>
    <td><button class="btn btn-danger" @click="deletePost(post.objectId)">Remove</button></td>
  
    <!-- modal start here -->
  
    <div class="modal" tabindex="-1" role="dialog">
      <div class="modal-dialog" role="document">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title">Delete Post</h5>
            <button type="button" class="close">
            <span aria-hidden="true">&times;</span>
          </button>
          </div>
          <div class="modal-body">
            <p>Are you sure you want to remove this post?</p>
          </div>
          <div class="modal-footer">
            <button type="button" class="btn btn-secondary" data-dismiss="modal">Cancel</button>
            <button type="button" class="btn btn-primary">Remove</button>
          </div>
        </div>
      </div>
    </div>
  
    <!-- modal ends here -->
  
  </tr>
</template>

<script>
  import {
    Parse,
    Query
  } from 'parse';
  export default {
    name: 'PostsList',
    props: {
      post: Object
    },
    methods: {
      deletePost(objectId) {
        const Post = Parse.Object.extend('Post');
        const query = new Parse.Query(Post);
        // here you put the objectId that you want to delete
        query.get(objectId).then((object) => {
          object.destroy().then((response) => {
            console.log("POST DELETED")
            location.reload()
          })
        }, (error) => {
          console.log(error)
        });
      }
    }
  }
</script>

<style scoped>
  .btn-danger {
    background: rgb(255, 122, 21);
    border-color: rgb(255, 122, 21);
  }
</style>
