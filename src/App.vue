<template>
<div class="app-body">


    <Navbar />

    <div class="pagecontent">
      <router-view v-slot="{ Component }">
        <!-- <keep-alive> -->
          <component :is="Component" />
        <!-- </keep-alive> -->
      </router-view>
    </div>



</div><!-- .app-body -->

</template>






<script>
import Navbar from '@/components/Navbar.vue'

export default {
  name: 'App',
  components: {
    Navbar
  },
  created: function () {




    /*
    this.$http.interceptors.response.use(undefined, function (err) {
      console.log('> cool interceptor')
      console.log(err.config)
      return new Promise(function (resolve, reject) {
        
        if (err.status === 401 && err.config && !err.config.__isRetryRequest) {
          console.log('Expired token interceptor in App.vue fired')
          this.$store.dispatch('logout')
        }
        throw err;
      });
    });*/

/*

    this.$http.interceptors.response.use((response) => {
        return response
      }, function (error) {
        const originalRequest = error.config;

        //console.log(error.response)

        // if (error.response.status === 401 && originalRequest.url === 'http://13.232.130.60:8081/v1/auth/token) {
        if (error.response.status === 401) {
            console.log('router push here')
            console.log(this.$router)
            this.$router.push('/')
            return Promise.reject(error);
        }

      if (error.response.status === 401 && !originalRequest._retry) {
          console.log('somewhere in function')
          
          originalRequest._retry = true;
          
          const refreshToken = localStorageService.getRefreshToken();
          return axios.post('/auth/token',
              {
                  "refresh_token": refreshToken
              })
              .then(res => {
                  if (res.status === 201) {
                      localStorageService.setToken(res.data);
                      axios.defaults.headers.common['Authorization'] = 'Bearer ' + localStorageService.getAccessToken();
                      return axios(originalRequest);
                  }
              })
            
      }
      return Promise.reject(error);
    });


*/






  }
}
</script>

<style>


#app {
  margin: 15px;
}







.pagecontent {
  position: relative;
  top: 0px;
  padding-bottom: 40px;
}



.m-top { margin-top: 15px; }
.mm-top { margin-top: 30px; }
.m-right { margin-right: 15px; }
.mm-right { margin-right: 30px; }
.m-bottom { margin-bottom: 15px; }
.mm-bottom { margin-bottom: 30px; }
.m-left { margin-left: 15px; }
.mm-left { margin-left: 30px; }

.strikethrough { text-decoration: line-through; }
.inline-block {display: inline-block;}

.center {text-align: center;}
.align-left {text-align: left;}
.align-right {text-align: right;}

.pointer {cursor: pointer;}


</style>

