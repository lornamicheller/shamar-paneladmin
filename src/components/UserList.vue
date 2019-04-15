<template>
  <tr>
    <td>{{user.username}}</td>
    <td>{{user.user_email}}</td>
    <td>{{user.createdAt| moment('dddd, MMMM Do YYYY')}}</td>
    <td>{{user.followers}}</td>
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
      user: Object
    },
  
  }
</script>

<style scoped>
  .btn-danger {
    background: rgb(255, 122, 21);
    border-color: rgb(255, 122, 21);
  }
</style>