import Vue from 'vue'
import Router from 'vue-router'
import HelloWorld from '@/components/HelloWorld'
import Posts from '@/components/Posts'
import PostReport from '@/components/PostReport'
import Users from '@/components/Users'
import Ads from '@/components/Ads'
import {
  User
} from 'parse'

Vue.use(Router)
/*eslint-disable*/
export default new Router({
  routes: [
    {
      path: '/',
      name: 'HelloWorld',
      component: HelloWorld,
      beforeEnter(to, from, next) {
        var currentUser = User.current();
        if (!currentUser) {
          next()
        } else {
          next('/Posts')
        }
      }
    },
    {
      path: '/Posts',
      name: 'Home',
      component: Posts,
      beforeEnter(to, from, next) {
        var currentUser = User.current();

        if (currentUser) {
          next();
        } else {
          next("/");
        }
      }
    },
    {
      path: '/Reports',
      name: 'Reports',
      component: PostReport,
      beforeEnter(to, from, next) {
        var currentUser = User.current();

        if (currentUser) {
          next();
        } else {
          next("/");
        }
      }
    },
    {
      path: '/Users',
      name: 'Users',
      component: Users,
      beforeEnter(to, from, next) {
        var currentUser = User.current();

        if (currentUser) {
          next();
        } else {
          next("/");
        }
      }
    },
    {
    path:'/Ads',
    name: 'Ads',
    component: Ads,
    beforeEnter(to, from, next) {
      var currentUser = User.current();

      if (currentUser) {
        next();
      } else {
        next("/");
      }
    }
  }
  ]
})
