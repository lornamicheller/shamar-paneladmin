<template>
  <tr>
    <td><img :src="Ad.image.url" width="100px" height="100px">
    </td>
    <td>{{Ad.title}}</td>
    <td><button class="btn btn-danger" @click="deleteAd(Ad.objectId)">Remove</button></td>
  
    <!-- modal start here -->
  
    <!-- <div class="modal" tabindex="-1" role="dialog" v-if="showModal">
      <div class="modal-dialog" role="document">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title">Delete Ad</h5>
            <button type="button" class="close" data-dismiss="modal">
                <span aria-hidden="true">&times;</span>
              </button>
          </div>
          <div class="modal-body">
            <p>Are you sure you want to remove this Ad?</p>
          </div>
          <div class="modal-footer">
            <button type="button" class="btn btn-secondary">Cancel</button>
            <button type="button" class="btn btn-primary" @click="deleteAd(Ad.objectId)">Remove</button>
          </div>
        </div>
      </div>
    </div> -->
  
    <!-- modal ends here -->
  
  </tr>
</template>

<script>
  import {
    Parse,
    Query
  } from 'parse';
  export default {
  
    data() {
      return {
        showModal: false
      }
    },
  
    name: 'AdsList',
    props: {
      Ad: Object
    },
    methods: {
      deleteAd(objectId) {
        const Ad = Parse.Object.extend('Ads');
        const query = new Parse.Query(Ad);
        // here you put the objectId that you want to delete
        query.get(objectId).then((object) => {
          object.destroy().then((response) => {
            console.log("AD DELETED")
            this.close()
            location.reload()
          })
        }, (error) => {
          console.log(error)
        });
      },
      open() {
        this.show = true;
      },
      close() {
        this.show = false;
      }
    }
  }
</script>

<style scoped>
  .btn-danger {
    background: rgb(255, 122, 21);
    border-color: rgb(255, 122, 21);
    font-size: 20px;
  }
</style>
