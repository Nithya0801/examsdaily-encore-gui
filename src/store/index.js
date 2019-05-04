import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

const store = new Vuex.Store({
    state: {      
      userDetails: '',
    //   passwordReset:'',  
    },
    actions: {
      
      getUserDetails(context, data) {
        // console.log('Updating section in vuex');
        context.commit('updateUserDetails', data);
      },    
    //   getMobileDetails(context, data) {
    //     // console.log('Updating section in vuex');
    //     context.commit('updateMobileDetails', data);
    //   }, 
    },
    mutations: {
      
      updateUserDetails: function (state, data) {
        state.userDetails = data;
      },
    //   updateMobileDetails: function (state, data) {
    //     state.passwordReset = data;
    //   },
      
   }
  });
  export default store;