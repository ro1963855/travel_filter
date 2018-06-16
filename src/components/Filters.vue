<template>
  <div class="tf-filters-column" :class="{open: isFilterOpen.status}">
    <div id="filters" class="tf-filters">
      <div class="tf-filters-card tf-filters-card-search active">
          <b-nav-form class="tf-search">
            <i class="fas fa-search tf-search-icon"></i>
            <b-form-input v-model="filter.searchWord"
                          class="tf-search-input"
                          type="text"
                          placeholder="Explore your own activities"/>
          </b-nav-form>
      </div>
      <div class="tf-filters-card"
        :class="{active: card[0].isActive}">
        <div class="tf-filters-header">
          <span>Location</span>
          <i class="fas fa-plus"
              :class="{active: !card[0].isActive}"
              @click="card[0].isActive = !card[0].isActive"></i>
          <i class="fas fa-minus"
              :class="{active: card[0].isActive}"
              @click="card[0].isActive = !card[0].isActive"></i>
        </div>
        <div class="tf-filters-body">
          <b-form-select class="h-100" v-model="filter.zoneSelected" :options="zones" />
        </div>
      </div>
      <div class="tf-filters-card"
        :class="{active: card[1].isActive}">
        <div class="tf-filters-header">
          <span>Categories</span>
          <i class="fas fa-plus"
              :class="{active: !card[1].isActive}"
              @click="card[1].isActive = !card[1].isActive"></i>
          <i class="fas fa-minus"
              :class="{active: card[1].isActive}"
              @click="card[1].isActive = !card[1].isActive"></i>
        </div>
        <div class="tf-filters-body">
          <div class="ts-filter-checkbox">
            <b-form-checkbox v-model="filter.isOnlyShowFree">免費參觀</b-form-checkbox>
          </div>
          <div class="ts-filter-checkbox">
            <b-form-checkbox v-model="filter.isOnlyShowOpenAllDay">全天候開放</b-form-checkbox>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Filters',
  props: ['filter', 'isFilterOpen'],
  data() {
    return {
      card: [
        {
          isActive: false,
        },
        {
          isActive: false,
        },
      ],
      completeDatas: [],
      searchDatas: {
        result: [],
        tag: [],
      },
      zones: [],
    };
  },
  methods: {
    getKaohsiungOpenData() {
      const vm = this;
      const api = '/api';
      vm.$http.get(api).then((response) => {
        vm.completeDatas = response.data.result.records;
        vm.zones = vm.getUniqueZone(vm.completeDatas);
        vm.searchDatas.result = vm.completeDatas;
        vm.sendSearchData();
      });
    },
    getUniqueZone(data) {
      const allZones = data.map(element => element.Zone);
      const uniqueZones = this._.uniq(allZones);
      uniqueZones.unshift('全部');
      return uniqueZones;
    },
    getSearchDataListener() {
      const vm = this;
      vm.$eventHub.$on('get-search-data', () => {
        vm.sendSearchData();
      });
    },
    sendSearchData() {
      const vm = this;
      vm.$eventHub.$emit('send-search-data', vm.searchDatas);
    },
  },
  created() {
    this.getKaohsiungOpenData();
    this.getSearchDataListener();
  },
};
</script>
