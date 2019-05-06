<template>
    <div>
  <b-navbar type="info" variant="light">
    <b-navbar-nav>
      <b-nav-item href="#/success">Home</b-nav-item>

      <!-- Navbar dropdowns -->
      <b-nav-item-dropdown text="Services">
        <b-dropdown-item href="#/preApp">Pre-Application</b-dropdown-item>
      </b-nav-item-dropdown>
         <b-navbar-nav class="ml-auto" right>
         <b-nav-form>
          <b-form-input size="sm" class="mr-sm-2" placeholder="Search"></b-form-input>
          <b-button size="sm" class="my-2 my-sm-0" type="submit">Search</b-button>
        </b-nav-form>
         </b-navbar-nav>
      <!-- <b-nav-item-dropdown text="User" right>
        <b-dropdown-item href="#">Account</b-dropdown-item>
        <b-dropdown-item href="#">Settings</b-dropdown-item>
      </b-nav-item-dropdown> -->
    </b-navbar-nav>
  </b-navbar>
</div>
</template>
