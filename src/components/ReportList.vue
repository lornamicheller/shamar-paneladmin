<template>
  <tr>
    <td><img :src="post.imagen.url" width="300px" height="200px">
    </td>
    <td>{{post.user.username}}</td>
    <td>{{post.likes}}</td>
    <td>{{post.createdAt | moment('dddd, MMMM Do YYYY')}}</td>
    <td><button class="btn btn-danger" @click="deletePost(post.objectId)">Remove</button></td>
  </tr>
</template>

<script>
  import {
    Parse,
    Query
  } from 'parse';
  export default {
    name: 'ReportList',
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