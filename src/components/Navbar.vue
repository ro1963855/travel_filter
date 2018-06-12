<template>
  <div class="tf-navbar">
    <b-navbar type="dark" variant="primary" class="h-100 p-0">
      <div class="tf-brand">
        <b-navbar-brand href="#" class="tf-brand-logo mr-0">
          <img src="../assets/img/logo.svg">
        </b-navbar-brand>
      </div>
      <b-navbar-nav class="mr-auto tf-navbar-content">
        <b-nav-form class="tf-search">
          <i class="fas fa-search tf-search-icon"></i>
          <b-form-input class="tf-search-input"
                        type="text"
                        placeholder="Explore your own activities"/>
        </b-nav-form>
      </b-navbar-nav>
    </b-navbar>
  </div>
</template>

<script>
export default {
  name: 'Navbar',
  data() {
    return {

    };
  },
};
</script>
