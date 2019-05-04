import Vue from 'vue'
import Router from 'vue-router'
import RegistrationPage from '@/components/RegistrationPage'
import LoginPage from '@/components/LoginPage'
import OtpPassword from '@/components/OtpPassword'
import MailPassword from '@/components/MailPassword'

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
    },
    {
      path: '/otp_password',
      name: 'OtpPassword',
      component: OtpPassword,
      // props: true,
    },
    {
      path: '/mail_password',
      name: 'MailPassword',
      component: MailPassword,
      // props: true,
    },
  ]
})
