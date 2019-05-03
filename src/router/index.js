import Vue from 'vue'
import Router from 'vue-router'
import RegistrationPage from '@/components/RegistrationPage'
import LoginPage from '@/components/LoginPage'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'RegistrationPage',
      component: RegistrationPage
    },
    {
      path: '/login',
      name: 'LoginPage',
      component: LoginPage
    }
  ]
})
