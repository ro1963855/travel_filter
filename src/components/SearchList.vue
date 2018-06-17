<template>
  <div class="tf-searchlist" v-if="isGetInfo">
    <div>
      <div class="tf-searchlist-header">
        <h1 class="tf-searchlist-counter mb-0">
          Showing
          <span class="tf-searchlist-counterNumber">{{ searchDatas.length }}</span>
          results by…
        </h1>
        <div class="tf-searchlist-tagList row m-0">
          <div class="tf-searchlist-tag" v-for="tags in filterTags" :key="tags.tagsName">
            <span>{{ tags.tagsValue }}</span>
            <font-awesome-icon :icon="['far', 'times-circle']"
                                @click="removeTag(tags.tagsName)"></font-awesome-icon>
          </div>
        </div>
      </div>
      <div class="tf-searchlist-viewpointList">
        <router-link :to="{ name: 'Detail', params: { id: searchData._id }}"
              v-for="searchData in showSearchDatas"
              v-bind:key="searchData._id">
          <div class="tf-searchlist-viewpoint">
            <img class="tf-searchlist-viewpointImage" :src="searchData.Picture1">
            <div class="tf-searchlist-viewpointContent">
              <h2>{{ searchData.Name }}</h2>
              <div class="tf-searchlist-viewpointDescription">
                <p>{{ searchData.Description }}</p>
              </div>
              <div class="tf-searchlist-viewpointTag">
                <span v-if="searchData.Ticketinfo === '免費參觀'">{{ searchData.Ticketinfo }}</span>
                <span v-if="searchData.Opentime === '全天候開放'">{{ searchData.Opentime }}</span>
              </div>
              <div class="tf-searchlist-viewpointZone">
                <font-awesome-icon icon="map-marker-alt"></font-awesome-icon>
                <span>{{ searchData.Zone }}</span>
              </div>
            </div>
          </div>
        </router-link>
      </div>
      <b-pagination size="md"
                    :total-rows="searchDatas.length"
                    v-model="pagination.currentPage"
                    class="float-right"
                    :per-page="pagination.perPage"
                    v-if="searchDatas.length !== 0"
                    @input="getPageData(searchDatas)"></b-pagination>
    </div>
  </div>
</template>

<script>
import $ from 'jquery';

export default {
  name: 'SearchList',
  components: {
  },
  data() {
    return {
      searchDatas: [],
      isGetInfo: false,
      showSearchDatas: [],
      pagination: {
        currentPage: 0,
        perPage: 0,
      },
      filterTags: [],
      filter: {},
    };
  },
  methods: {
    getSearchDataFromFilterListener() {
      const vm = this;
      vm.$eventHub.$on('send-search-data', (searchDatas, filter, filterTags) => {
        vm.searchDatas = searchDatas;
        vm.isGetInfo = true;
        vm.filter = filter;
        vm.filterTags = filterTags;
        vm.pagination.currentPage = 1;
        vm.getPageData(vm.searchDatas);
      });
    },
    getSearchDataFromFilter() {
      const vm = this;
      vm.$eventHub.$emit('get-search-data');
    },
    sendFilterFromSearchList() {
      const vm = this;
      vm.$eventHub.$emit('send-filter-form-searchlist', vm.filter);
    },
    getPageData(searchDatas) {
      const startIndex = (this.pagination.currentPage - 1) * this.pagination.perPage;
      this.showSearchDatas =
        this._.slice(searchDatas, startIndex, startIndex + this.pagination.perPage);
    },
    setPagination() {
      let perPage = 0;
      if ($(window).width() >= 1200) {
        perPage = 3;
      } else {
        perPage = 2;
      }

      if (perPage !== this.pagination.perPage) {
        this.pagination.currentPage = 1;
        this.pagination.perPage = perPage;
        this.getPageData(this.searchDatas);
      }
    },
    listenerResizeEvent() {
      const vm = this;
      $(window).resize(() => vm.setPagination());
    },
    removeTag(tagsName) {
      if (tagsName === 'searchWord') {
        this.filter[tagsName] = '';
      } else if (tagsName === 'isOnlyShowFree') {
        this.filter[tagsName] = false;
      } else if (tagsName === 'isOnlyShowOpenAllDay') {
        this.filter[tagsName] = false;
      } else if (tagsName === 'zoneSelected') {
        this.filter[tagsName] = '全部';
      }
      this.sendFilterFromSearchList();
    },
  },
  created() {
    this.setPagination();
    this.getSearchDataFromFilterListener();
    this.getSearchDataFromFilter();
    this.listenerResizeEvent();
  },
};
</script>
