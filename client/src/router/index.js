import Home from '../views/Home.vue'
import Locations from '@/views/Locations.vue'
import OrderNew from '../views/OrderNew.vue'
import Vue from 'vue'
import VueRouter from 'vue-router'
import goTo from 'vuetify/es5/services/goto'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'home',
    component: Home,
  },
  {
    path: '/locations',
    name: 'locations',
    component: Locations,
  },
  {
    path: '/order/:location',
    name: 'order',
    component: OrderNew,
    props: true,
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    //component: () =>
    //import(/* webpackChunkName: "about" */ '../views/About.vue'),
  },
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  scrollBehavior(to, from, savedPosition) {
    let scrollTo = 0

    if (to.hash) {
      scrollTo = to.hash
    } else if (savedPosition) {
      scrollTo = savedPosition.y
    }

    return goTo(scrollTo, {
      easing: 'easeInOutCubic',
      duration: 750,
      offset: 0,
    })
  },
  routes,
})

router.b

export default router
