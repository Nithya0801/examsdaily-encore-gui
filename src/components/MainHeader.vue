<template>
<div>
  <b-navbar variant="info" toggleable="md" class="nav" style="padding:0px;">

  <b-navbar-toggle target="nav_dropdown_collapse"></b-navbar-toggle>
    <b-navbar-brand href="#" style="padding: 10px;">
       <!-- <b-img src="/static/images/logo.jpg" height="56" width="130"/> -->
          <b-col class="text-center" fluid >
       <b-img src="/static/images/exams.svg" height="35"/>
             <div style="font-family: 'Berkshire Swash', cursive; font-size: 1rem;">
             <span style="color: #ec3237ff">exams</span><span  style="color: #406ab2ff">daily</span>
             </div>
          </b-col>
     </b-navbar-brand>
     <b-collapse is-nav id="nav_dropdown_collapse" v-if="$session.exists('current_user')">
        <b-navbar-nav class="ml-auto"  >
      <b-nav-item >
          Contact us: info@examdaily.in
      </b-nav-item>
      <b-nav-item-dropdown right>
            <template slot="button-content" v-if="currentUser!=null">
            {{currentUser.username!=null?currentUser.username:(currentUser.email!=null?currentUser.email:'User')}}
            </template>
              <b-dropdown-item @click="logout">
             <i class="fa fa-sign-out px-2" aria-hidden="true" ></i>Logout
            </b-dropdown-item>
      </b-nav-item-dropdown>
        </b-navbar-nav>
     </b-collapse>
    <!-- <b-collapse is-nav id="nav_dropdown_collapse" v-if="$session.exists('current_user')">
        <b-navbar-nav class="ml-auto"  >
             
          <b-nav-item-dropdown right>
            <template slot="button-content" v-if="currentUser!=null">
            {{currentUser.username!=null?currentUser.username:(currentUser.email!=null?currentUser.email:'User')}}
            </template>
            <div v-show="isAdmin">
             <b-dropdown-item @click="adminPage"  v-show="!menuToggle">
                <i class="fa fa-exchange px-2"  aria-hidden="true"></i>Login as admin
             </b-dropdown-item>
             <b-dropdown-item @click="candidatePage" v-show="menuToggle">
                <i class="fa fa-exchange px-2"  aria-hidden="true"></i>Login as candidate
             </b-dropdown-item>
            </div>

            <b-dropdown-item v-b-modal.userSetting>
                <i class="fa fa-cog px-2"  aria-hidden="true"></i>Settings
            </b-dropdown-item>
            <b-dropdown-divider></b-dropdown-divider>
             <b-dropdown-item @click="logout">
             <i class="fa fa-sign-out px-2" aria-hidden="true" ></i>Logout
            </b-dropdown-item>
          </b-nav-item-dropdown>
         
        </b-navbar-nav>
      </b-collapse> -->
    </b-navbar>
    <!-- <user-setting-modal :currentUser="currentUser" :image="currentUser!=null?currentUser.avatar:null"></user-setting-modal>
    <loader v-if="isLoading"></loader> -->
</div>
</template>
<script>
import AccountApi from '@/service/Account'

export default {
      props: ["currentUser", 'image'],
      methods:{
          logout: function() {
      // console.log(this.$session.id());
      this.isLoading = true;

      AccountApi.logout(this.$session.get("access_token"))
        .then(result => {
                //  handleSignOutClick();
          this.$session.clear();
          this.$session.destroy();

          window.location.href="#/";
          window.location.reload();
          this.isLoading = false;

        })
        .catch(err => {
          console.log(err);
        //   toast({
        //     type: "error",
        //     title: "Signing Out failed"
        //   });
        //   this.isLoading = false;

        });

    },
   
      }
}
</script>

<style scoped>
.nav {
  background-color: white;
  border: 1px solid #eeee;
  /* background-color:#252f3e; */
  /* padding:0 0 0 0; */
}
</style>
