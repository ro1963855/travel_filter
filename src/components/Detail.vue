<template>
  <div v-if="!_.isEmpty(info)" class="tf-detail">
    <b-breadcrumb :items="breadcrumb" class="tf-detail-breadcrumb"/>
    <div class="tf-detail-body">
      <img class="tf-detail-picture" :src="info.Picture1">
      <div class="tf-detail-viewpointContent">
        <h2>{{ info.Name }}</h2>
        <div class="tf-detail-viewpointTag">
          <span v-if="info.Ticketinfo === '免費參觀'">{{ info.Ticketinfo }}</span>
          <span v-if="info.Opentime === '全天候開放'">{{ info.Opentime }}</span>
        </div>
        <div class="tf-detail-viewpointZone">
          <font-awesome-icon icon="map-marker-alt"></font-awesome-icon>
          <span>{{ info.Zone }}</span>
        </div>
        <div class="tf-detail-viewpointDescription">
          <p>{{ info.Description }}</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: ['id'],
  name: 'Detail',
  data() {
    return {
      info: {},
      breadcrumb: [
        {
          text: 'Explore',
          to: { name: 'SearchList' },
        },
        {
          text: '',
          active: true,
        },
      ],
    };
  },
  methods: {
    getSearchDataFromFilterListener() {
      const vm = this;
      vm.$eventHub.$on('send-search-data', (searchDatas) => {
        vm.info = vm._.filter(searchDatas, { _id: parseInt(vm.id, 10) })[0];
        if (!vm._.isEmpty(vm.info)) {
          vm.breadcrumb[1].text = vm.info.Name;
        }
      });
    },
    getSearchDataFromFilter() {
      const vm = this;
      vm.$eventHub.$emit('get-search-data');
    },
  },
  created() {
    this.getSearchDataFromFilterListener();
    this.getSearchDataFromFilter();
  },
};
</script>
