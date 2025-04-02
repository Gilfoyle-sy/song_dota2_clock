import './assets/main.css'
import './assets/iconfont/iconfont.js'

import { createApp } from 'vue'
import App from './App.vue'

import SvgIcon from './components/SvgIcon/SvgIcon.vue'

const app = createApp(App)

app.component('SvgIcon', SvgIcon)

app.mount('#app')
