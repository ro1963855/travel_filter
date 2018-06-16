<template>
  <div class="tf-searchlist" v-if="isGetInfo">
    <div>
      <div class="tf-searchlist-header">
        <h1 class="tf-searchlist-counter mb-0">
          Showing
          <span class="tf-searchlist-counterNumber">{{ searchDatas.result.length }}</span>
          results by…
        </h1>
        <div class="tf-searchlist-tagList row m-0">
          <div class="tf-searchlist-tag">
            <span>Koahsiung</span>
            <i class="far fa-times-circle"></i>
          </div>
        </div>
      </div>
      <div class="tf-searchlist-viewpointList">
        <div class="tf-searchlist-viewpoint"
              v-for="searchData in showSearchDatas"
              v-bind:key="searchData._id">
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
              <i class="fas fa-map-marker-alt"></i>
              <span>{{ searchData.Zone }}</span>
            </div>
          </div>
        </div>
      </div>
      <b-pagination size="md"
                    :total-rows="searchDatas.result.length"
                    v-model="pagination.currentPage"
                    class="float-right"
                    :per-page="pagination.perPage"
                    @input="getPageData(searchDatas.result)"></b-pagination>
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
        currentPage: 1,
        perPage: 1,
      },
    };
  },
  methods: {
    sendSearchDataListener() {
      const vm = this;
      vm.$eventHub.$on('send-search-data', (searchDatas) => {
        vm.searchDatas = searchDatas;
        vm.isGetInfo = true;
        vm.showSearchDatas = vm.searchDatas.result;
        vm.getPageData(vm.searchDatas.result);
      });
    },
    getSearchData() {
      const vm = this;
      vm.$eventHub.$emit('get-search-data', vm.searchDatas);
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
        this.getPageData(this.searchDatas.result);
      }
    },
    listenerResizeEvent() {
      const vm = this;
      $(window).resize(() => vm.setPagination());
    },
  },
  created() {
    this.setPagination();
    this.sendSearchDataListener();
    this.listenerResizeEvent();
  },
};
</script>
