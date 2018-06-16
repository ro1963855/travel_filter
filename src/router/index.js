import Vue from 'vue';
import Router from 'vue-router';
import SearchList from '@/components/SearchList';

Vue.use(Router);

export default new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      name: 'SearchList',
      component: SearchList,
    },
  ],
});
