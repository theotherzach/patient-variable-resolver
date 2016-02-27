import Vue from 'vue'
import VueRouter from 'vue-router'
import App from './components/App.vue'
import ImportReport from './components/ImportReport.vue'

Vue.use(VueRouter)

const router = new VueRouter({
  hashbang: true,
})

router.map({
  '/': {
    component: ImportReport
  }
})

router.start(App, '#app')
