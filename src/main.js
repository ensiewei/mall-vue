import { createApp } from 'vue'
import App from './App.vue'
import installElementPlus from './plugins/element'
import router from './router'
import axios from 'axios'
import VueAxios from 'vue-axios'
import VueCookie from 'vue3-cookies'

const app = createApp(App).use(router).use(VueAxios, axios).use(VueCookie)

installElementPlus(app)
const vm = app.mount('#app')
vm.$router.beforeEach((to, from, next) => {
  if (to.name !== "Login") {
    const token = vm.$cookies.get("token")
    if (token) {
      vm.$http
        .get(`http://localhost:88/api/backstage/user/token?token=${token}`)
        .then((res) => {
          if (res.data.user) {
            next()
          } else {
            next({ name: 'Login' })
          }
        }).catch(() => {
          next({ name: 'Login' })
        })
    } else {
      next({ name: "Login" })
    }
  } else next()
})
