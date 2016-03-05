import Vue from 'vue'
import VueRouter from 'vue-router'
import App from './components/App.vue'
import ImportReport from './components/ImportReport.vue'
import Audits from './components/Audits.vue'

Vue.use(VueRouter)

const router = new VueRouter({
  hashbang: true,
})

router.map({
  '/': {
    component: ImportReport
  },
  '/audits': {
    component: Audits
  }
})

router.start(App, '#app')
