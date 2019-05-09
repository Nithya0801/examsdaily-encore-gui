
<template>
<div>
    <main-header  :currentUser="currentUser"></main-header>
        <sub-header ></sub-header>
<!-- <b-container fluid style="padding: 0px;"> -->
  <!-- <b-navbar sticky toggleable="md" varient="transparent">
   <b-navbar-toggle target="nav_collapse"></b-navbar-toggle>
    <b-navbar-brand href="#" style="padding:0px;">
      <b-col class="text-center" fluid >
       <b-img src="/static/images/exams.svg" height="35"/>
          <div style="font-family: 'Berkshire Swash', cursive; font-size: 1rem;">
           <span style="color: #ec3237ff">exams</span><span  style="color: #406ab2ff">daily</span>
          </div>
       </b-col>
     </b-navbar-brand>
  <b-collapse is-nav id="nav_collapse">
    <b-navbar-nav class="ml-auto">
    </b-navbar-nav>
  </b-collapse>
</b-navbar> -->

 <!-- <b-container fluid style="margin-top:-88px">
    <b-row> -->
      <b-col class="login-screen left-col d-flex  justify-content-center" >
        <div class="left-col-text">
          <!-- <span>Registration Page</span> -->

          <!-- <div style="padding-top:5rem;"> -->
           <b-card  style="max-width: 740px;">
            <b-row >
              <b-col >
                  <b-card-text>
                  <b-form v-if="registerForm" @submit="userRegister">
                      <div >
                      <span style="font-size:25px;font-weight:bold;"> Sign up</span>
                      </div>
                      <div class="text-center ">                     
                      
                      <b-input  class="form-control input"
                        type="text"
                        autofocus
                        v-model="user.contact"
                        placeholder="Email" />

                        <b-input  class="form-control input"
                        type="text"
                        autofocus
                        v-model="user.username"
                        placeholder="Username" />
                    
                      
                      <b-input  class="form-control input"
                        type="text"
                        autofocus
                        v-model="user.mobileNumber"
                        placeholder="Mobile"  />
                                                             
                    <b-form-select class="rounded-pill" v-model="selected" :options="roles" ></b-form-select> 

                        <br><br>
                        <b-button autofocus class="btn-sm btn-block login-btn" type="submit"> Register </b-button>
                        
                        <!--
                        <span>or</span>
                         <div class="text-center">
                        <p class="text-css ml-2 "><a href="#/" >sign in to your account</a></p>
                        </div> -->
                    </div>
                  </b-form>

                  <div class="text-center" v-if="mailLogin">
                      <b><p style="color:#a8acbc;">Check your email for an Account Activation Link</p></b><br>
                      <!-- <b-button autofocus class="btn-sm  login-btn" style="width:150px;"  @click="$emit('loginPage')">
                          Back to Login
                      </b-button> -->
                  </div>

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
                </b-card-text>
                </b-col>
            </b-row>
    
        </b-card>
        </div>
        <!-- </div> -->

        

      </b-col>
      
    <!-- </b-row>
  </b-container> -->
<!-- </b-container> -->
</div>
</template>

<script>
// import axios from 'axios';
import Account from "@/service/Account";
import Global from "@/service/Global";
import MainHeader from '@/components/MainHeader'
import SubHeader from '@/components/SubHeader'
export default {
  name: 'RegistrationPage',
   components:{
        MainHeader,
        SubHeader,
        
    },
  
  data () {
    return { 
      selected : null,
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
        mobileNumber:"",
        roleType:"",
        
      },
        currentUser:null,
      otpLogin:false,
      mailLogin:false,
      registerForm:true,
      verifyId:'',
    }
  },

    async mounted(){
         await Global.onPageRefresh(this.$session, this.$router);
         await this.getUserInfo();
    },
  methods: {
    userRegister: function() {
        console.log("registering..");
        let data = {
        "contact": this.user.contact,
        "username": this.user.username,
        "mobileNumber": this.user.mobileNumber,
        "roleType": this.selected,
        }
        console.log("",data);
        Account.registerApi(data)
        .then(response => {
            console.log("registered in API..",response);
            console.log("verifyId",response.data.verifyId);
            this.verifyId=response.data.verifyId;
            if(/^([a-z0-9_\-.])+@([a-z0-9_\-.])+\.([a-z]{2,4})$/.test(this.user.contact))
            {                    
                console.log("through email");
                this.mailLogin=true;
                this.registerForm=false;
            }else {
                console.log("through mobile");
                this.otpLogin=true;
                this.registerForm=false;
                // console.log("mobile")
            }
        })
        .catch(err => {
            console.log(err);
        })
    },
   
    otpVerify: function() {
      console.log("verifying OTP",this.user.generatedOtp);
      let data={
        "verifyId":this.verifyId,
        "generatedOtp":this.user.generatedOtp,
      }
        return new Promise((resolve, reject) => {
        Account.registerOtpCheck(data)
          .then(response=>{
                console.log("OTP respnse",response.data);
                this.$store.dispatch("getUserDetails", response.data);
                this.$router.replace(this.$route.query.redirect || "/otp_password");
              resolve(response);
          })
          .catch(err=>{
            reject(err);
            console.log(err);
          });
        });
    },
     
    getUserInfo() {
              console.log("getUserInfo called");
      return new Promise((resolve, reject) => {
        if (this.$session.exists("contact")) {
         Account.getUserInfo(this.$session)
            .then(response => {
              // this.$session.set("current_user", response.data);
              this.currentUser = response.data;
              console.log("Currentuser",this.currentUser)
              resolve(response);
              console.log(this.currentUser);
            })
            .catch(err => {
              console.log(err);
              reject(err);
            });
        }
      });
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.left-col{
  height:100vh;
}
.right-col{
  height:90vh;
}
.login-screen {
  /* background-image: url('/static/images/lap.jpg'); */
    /* background-position: center;
    background-repeat: no-repeat;
    background-attachment: fixed;
    background-size: cover; */
    -moz-background-size: cover;
    -webkit-background-size: cover;
    position:relative;
    top: 0;
    bottom: 0;
    right: 0;
    left: 0;
}
.login-screen:before {
    content: "";
    /* background: rgba(0,0,0, 0.1); */
    position: absolute;
    width: 100%;
    height: 100%;
    top: 0;
    left: 0;
}

.input {
  font-size: 15px;
  margin: 15px 0;
  padding: 10px 20px;
  border-color: none;
  border-radius: 25px;
  background-color: #eee;
}

.login-btn{
  /* background-color:#3ec0da; */
   /* background: #1b5a7c; */
   /* background-color:royalblue; */
   background: rgb(17, 203, 228);
   /* color:#1b5a7c; */
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
}

.left-col-text{
margin-top:30px;
color:var(--main-secondary-color);
font-size:15px;
 /* font-weight:bold;  */
}
.right-col-text{
font-weight:bold;
font-size:25px;
margin-right:150px;
}



</style>