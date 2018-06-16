<template>
  <div class="tf-navbar">
    <b-navbar type="dark" variant="primary" class="h-100 p-0">
      <div class="tf-brand">
        <b-navbar-brand href="/" class="tf-brand-logo mr-0">
          <img src="../assets/img/logo.svg">
        </b-navbar-brand>
      </div>
      <b-navbar-nav class="mr-auto tf-navbar-content d-md-block">
        <b-nav-form class="tf-search">
          <i class="fas fa-search tf-search-icon"></i>
          <b-form-input v-model="filter.searchWord"
                        class="tf-search-input"
                        type="text"
                        placeholder="Explore your own activities"/>
        </b-nav-form>
      </b-navbar-nav>
      <i class="fas fa-search d-md-none tf-search-icon tf-filter-collapse"
          @click="isFilterOpen.status = !isFilterOpen.status"></i>
    </b-navbar>
  </div>
</template>

<script>
export default {
  name: 'Navbar',
  props: ['filter', 'isFilterOpen'],
};
</script>
