<template>
  <div class="home">
    <!-- <h2>RAW</h2> -->

    <div v-if="status_loading" class="loading loading-lg"></div>
    <div v-else>
        <pre class="code"><code>{{ status_data }}</code></pre>
    </div>



  </div>
</template>



<script>

import { mapGetters, mapActions, useStore } from 'vuex'
// import { ref, computed } from 'vue'

export default {
  name: 'raw',
  setup() {
    const store = useStore()


async function load_statuses(){
    // console.log('> load_statuses')
    const foo = await store.dispatch('fetchAndReturnStatus').then(data => {
      // console.log('> load_statuses > then')
      store.commit('set_status_data', {data})
      // console.log('pp', data)
      // create_nomnoml(data)
    })

}
       
    return { load_statuses }
  },
  computed: mapGetters(['status_loading', 'status_data']),
  methods: mapActions(['fetchStatus', 'fetchAndReturnStatus']),
    created() {
      //this.makeNotification('Posts page has visited')
      // this.fetchAndReturnStatus()
      // console.log('> created()')
      this.load_statuses()
  },


}
</script>