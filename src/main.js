import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'

// import { createI18n } from "vue-i18n/dist/vue-i18n.esm-bundler.js";

// const messages = {
//   es: {
//     message: {
//       value: 'Hola Español.',
//     },
//   },
//   en: {
//     message: {
//       value: 'Hello English.',
//     },
//   },
// }

// Vue.use(require('moment'))

// import moment from 'moment'



// import axios from 'axios'
//import installElementPlus from './plugins/element.js'

// const app = createApp(App)
const app = createApp(App)


app.use(store)
app.use(router)


// app.use(moment)

app.config.globalProperties.$appName = 'status.ress'
//app.config.globalProperties.$apiHost = 'http://0.0.0.0:5000'
// app.config.globalProperties.$apiHost = 'http://api.foldwrap.com'

app.config.productionSourceMap = false
app.config.filenameHashing = true

// app.config.globalProperties.$http = axios // Setup Axios globally
// // https://www.digitalocean.com/community/tutorials/handling-authentication-in-vue-using-vuex
// const token = localStorage.getItem('token')
// if (token) {
//     app.config.globalProperties.$http.defaults.headers.common['Authorization'] = token
// }

// PrimeVue
// https://www.primefaces.org/primevue/showcase/#/setup
/*
import PrimeVue from 'primevue/config';
import Button from 'primevue/button';
import TreeTable from 'primevue/treetable';
import Column from 'primevue/column';

import 'primevue/resources/themes/saga-blue/theme.css'  //theme
import 'primevue/resources/primevue.min.css' //core css
import 'primeicons/primeicons.css'

app.use(PrimeVue, {ripple: true})

app.component('Button', Button);
app.component('TreeTable', TreeTable);
app.component('Column', Column);
*/


app.mount('#app')


// axios.interceptors.request.use(
// (config) => {
//     config.headers['Authorization'] = `Bearer ${ token }`;
//     return config;
// }, 

// (error) => {
//     return Promise.reject(error);
// }
// );

// Handling Access
// TODO - and Refresh Tokens using Axios Interceptors.
// https://medium.com/swlh/handling-access-and-refresh-tokens-using-axios-interceptors-3970b601a5da
// axios.interceptors.response.use((response) => {
//     return response
//   }, function (error) {
//     const originalRequest = error.config;
  
//     //console.log(error.response)
  
//     // if (error.response.status === 401 && originalRequest.url === 'http://13.232.130.60:8081/v1/auth/token) {
//     if (error.response.status === 401) {
//         console.log('error 401 in interceptor catch > making router push to /')
//         router.push('/')
//         return Promise.reject(error);
//     }
  
//   if (error.response.status === 401 && !originalRequest._retry) {
//       console.log('error 401 in interceptor catch > TODO reaction')
//       /*
//       originalRequest._retry = true;
      
//       const refreshToken = localStorageService.getRefreshToken();
//       return axios.post('/auth/token',
//           {
//               "refresh_token": refreshToken
//           })
//           .then(res => {
//               if (res.status === 201) {
//                   localStorageService.setToken(res.data);
//                   axios.defaults.headers.common['Authorization'] = 'Bearer ' + localStorageService.getAccessToken();
//                   return axios(originalRequest);
//               }
//           })
//         */
//   }
//   return Promise.reject(error);
//   });
  