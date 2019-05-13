<template>
<div>
    <div>
         <main-header  :currentUser="currentUser" :role="role"></main-header>
        <sub-header :role="role"></sub-header>
    </div>
        <div>
         <b-container style="border:1px solid #eee;padding:0 0 0 0;">
      <div style="padding-bottom: 15px;background:#00A1B5;color: #fff;padding: 50px 0px 2px 0px;">
        <div class="pull-left" style="margin-top:-40px;margin-left:10px;">
         
          <span style="font-size:20px;font-weight:bold;">User Management</span>
        </div>
        <div class="pull-right" style="padding:12px;margin-top:-50px;">
          <b-btn class="btn-sm add-btn" variant="info" v-b-modal.registrationPage style>
            <i class="fa fa-plus px-2" style="font-weight:bold;" aria-hidden="true">
              <span style="font-weight:bold;margin-left:12px;">Add User</span>
            </i>
          </b-btn>
          <vue-xlsx-table class="" @on-select-file="checkSelectedFile">
            <i
              class="fa fa-file-o px-2"
              style="font-weight:bold;"
              aria-hidden="true"
            >
              <span style="font-weight:bold;margin-left:12px;">Import</span>
            </i>
          </vue-xlsx-table>
           <span style="font-size:15px;font-weight:bold;">Total Users</span>
                <b-badge variant="dark">
                  {{this.totalUsersCount}}
                </b-badge>
                
            <span style="font-size:15px;font-weight:bold;">Count</span>
            <b-form-select
              v-model="pageCount"
              @input="getUsers(pageCount)"
              :options="options"                
              class=" select-field shadow"
              style="margin-bottom:10px;" 
            ></b-form-select>
           <!-- <vue-xlsx-table class="" @on-select-file="checkSelectedFile">
              <b-button autofocus class="btn-sm add-btn" variant="info" type="submit"> Import </b-button>
            </vue-xlsx-table>  -->
    
        </div>
 </div>
          <b-table
        striped
        hover
        responsive
        :items="userItems"
        :fields="fields"
      
     />
     
    </b-container>
    <b-pagination
        align="center"
        size="lg"
        :total-rows="totalUsersCount"
        v-model="currentPage"
        :per-page="pageCount"
        @input="pageSwitch(currentPage)"
      ></b-pagination>

    <import-modal :show="showImportModal" :list="importList" @import="listImport" @close="close"></import-modal>
<user-import-status-modal
      :show="showUserImportStatusModal"
      :items="userImportStatus"
      @close="showUserImportStatusModal=false;"
    ></user-import-status-modal>
   
    <registration-page ></registration-page>
        </div>
    </div>
</template>
<script>
import Account from '@/service/Account'
import MainHeader from '@/components/MainHeader'
import SubHeader from '@/components/SubHeader'
import Global from '@/service/Global'
import RegistrationPage from '@/components/RegistrationPage'
import ImportModal from '@/components/ImportModal'
import UserImportStatusModal from '@/components/UserImportStatusModal'
export default {
     components:{
        MainHeader,
        SubHeader,
        RegistrationPage,
        ImportModal,
        UserImportStatusModal,
    },
     data () {
    return { 
      currentUser:null,
      role:"",
      selected:false,
      userItems:[],
     
      fields: [
         {key:'username', label: "Username" },
          {key:'email[0]', label: "Email" },
         {key:'mobile[0]', label: "Mobile" },
         {key:'roles[0].roleName', label: "Role" },
       
      ],
      importList: [],
      showImportModal: false,
      userImportStatus: [],
      showUserImportStatusModal: false,
      pageCount:3,
      currentPage: 1,
      options: [
        { value: 3, text: "3" },
        { value: 5, text: "5" },
        { value: 10, text: "10" },
        { value: 15, text: "15" },
        { value: 20, text: "20" },
        { value: 25, text: "25" }
      ],
      totalUsersCount: 0,
      pageSwitchInit: true,
  
    }
  },
  async mounted(){
         await Global.onPageRefresh(this.$session, this.$router);
         await this.getUserInfo();
        //  await this.getAllUsers();
         await this.getUsers(this.pageCount, this.currentPage);
         await this.totalUsers(this.totalUsersCount);
    },
    methods: {

         getUserInfo() {
              console.log("getUserInfo called");
      return new Promise((resolve, reject) => {
        if (this.$session.exists("contact")) {
         Account.getUserInfo(this.$session)
            .then(response => {
              // this.$session.set("current_user", response.data);
              this.currentUser = response.data;
                this.role=this.currentUser.roles[0].roleName;
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
    },
    // getAllUsers: function() {
    //   console.log("Get all Users");
     
    //   return new Promise((resolve, reject) => {
    //     Account.getAllUsers()
    //       .then(response => {
           
          
            
    //         this.userItems.splice(0);
         
    //         for (var i = 0; i < response.data.length; i++)
    //         {
             
            
    //          this.userItems.push(response.data[i]);
    //         }
          
    //       console.log(this.userItems);
    //        this.totalUsers(this.totalUsersCount);
    //       })
    //       .catch(err => {
    //         console.log(err);
    //         reject(err);
    //       });
    //   });
    // },
    checkSelectedFile(convertedData) {
      // console.log(convertedData);
      this.importList.splice(0);
      if (convertedData && convertedData.body) {
        var userData = convertedData.body;
        if (
          userData[0].hasOwnProperty("Name") &&
          userData[0].hasOwnProperty("Contact") &&
          userData[0].hasOwnProperty("Password") &&
          userData[0].hasOwnProperty("Role")
        ) {
          for (var i = 0; i < userData.length; i++) {
            this.importList.push({
              username: userData[i].Name,
              contact: userData[i].Contact,
              password: userData[i].Password,
              roleType: userData[i].Role,
              registerMode: "DIRECT"
            });
          }          
          this.showImportModal = true;
          // console.log("import");
        } else {
          toast({
            type: "error",
            title: "File does not matches the given format"
          });
        }
      }
    },
     listImport: function(data) {
      // for (let i = 0; i < data.length; i++) {
      Account.bulkImport(data)
        .then(response => {
          // toast({
          //   type: "success",
          //   title: "User Inserted Successfully"
          // });
          console.log(response);
          this.userImportStatus = response.data;
          this.getUsers(this.pageCount, this.currentPage);
          this.totalUsers(this.totalUsersCount);
          // this.getAllUsers();
          this.showUserImportStatusModal = true;
          
        })
        .catch(err => {
          // toast({
          //   type: "error",
          //   title: err.response.data
          // });
          console.log(err);
          // this.isLoading = false;
        });
      // }
      this.showImportModal = false;
    },
     close: function() {
      this.showImportModal = false;
    },
    getUsers: function(pageCount, currentPage) {
      // this.isLoading = true;
      // this.currentPage = currentPage;
      this.pageCount = pageCount;
      console.log(".....called getUSerss...",pageCount);
      return new Promise((resolve, reject) => {
        Account.getUsers(this.pageCount, this.currentPage -1)
          // AccountApi.getUsers(this.pageCount,this.page)
          .then(response => {
           
            console.log(response.data)
            this.userItems.splice(0);
            this.userItems = response.data;
          

            resolve(response);



          })
          .catch(err => {
            console.log(err);
                    reject(err);
          });
      });
    },
    totalUsers: function() {
      this.isLoading = false;
      return new Promise((resolve, reject) => {
        Account.totalUsers()
          .then(response => {
            this.isLoading = false;
            // this.totalUsersCount = totalUsersCount = response.data;
            this.totalUsersCount = response.data;
            resolve(response);
          })
          .catch(err => {
            console.log(err);
            reject(err);
          });
      });
    },
    pageSwitch: function(currentPage) {
      if (this.pageSwitchInit) {
        this.currentPage = currentPage;
        this.getUsers(this.pageCount,this.currentPage);
      }
      else {
        this.pageSwitchInit = false;
      }
    }
    

  // userInsert: function(data) {
  //     console.log("user signed up");
  //          Account.register(data)
  //       .then(response => {
  //        console.log(response.data);
  //       })
  //       .catch(err => {
       
  //         console.log(err);
         
  //       });
  //   }
    }
}
</script>
<style >
.deactivate-btn {
  /* background-color: firebrick; */
  border: none;
  border-radius: 20px;
  font-size: 13px;
  font-weight: bold;
}
.trash-btn {
  background-color: firebrick;
  border: none;
  border-radius: 20px;
  font-weight: bold;
}
.activate-btn {
  /* background-color: rgb(42, 179, 42); */
  border: none;
  border-radius: 20px;
  font-size: 13px;
  font-weight: bold;
}
.is-isActive {
  display: none;
}
.add-btn {
  /* background-color: #00a1b5; */
  border: 1px solid #00a1b5;
  border-radius: 20px;
  font-size: 15px;
}
.add-btn:hover {
  /* background-color: #00a1b5; */
  color: white;  
  border: 1px solid #00a1b5;
  border-radius: 20px;
}
.xlsx-button {
  display: inline-block;
  line-height: 1;
  white-space: nowrap;
  cursor: pointer;
  border: 1px solid #00a1b5;
  -webkit-appearance: none;
  text-align: center;
  box-sizing: border-box;
  outline: 0;
  margin: 0;
  padding: 7px 9px;
  font-size: 12px;
  border-radius: 4px;
  color: #fff;
  background-color: #00a1b5;
}
.search-field{
  border: 1px solid lightskyblue;
  border-radius: 20px;
  font-size: 15px;
  font-weight: bold;
}
.select-field{
  border: 2px solid lightskyblue;
  border-radius: 20px;
  font-size: 15px;
  font-weight: bold;
  width: 80px;
}
</style>
