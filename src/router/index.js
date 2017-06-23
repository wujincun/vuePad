import Vue from 'vue'
import Router from 'vue-router'
import handover from 'components/page-components/handover/handover'
import handoverList from 'components/page-components/handover/handoverList'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path:'/handover',
      component:handover
    },
    {
      path:'/',
      component:handover,
      redirect:'/handover'
    },
    {
      path:'/handoverList',
      component: handoverList
    }
  ]
})
