import { RouteConfig } from 'vue-router'
import Layout from '@/layout/index.vue'

const driverRouter: RouteConfig = {
  path: '/driver',
  component: Layout,
  redirect: '/driver/list',
  name: 'Driver',
  meta: {
    title: 'driverList',
    icon: 'driver',
    apiUrl: 'root'
  },
  children: [
    {
      path: 'list',
      component: () => import(/* webpackChunkName: "driver" */ '@/views/driver/list.vue'),
      name: 'DriverList',
      meta: {
        apiUrl: '/bss/v1/bss/driver/selectListByKey',
        title: 'driverList',
        noCache: false
      }
    },
    {
      path: 'detail',
      component: () => import(/* webpackChunkName: "driver" */ '@/views/driver/detail.vue'),
      name: 'DriverDetail',
      meta: {
        title: 'driverDetail',
        apiUrl: 'root'
      }
    }
  ]
}

export default driverRouter
