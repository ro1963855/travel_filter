import Vue from 'vue';
import Router from 'vue-router';
import SearchList from '@/components/SearchList';
import Detail from '@/components/Detail';

Vue.use(Router);

export default new Router({
  mode: 'history',
  base: '/vue/travel_filter/',
  routes: [
    {
      path: '/',
      name: 'SearchList',
      component: SearchList,
    },
    {
      path: '/detail/:id',
      name: 'Detail',
      component: Detail,
      props: true,
    },
  ],
});
