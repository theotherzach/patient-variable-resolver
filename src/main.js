import Vue from 'vue'
import VueRouter from 'vue-router'
import App from './components/App.vue'
import ImportReport from './components/ImportReport.vue'
import Audits from './components/Audits.vue'
import Audit from './components/Audit.vue'

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
  },
  '/audits/:patientId': {
    name: 'audit',
    component: Audit
  }
})

Vue.config.debug = true

router.start(App, '#app')
