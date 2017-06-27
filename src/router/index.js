import Vue from 'vue'
import Router from 'vue-router'
import handover from 'components/page-components/handover/handover'
import handoverList from 'components/page-components/handover/handoverList'
import orderManage from 'components/page-components/orderManage/orderManage'

Vue.use(Router)

export default new Router({
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
      component: orderManage
    }
  ]
})
