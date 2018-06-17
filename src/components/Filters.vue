<template>
  <div class="tf-filters-column" :class="{open: isFilterOpen.status}">
    <div id="filters" class="tf-filters">
      <div class="tf-filters-card tf-filters-card-search active">
          <b-nav-form class="tf-search">
            <font-awesome-icon icon="search"></font-awesome-icon>
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
          <font-awesome-icon icon="plus"
                              :class="{active: !card[0].isActive}"
                              @click="card[0].isActive = !card[0].isActive"></font-awesome-icon>
          <font-awesome-icon icon="minus"
                              :class="{active: card[0].isActive}"
                              @click="card[0].isActive = !card[0].isActive"></font-awesome-icon>
        </div>
        <div class="tf-filters-body">
          <b-form-select class="h-100" v-model="filter.zoneSelected" :options="zones" />
        </div>
      </div>
      <div class="tf-filters-card"
        :class="{active: card[1].isActive}">
        <div class="tf-filters-header">
          <span>Categories</span>
          <font-awesome-icon icon="plus"
                              :class="{active: !card[1].isActive}"
                              @click="card[1].isActive = !card[1].isActive"></font-awesome-icon>
          <font-awesome-icon icon="minus"
                              :class="{active: card[1].isActive}"
                              @click="card[1].isActive = !card[1].isActive"></font-awesome-icon>
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
        vm.sendSearchDataFromFilter();
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
        vm.sendSearchDataFromFilter();
      });
    },
    getFilterFromSearchListListener() {
      const vm = this;
      vm.$eventHub.$on('send-filter-form-searchlist', (filter) => {
        vm.filter = filter;
        vm.generateTags();
        vm.sendSearchDataFromFilter();
      });
    },
    sendSearchDataFromFilter() {
      const vm = this;
      const filterDatas = this.filterCompleteDatas();
      const filterTags = vm.generateTags();
      vm.$eventHub.$emit('send-search-data', filterDatas, vm.filter, filterTags);
    },
    filterCompleteDatas() {
      const vm = this;
      let filterDatas = this.completeDatas;
      vm._.forEach(vm.filter, (value, key) => {
        if (key === 'searchWord' && !vm._.isEmpty(value)) {
          filterDatas = this._.filter(filterDatas, data =>
            data.Ticketinfo.includes(value) ||
            data.Zone.includes(value) ||
            data.Add.includes(value) ||
            data.Opentime.includes(value) ||
            data.Description.includes(value) ||
            data.Name.includes(value),
          );
        } else if (key === 'isOnlyShowFree' && value) {
          filterDatas = this._.filter(filterDatas, { Ticketinfo: '免費參觀' });
        } else if (key === 'isOnlyShowOpenAllDay' && value) {
          filterDatas = this._.filter(filterDatas, { Opentime: '全天候開放' });
        } else if (key === 'zoneSelected' && value !== '全部') {
          filterDatas = this._.filter(filterDatas, { Zone: value });
        }
      });
      return filterDatas;
    },
    generateTags() {
      const vm = this;
      const filterTags = [];
      vm._.forEach(vm.filter, (value, key) => {
        if (key === 'searchWord' && !vm._.isEmpty(value)) {
          filterTags.push({ tagsName: key, tagsValue: value });
        } else if (key === 'isOnlyShowFree' && value) {
          filterTags.push({ tagsName: key, tagsValue: '免費參觀' });
        } else if (key === 'isOnlyShowOpenAllDay' && value) {
          filterTags.push({ tagsName: key, tagsValue: '全天候開放' });
        } else if (key === 'zoneSelected' && value !== '全部') {
          filterTags.push({ tagsName: key, tagsValue: value });
        }
      });

      return filterTags;
    },
  },
  created() {
    this.getKaohsiungOpenData();
    this.getSearchDataListener();
    this.getFilterFromSearchListListener();
  },
  watch: {
    filter: {
      handler() {
        if (this.$router.currentRoute !== 'SearchList') {
          this.$router.push('/');
        }
        this.sendSearchDataFromFilter();
      },
      deep: true,
    },
  },
};
</script>
