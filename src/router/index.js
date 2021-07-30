import Vue from 'vue'
import Router from 'vue-router'
import index from '@/components/pages/index'
import register from '@/components/pages/register'
import login from '@/components/pages/login'
import goods from '@/components/pages/goods'
import categoryList from '@/components/pages/categoryList'
import cart from '@/components/pages/cart'
import main from '@/components/pages/main'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/main', name: 'main', component: main,
      children: [
        {
          path: '/',
          name: 'index',
          component: index
        },
        {
          path: '/categoryList',
          name: 'categoryList',
          component: categoryList
        },
        {
          path: '/cart',
          name: 'cart',
          component: cart
        }
      ]
    },
    {
      path: '/register',
      name: 'register',
      component: register
    },
    {
      path: '/login',
      name: 'login',
      component: login
    },
    {
      path: '/goods',
      name: 'goods',
      component: goods
    },


  ]
})
