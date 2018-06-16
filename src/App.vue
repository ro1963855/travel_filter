<template>
  <div id="app">
    <Navbar :filter="filter"
            :isFilterOpen="isFilterOpen"/>
    <div class="tf-body">
      <Filters :filter="filter"
                :isFilterOpen="isFilterOpen"
                class="float-left"></Filters>
      <router-view class="tf-content float-right"/>
      <div class="clearfix"></div>
    </div>
  </div>
</template>

<script>
import Navbar from '@/components/Navbar';
import Filters from '@/components/Filters';

export default {
  name: 'App',
  components: {
    Navbar,
    Filters,
  },
  data() {
    return {
      filter: {
        searchWord: '',
        zoneSelected: '全部',
        isOnlyShowFree: false,
        isOnlyShowOpenAllDay: false,
      },
      isFilterOpen: {
        status: false,
      },
    };
  },
};
</script>
