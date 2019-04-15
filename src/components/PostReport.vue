<template>
  <div>
    <nav class="navbar navbar-expand-lg navbar-dark bg-dark">
      <img src="/shamarcms/static/img/profilenopic.jpg" width="50px" height="50px">
      <a class="navbar-brand" href="#">Shamar</a>
      <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
            <span class="navbar-toggler-icon"></span>
          </button>
      <div class="collapse navbar-collapse" id="navbarNav">
        <ul class="navbar-nav">
          <li class="nav-item">
            <router-link class="nav-link" to="/Posts">POSTS<span class="sr-only">(current)</span></router-link>
          </li>
          <li class="nav-item">
            <router-link class="nav-link" to="/Users">USERS</router-link>
          </li>
          <li class="nav-item">
            <router-link class="nav-link" to="/Reports">REPORTED VIDEOS</router-link>
          </li>
          <li class="nav-item">
            <router-link class="nav-link" to="/Ads">ADS</router-link>
          </li>
          <li class="nav-item">
            <a class="nav-link" @click="logoutUser" href="#">LOGOUT</a>
          </li>
        </ul>
      </div>
    </nav>
  
    <div class="container mt-3">
      <table class="table">
        <thead>
          <tr>
            <th scope="col">VIDEO</th>
            <th scope="col">USERNAME</th>
            <th scope="col">LIKES</th>
            <th scope="col">DATE ADDED</th>
            <th scope="col">ACTIONS</th>
          </tr>
        </thead>
        <tbody>
          <ReportList v-for="item in postsList" :post="item" :key="item.id" />
        </tbody>
      </table>
    </div>
  
  </div>
</template>

<script>
  import {
    Parse,
    Query
  } from 'parse';
  import ReportList from '@/components/ReportList';
  export default {
    components: {
      ReportList
    },
    data() {
      return {
        postsList: []
      }
    },
  
    mounted: function() {
      this.getPosts();
    },
    methods: {
      logoutUser: function() {
        Parse.User.logOut().then((user) => {
          console.log(user);
          this.$router.push('/')
        }).catch(error => {
          console.error(error);
        })
      },
      getPosts: function() {
        var self = this;
        var list = Parse.Object.extend('Post');
        var query = new Parse.Query(list);
        query.include("user");
        query.find().then((results) => {
          for (let i = 0; i < results.length; i++) {
            results[i] = results[i].toJSON();
          }
          self.postsList = results;
          console.log(self.postsList[0].media)
        }, (error) => {
          console.log(error)
        })
      }
    }
  }
</script>

<style scoped>
  .navbar-nav {
    font-weight: bold;
    color: rgb(255, 255, 255);
  }
  
  .navbar img {
    margin-left: 20px;
    border-radius: 50%;
  }
  
  .navbar-brand {
    margin-left: 20px;
  }
</style>