<template>
<div>
    <main-header :role="role" :currentUser="currentUser"></main-header>
    <sub-header :role="role"></sub-header>

    <!-- <b-container fluid style="margin-top:-88px">
    <b-row>
      <b-col cols="12" md="8" class="login-screen left-col d-flex  justify-content-center" >
        <div class="left-col-text">
        </div>
      </b-col>
    </b-row>
    </b-container> -->
    <b-container>
        <div>
           <!-- <b-card  style="max-width: 740px;"> -->
        <b-row>
            <b-col>
    <b-img src="/static/images/sys.jpeg"></b-img>
            </b-col>
            <b-col>
               <h3> <font style="bold">Encore</font> </h3>

              The Software is a fully computerized system or more precisely a database where all the student related data can be stored, retrieved, monitored and analyzed. The data is saved in one central location which can be accessed by multiple persons at the same time provided they have the login credentials, this ensures the safety of the stored information. Registration, demand generation, admission, billing, provision of financial aid to students and many other things can be managed with ease making the whole process of student enrollment quick, error free, systematic and undemanding.
            </b-col>
        
    <b-col>
              
    <b-img src="/static/images/sample.png"></b-img>
    </b-col>
            
        </b-row>
           <!-- </b-card> -->
        </div>
    </b-container>
    </div>
</template>

<script>
import MainHeader from '@/components/MainHeader'
import SubHeader from '@/components/SubHeader'
import Account from '@/service/Account';
import Global from '@/service/Global';
export default {
    components:{
        MainHeader,
        SubHeader
    },
    data:function(){
        return {
            currentUser:null,
            role:""
        }
    },
    async mounted(){
         await Global.onPageRefresh(this.$session, this.$router);
         await this.getUserInfo();
    },
    methods:{
          getUserInfo() {
              console.log("getUserInfo called");
      return new Promise((resolve, reject) => {
        if (this.$session.exists("contact")) {
         Account.getUserInfo(this.$session)
            .then(response => {
              // this.$session.set("current_user", response.data);
              this.currentUser = response.data;
              this.role = this.currentUser.roles[0].roleName;
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

<style>
.login-screen {
    background-image: url('/static/images/deg.jpg');
    /* background-position: center;
    background-repeat: no-repeat;
    background-attachment: fixed;
    background-size: cover; */
    -moz-background-size: cover;
    -webkit-background-size: cover;
    position:relative;
    margin-top:60px;
    /* top: 0;
    bottom: 0;
    right: 0;
    left: 0; */
}
.left-col-text{
margin-top:30px;
/* color:var(--main-secondary-color); */
font-size:15px;
 /* font-weight:bold;  */
}
.left-col{
  height:100vh;
}
</style>

