import Vue from 'vue'
import Router from 'vue-router'
import UserImport from '@/components/UserImport'
import LoginPage from '@/components/LoginPage'
// import OtpPassword from '@/components/OtpPassword'
// import MailPassword from '@/components/MailPassword'
import Success from '@/components/Success.vue'
import PreApplication from '@/components/PreApplication'
import ProfilePicture from '@/components/ProfilePicture'


Vue.use(Router)

//export default new Router({
  const routes =  [
    {
      path: '/admin',
      name: 'UserImport',
      component: UserImport,
      meta: {
        requiresAuth: true,
        is_admin:true
      }
    },
    {
      path: '/',
      name: 'LoginPage',
      component: LoginPage
    },
    // {
    //   path: '/otp_password',
    //   name: 'OtpPassword',
    //   component: OtpPassword,
    //   // props: true,
    // },
    // {
    //   path: '/mail_password',
    //   name: 'MailPassword',
    //   component: MailPassword,
    //   // props: true,
    // },
    {
      path: '/success',
      name: 'Success',
      component: Success,
      meta: {
        requiresAuth: true,        
    }
    },
    {
      path: '/preApp',
      name: 'PreApplication',
      component: PreApplication,
      meta: {
        requiresAuth: true,
        is_admin:true
    }
    },
    {
      path: '/profile',
      name: 'ProfilePicture',
      component: ProfilePicture
    },
   
  ];

  const router = new Router({ routes });


// router.beforeEach((to, from, next) => {
//   var data = {};
//   data = JSON.parse(localStorage.getItem("vue-session-key")) == null ? {} : JSON.parse(localStorage.getItem("vue-session-key"));
//   // if(data!=null)
//   // console.log('Checking Logging info...', data.access_token);
//   // if (to.matched.some(record => record.meta.requiresAuth) &&  data!=null?!data.hasOwnProperty('access_token'):false){
 
//   console.log("Access Token : ",data.hasOwnProperty('access_token'));
//   if (to.matched.some(record => record.meta.requiresAuth) && !data.hasOwnProperty('access_token')) {
    
//     console.log("if block called");
//           next({
//               path: '/',
//               query: {
//                   redirect: to.fullPath
//               }
//           });
      
     
//   // } else {
//   //     if (to.matched.some(record => record.meta.is_admin)) {
//   //         let roles = data.current_user.roles
//   //         let state = false;
//   //         for (let i = 0; i < roles.length; i++) {
//   //             if (roles[i].roleName == 'ROLE_ADMIN') {
//   //                 state = true;
//   //                 next();
//   //             }
//   //         }
//   //         if (!state) {
//   //             next({
//   //                 path: '/',
//   //                 query: {
//   //                     redirect: to.fullPath
//   //                 }
//   //             });
//   //         }
//       } else {
//         console.log("else block called"+next());
//           //next();
//       }
  
// });
router.beforeEach((to, from, next) => {
  var data = {};
  data = JSON.parse(localStorage.getItem("vue-session-key")) == null ? {} : JSON.parse(localStorage.getItem("vue-session-key"));
  // if(data!=null)
  // console.log('Checking Logging info...', data.access_token);
  // if (to.matched.some(record => record.meta.requiresAuth) &&  data!=null?!data.hasOwnProperty('access_token'):false){
  if (to.matched.some(record => record.meta.requiresAuth) && !data.hasOwnProperty('access_token')) {
      if (to.matched.some(record => record.meta.is_admin)) {
          next({
              path: '/',
              query: {
                  redirect: to.fullPath
              }
          });
      } else {
          next({
              path: '/',
              query: {
                  redirect: to.fullPath
              }
          });
      }
  } else {
      if (to.matched.some(record => record.meta.is_admin)) {
          let roles = data.current_user.roles
          let state = false;
          for (let i = 0; i < roles.length; i++) {
              if (roles[i].roleName == 'ROLE_ADMIN') {
                  state = true;
                  next();
              }
          }
          if (!state) {
              next({
                  path: '/',
                  query: {
                      redirect: to.fullPath
                  }
              });
          }
      } else {
          next();
      }
  }
});


export default router;
