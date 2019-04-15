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
          <li class="nav-item right">
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
  
    <div class="container">
      <form>
        <div class="form-group">
          <label for="title">Ad Title:</label>
          <input type="text" class="form-control" id="text" v-model="title">
  
        </div>
        <input type="file" class="btn btn-primary" id="adphoto">
        <div>
          <button type="submit" class="btn btn-save" @click="saveAd">Save</button>
        </div>
      </form>
    </div>
  
    <div class="container">
      <table class="table">
        <thead>
          <tr>
            <th scope="col">IMAGE</th>
            <th scope="col">TITLE</th>
            <th scope="col">ACTION</th>
          </tr>
        </thead>
        <tbody>
          <AdsList v-for="item in adsList" :Ad="item" :key="item.id"></AdsList>
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
  import AdsList from '@/components/AdsList'
  export default {
    components: {
      AdsList
    },
    data() {
      return {
        adsList: [],
        title: null,
        parseFile: null
      }
    },
    mounted: function() {
      this.getAds();
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
      getAds: function() {
        var self = this;
        var list = Parse.Object.extend('Ads');
        var query = new Parse.Query(list);
        query.find().then((results) => {
          for (let i = 0; i < results.length; i++) {
            results[i] = results[i].toJSON();
          }
          self.adsList = results;
          console.log()
        }, (error) => {
          console.log(error)
        })
      },
      // onFileChange(event) {
      //   var files = event.target.files || event.dataTransfer.files;
      //   if (!files.length)
      //     return;
      //   console.log("##FILE", files[0])
      //   this.parseFile = new File(files[0].name, files[0])
      //   alert("Image has been changed")
      // },
      saveAd() {
        var fileUpload = $('#adphoto')[0];
        if (fileUpload.files.length > 0) {
          var file = fileUpload.files[0];
          var name = "photo.jpg";
          var parseFile = new Parse.File(name, file)
  
          const Ads = Parse.Object.extend('Ads');
          const myNewObject = new Ads();
          myNewObject.set('title', this.title);
          myNewObject.set('image', parseFile);
  
          myNewObject.save().then(
            (result) => {
              console.log(result);
              location.reload()
            },
            (error) => {
              console.log(error)
            }
          )
        }
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
  
  .form-group label {
    font-size: 20px;
    padding-top: 100px;
  }
  
  #text {
    width: 400px;
    margin: auto;
    border-radius: 0;
    border-style: none;
    border-bottom: 1px solid;
  }
  
  .btn-primary {
    background: rgb(255, 122, 21);
    border-color: rgb(255, 122, 21);
    margin-bottom: 5px;
    font-size: 20px;
  }
  
  .btn-save {
    background: rgb(255, 122, 21);
    border-color: rgb(255, 122, 21);
    margin-bottom: 25px;
    font-size: 20px;
    color: rgb(255, 255, 255);
  }
</style>