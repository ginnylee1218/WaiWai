import Vue from 'vue'
import Router from 'vue-router'
// import Home from './views/Front/Home.vue'

Vue.use(Router)

export default new Router({
  scrollBehavior(to, from, savedPosition) {
    return { x: 0, y: 0 };
  },
  routes: [
    {
      path: '*', //隨機輸入path
      redirect: '/' //都前往此路徑
    },
    {
      path: '/',
      component: () => import('./views/Layout.vue'),
      children: [
        {
          path: '/',
          name: 'Home',
          component: () => import('./views/Front/Home.vue'),
        },
        {
          path: 'girls',
          name: 'Girls',
          component: () => import('./views/Front/Girls.vue'),
        },
        {
          path: 'boys',
          name: 'Boys',
          component: () => import('./views/Front/Boys.vue'),
        },
        {
          path: 'accessories',
          name: 'Accessories',
          component: () => import('./views/Front/Accessories.vue'),
        },
        {
          path: 'detail/:productId',
          name: 'Product',
          component: () => import('./views/Front/Product.vue'),
        },
         
        {
          path: 'checkout',
          name: 'Checkout',
          component: () => import('./views/Front/Checkout.vue'),
        },
        
      ]
    },
    
    //後台路由
    {
      path: '/admin',
      //name: 'Dashboard',
      component: () => import('./views/Dashboard.vue'),
      children: [
        {
          path: 'products',
          name: 'Products',
          component: () => import('./views/Admin/ProductsManage.vue'),
          meta: { requiresAuth: true }
        },
        {
          path: 'orders',
          name: 'Orders',
          component: () => import('./views/Admin/OrdersManage.vue'),
          meta: { requiresAuth: true }
        },
        {
          path: 'coupons',
          name: 'Coupons',
          component: () => import('./views/Admin/Coupons.vue'),
          meta: { requiresAuth: true }
        }
      ]
    },
  ]
})
