import Vue from 'vue'
import Router from 'vue-router'
import handover from 'components/page-components/handover/handover'
import handoverList from 'components/page-components/handover/handoverList'
import orderManage from 'components/page-components/orderManage/orderManage'

/*import orderInfoDetail from 'components/page-components/orderManage/orderInfoDetail'*/

import orderInventory from 'components/page-components/orderManage/orderInventory'

Vue.use(Router);

const router = new Router({
  routes: [
    {
      path:'/',
      component:orderManage,
      redirect:'/orderManage'
    },
    {
      path:'/handover',
      component:handover
    },
    {
      path:'/handoverList',
      component: handoverList
    },
    {
      path:'/orderManage',
      component: orderManage,
      children:[
        /*{
          path:'/',
          component:orderInventory,
          redirect:'/orderInventory'
        },*/
        {
          path:'/orderInventory',
          component:orderInventory
        }/*,
     {
          path:'/orderInfoDetail',
          component:orderInfoDetail
        }*/
      ]
    }
  ],
  linkActiveClass: 'active'
});
router.beforeEach((to, from, next) => {
  // 继续路由导航
  next()
});
export default router
