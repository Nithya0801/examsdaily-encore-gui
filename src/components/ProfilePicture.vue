<template>
    <div>
  <!-- <b-modal  id="profilePicture"
            :header-bg-variant="headerBgVariant"
            :header-text-variant="headerTextVariant"
            no-close-on-backdrop
            no-close-on-esc
            hide-footer
            centered
            size="md"
            ref="profilePicture"> -->
  <!-- <template slot="modal-title">
    <span style="font-weight:bold;font-size:20px;">User Settings</span>
  </template> -->
  <b-container fluid style="padding:0 0 0 0;">
   <b-container fluid>
     <div class="d-flex justify-content-center">
       <b-row>
        <b-col>
          <div class="form-group"
               style="text-align: center">
           <label style="display:block;" for="avatar">
             <div class="profile-pic">
                 <button @click="imageSelected">
                     <input type="file" accept="image/jpeg, image/png" @change="imageSelected" title = " " style="opacity: 0.0; position: absolute; top:0; left: 0; bottom: 0; right:0; width: 100%; height:100%;">
                    <b-img :src="imageUrl!=null?imageUrl.replace('__dexters_access_token_9836758498731097845__', $session.get('access_token')).replace('__dexters_resource_location_9836758498731097845__',resourceLocation.replace('images','avatars')):'/static/images/user96.png'" width="110" height="110" style="border-radius:55px;"></b-img>
                 
                 </button>
              <div class="editImage  shadow" >
             <a href="#"><i class="fa fa-camera" aria-hidden="true" style="cursor:pointer;color:black;">  <input type="file" accept="image/jpeg, image/png" @change="imageSelected" title = " " style="opacity: 0.0; position: absolute; top:0; left: 0; bottom: 0; right:0; width: 100%; height:100%;"/></i></a>
              </div>
	          </div>
           </label>
           </div>
          </b-col>
         </b-row>
        </div>
     </b-container>
     
  </b-container>
 <!-- </b-modal> -->
 </div>
</template>

<script>
import GlobalApi from "@/service/Global";
import PreApplication from '@/components/PreApplication'
export default {
    name: "UserSettingModal",
  props: ['currentUser', 'image'],

  data: function() {
    return {
      headerBgVariant: "info",
      headerTextVariant: "light",
      files: null,
      imageData:"",
      imageUrl:null,
    };
  },
  watch:{

    image:function(){
      this.imageUrl = this.image;
    }
  },
  mounted(){

    this.imageUrl = this.image;
  },
  methods: {
    imageSelected: function(e) {
      this.files = e.target.files || e.dataTransfer.files;
      console.log(this.files);
      this.onUploadUserImage();
      var input = event.target;
            if (input.files && input.files[0]) {
                var reader = new FileReader();
                reader.onload = (e) => {
                    this.imageData = e.target.result;
                }
                reader.readAsDataURL(input.files[0]);
            }
    },
    onUploadUserImage: function() {
      return new Promise((resolve, reject) => {
        
          GlobalApi.uploadImage(this.files)
            .then(response => {
              this.imageUrl = response.data;
              console.log(this.imageUrl);
              this.$emit('imageUrl',this.imageUrl);
              resolve(response);
            })
            .catch(err => {
              console.log(err);
              reject(err);
            });
        });
    },
  }
    
}
</script>

<style>
.modal-content {
  border-radius: 1.3rem;
}
.profileUpload {
  width: 100px;
  height: 100px;
  -moz-border-radius: 50px;
  -webkit-border-radius: 50px;
  border-radius: 50px;
  background-image: url("/static/images/uploadimg.png");
  background-size: 100px 100px;
  cursor: pointer;
}
.nav-link {
  display: block;
  /* padding: 0rem 1.2rem; */
  padding: 0rem 2rem;
  font-size: 17px;
  font-weight: bold;
  /* padding: 0.5rem 1.1rem; */
}
.nav-tabs .nav-link {
  border: 1px solid transparent;
  border-top-left-radius: 0.25rem;
  border-top-right-radius: 0.25rem;
}
.card-header {
  padding: 0.5rem 0rem 0.5rem 3.5rem;
  margin-bottom: 0;
  background-color: white;
  border-bottom: none;
}
.nav-tabs .nav-link.active,
.nav-tabs .nav-item.show .nav-link {
  color: #00a1b5;
  border: none;
  border-bottom: 2px solid #00a1b5;
  border-color: #00a1b5 #00a1b5 00a1b5 #fff;
}
a {
  color: black;
  text-decoration: none;
  background-color: transparent;
  -webkit-text-decoration-skip: objects;
}
.btn-edit {
  width: 100px;
  margin-right: 30px;
  border-radius: 20px;
  background-color: #00a1b5;
  font-size: 15px;
  font-weight: bold;
}
.profile-pic {
	position: relative;
	display: inline-block;
}

.profile-pic .editImage {
	display: block;
  cursor:pointer;
}
.profile-pic:hover .editImage {
	display: block;
  cursor:pointer;
}

.editImage {
  cursor:pointer;
	padding-top: 0px;
	padding-right: 5px;
  padding-left: 5px;
  padding-bottom: 0px;
  border-radius: 25px;
  background-color:rgb(201, 202, 200);
	position: absolute;
	right: -1px;
	top:82px;
	display: none;
}

.editImage a {
	color:white;
}
</style>

