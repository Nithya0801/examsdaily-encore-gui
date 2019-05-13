
<template>
<div>
    <!-- <main-header :role="role" :currentUser="currentUser"></main-header>
        <sub-header :role="role"></sub-header> -->

       <b-modal id="registrationPage"
             :header-text-variant="headerTextVariant"
              hide-footer
              title="Add User"
              ref="registrationPage">
 <b-container style="margin-left:60px;padding:30px ">
      <!-- <b-col class="login-screen left-col d-flex  justify-content-center" >
        <div class="left-col-text">
           <b-card  style="max-width: 740px;">            
            <b-row >
              <b-col >
                  <b-card-text> -->
          <b-form @submit.prevent="userRegister">                     
              
              <b-row> <b-col cols="8">
                <span style="font-size:20px;font-weight:bold;"> Enter details </span>
                
                </b-col> </b-row>

              <b-row> <b-col cols="8">
                <b-input  class="form-control input"
                type="text"
                autofocus
                v-model="user.username"
                placeholder="Username" /> 
                <div v-if="$v.user.$dirty">
                  <p class="error-message" v-if="!$v.user.username.required">Field is required</p>                   
                </div> </b-col></b-row>

              <b-row> <b-col cols="8">
                <b-input  class="form-control input"
                type="text"
                autofocus
                v-model="user.contact"
                placeholder="Email/Mobile" />
                <div v-if="$v.user.$dirty">
                  <p class="error-message" v-if="!$v.user.contact.required">Field is required</p>                   
                </div>  </b-col></b-row>

              <b-row> <b-col cols="8">
                <b-input  class="form-control input"
                type="text"
                autofocus
                v-model="user.password"
                placeholder="Password"  />
                <div v-if="$v.user.$dirty">
                  <p class="error-message" v-if="!$v.user.password.required">Field is required</p>
                  <p class="error-message" v-if="!$v.user.password.minLength">Minimum 6 Characters</p>                   
                </div>  </b-col></b-row>

              <b-row> <b-col cols="8" style="padding-top:1em;">
                <b-form-select class="rounded-pill" v-model="selected" :options="roles" ></b-form-select> 
                <div v-if="$v.user.$dirty">
                  <p class="error-message" v-if="!$v.user.selected.required">Field is required</p>                   
                </div>                
              </b-col></b-row>
          <br>
              <b-row> <b-col cols="4">
                <b-button class="btn-sm btn-edit" style="margin-left:25px;" type="submit">Add</b-button>
              </b-col><b-col cols="4">  <b-button class="btn-sm btn-edit" @click="resetData">Reset</b-button>
              </b-col></b-row>
                      <!-- <div class="text-center ">                     
                      
                      <b-input  class="form-control input"
                        type="text"
                        autofocus
                        v-model="user.username"
                        placeholder="Username" />

                      <b-input  class="form-control input"
                        type="text"
                        autofocus
                        v-model="user.contact"
                        placeholder="Email/Mobile" />    
                      
                      <b-input  class="form-control input"
                        type="text"
                        autofocus
                        v-model="user.password"
                        placeholder="Password"  />
                                                             
                    <b-form-select class="rounded-pill" v-model="selected" :options="roles" ></b-form-select> 

                        <br><br>
                        <b-button autofocus class="btn-sm btn-block login-btn" type="submit"> Register </b-button>
                   
                    </div> -->
                  </b-form>

                  <!-- <div class="text-center" v-if="mailLogin">
                      <b><p style="color:#a8acbc;">Check your email for an Account Activation Link</p></b><br>
                   
                  </div> -->

                  <!-- <div class="text-center" v-if="otpLogin">
                    <b><p style="color:#a8acbc;">Check your mobile for an OTP for Account Activation</p></b>
                      <b-input  class="form-control input"
                              type="password"
                              autofocus
                              v-model="user.generatedOtp"
                              placeholder="OTP"/>
                        <b-col class="d-flex justify-content-between" >
                     
                        <b-button autofocus class="btn-sm btn-block login-btn" @click="otpVerify" >
                            Verify
                        </b-button>
                  </b-col>
                </div> -->
                <!-- </b-card-text>
                </b-col>
            </b-row>
        </b-card>
        </div>
      </b-col>   -->
 </b-container> 
    </b-modal>
<!-- 
<import-modal :show="showImportModal" :list="importList" @import="listImport" @close="close"></import-modal>
<user-import-status-modal
      :show="showUserImportStatusModal"
      :items="userImportStatus"
      @close="showUserImportStatusModal=false;"
    ></user-import-status-modal> -->


</div>
</template>

<script>
// import axios from 'axios';
import Account from "@/service/Account";
import Global from "@/service/Global";
import { required,minLength} from "vuelidate/lib/validators";
// import MainHeader from '@/components/MainHeader'
// import SubHeader from '@/components/SubHeader'
// import ImportModal from '@/components/ImportModal'
// import UserImportStatusModal from '@/components/UserImportStatusModal'

export default {
  name: 'RegistrationPage',
   components:{
        // MainHeader,
        // SubHeader,
        // ImportModal,
        // UserImportStatusModal,
    },
    validations: {
     user:{
       username:{         
         required,
       },
       contact:{
         required,
       },
        password: {
          required,
          minLength:minLength(6),
      },
      selected: {
        required
      }
     }
  },
  
  data () {
    return { 
      selected : null,
      headerBgVariant: "info",
      headerTextVariant: "success",
      roles :[
              {text:'--Select Role--', value:null},
              {text:'ROLE_STUDENT', value:'ROLE_STUDENT'},
              {text:'ROLE_STAFF',value:'ROLE_STAFF'},
               {text:'ROLE_ACCOUNTS',value:'ROLE_ACCOUNTS'},
                {text:'ROLE_MANAGER',value:'ROLE_MANAGER'},
                 {text:'ROLE_TELECALLER',value:'ROLE_TELECALLER'}
            ],     
      user: {
        contact: "",
        username:"",
        password:"",
        roleType:"",        
      },
      // currentUser:null,
      // otpLogin:false,
      // mailLogin:false,
      // registerForm:true,
      // verifyId:'',
      // role:'',
      // importList: [],
      // showImportModal: false,
      // userImportStatus: [],
      // showUserImportStatusModal: false,
    }
  },

    // async mounted(){
    //      await Global.onPageRefresh(this.$session, this.$router);
    //      await this.getUserInfo();
    // },
  methods: {
    userRegister: function() {
        console.log("registering..");
        this.$v.$touch();
        let data = {
        "contact": this.user.contact,
        "username": this.user.username,
        "password": this.user.password,
        "roleType": this.selected,
        }
        console.log("",data);
        Account.registerApi(data)
        .then(response => {
            console.log("registered in API..",response);
            this.$refs.registrationPage.hide();
            // console.log("verifyId",response.data.verifyId);
            // this.verifyId=response.data.verifyId;
            // if(/^([a-z0-9_\-.])+@([a-z0-9_\-.])+\.([a-z]{2,4})$/.test(this.user.contact))
            // {                    
            //     console.log("through email");
            //     this.mailLogin=true;
            //     this.registerForm=false;
            // }else {
            //     console.log("through mobile");
            //     this.otpLogin=true;
            //     this.registerForm=false;
            //     // console.log("mobile")
            // }
        })
        .catch(err => {
            console.log(err);
        })
    },
    resetData: function() {
        this.user.username='',
        this.user.contact='',
        this.user.password='',
        this.selected=null,
         this.$v.$reset();
    },
   
    // otpVerify: function() {
    //   console.log("verifying OTP",this.user.generatedOtp);
    //   let data={
    //     "verifyId":this.verifyId,
    //     "generatedOtp":this.user.generatedOtp,
    //   }
    //     return new Promise((resolve, reject) => {
    //     Account.registerOtpCheck(data)
    //       .then(response=>{
    //             console.log("OTP respnse",response.data);
    //             this.$store.dispatch("getUserDetails", response.data);
    //             this.$router.replace(this.$route.query.redirect || "/otp_password");
    //           resolve(response);
    //       })
    //       .catch(err=>{
    //         reject(err);
    //         console.log(err);
    //       });
    //     });
    // },
     
    // getUserInfo() {
    //           console.log("getUserInfo called");
    //   return new Promise((resolve, reject) => {
    //     if (this.$session.exists("contact")) {
    //      Account.getUserInfo(this.$session)
    //         .then(response => {
    //           // this.$session.set("current_user", response.data);
    //           this.currentUser = response.data;
    //           this.role = this.currentUser.roles[0].roleName;
    //           console.log("Currentuser",this.currentUser)
    //           resolve(response);
    //           console.log(this.currentUser);
    //         })
    //         .catch(err => {
    //           console.log(err);
    //           reject(err);
    //         });
    //     }
    //   });
    // },
    // checkSelectedFile(convertedData) {
    //   // console.log(convertedData);
    //   this.importList.splice(0);
    //   if (convertedData && convertedData.body) {
    //     var userData = convertedData.body;
    //     if (
    //       userData[0].hasOwnProperty("Name") &&
    //       userData[0].hasOwnProperty("Contact") &&
    //       userData[0].hasOwnProperty("Password") &&
    //       userData[0].hasOwnProperty("Role")
    //     ) {
    //       for (var i = 0; i < userData.length; i++) {
    //         this.importList.push({
    //           username: userData[i].Name,
    //           contact: userData[i].Contact,
    //           password: userData[i].Password,
    //           roleType: userData[i].Role,
    //           registerMode: "DIRECT"
    //         });
    //       }          
    //       this.showImportModal = true;
    //       // console.log("import");
    //     } else {
    //       toast({
    //         type: "error",
    //         title: "File does not matches the given format"
    //       });
    //     }
    //   }
    // },
    // listImport: function(data) {
    //   // for (let i = 0; i < data.length; i++) {
    //   Account.bulkImport(data)
    //     .then(response => {
    //       // toast({
    //       //   type: "success",
    //       //   title: "User Inserted Successfully"
    //       // });
    //       console.log(response);
    //       this.userImportStatus = response.data;
    //       // this.getUsers(this.pageCount, this.currentPage);
    //       // this.totalUsers(this.totalUsersCount);
    //       // this.getAllUsers();
    //       this.showUserImportStatusModal = true;
          
    //     })
    //     .catch(err => {
    //       // toast({
    //       //   type: "error",
    //       //   title: err.response.data
    //       // });
    //       console.log(err);
    //       // this.isLoading = false;
    //     });
    //   // }
    //   this.showImportModal = false;
    // },
    //  close: function() {
    //   this.showImportModal = false;
    // },
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.left-col{
  height:100vh;
}
.btn-edit{
  width:85px;
  border-radius:20px;
  background-color:#00A1B5;
  font-size:15px;
  font-weight:bold;
}
.error-message {
  color: red;
  font-size: 13px;
  margin: 5px 0 0 5px;
}
/* .right-col{
  height:90vh;
} */
/* .login-screen {
  
    -moz-background-size: cover;
    -webkit-background-size: cover;
    position:relative;
    top: 0;
    bottom: 0;
    right: 0;
    left: 0;
} */
/* .login-screen:before {
    content: "";    
    position: absolute;
    width: 100%;
    height: 100%;
    top: 0;
    left: 0;
} */

.input {
  font-size: 15px;
  margin: 15px 0;
  padding: 10px 20px;
  border-color: none;
  border-radius: 25px;
  background-color: #eee;
}

/* .login-btn{  
   background: rgb(17, 203, 228);
   color:#ffff;
   border-radius: 25px;
   border-color: #0000;
  font-weight:bold;
  font-size:18px;
}
.login-btn:hover{
  color: #ffff;
  background: rgb(0, 160, 190);
  border-color: #0000;
} */

/* .left-col-text{
margin-top:30px;
color:var(--main-secondary-color);
font-size:15px;
} */
/* .right-col-text{
font-weight:bold;
font-size:25px;
margin-right:150px;
} */
/* .register-card {
  box-shadow: 10px 15px 20px #b1aeae;
} */



</style>