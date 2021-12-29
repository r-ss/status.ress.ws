<template>
  <div class="home">
    <!-- <h2>Visual</h2> -->


    <div id="scheme" v-html="nomnoml_final"></div>  

  </div>
</template>



<script>

import { mapGetters, mapActions, useStore } from 'vuex'
import { ref, computed } from 'vue'

import moment from 'moment'

const nomnoml = require('nomnoml')

const nomnoml_template = `

#padding: 5
#arrowSize: 0.75
#spacing: 30
#lineWidth: 2
#edgeMargin: 5
#ranker: longest-path
#gutter: 10
#fillArrows: true
#font: Arial
#fontSize: 12
#leading: 1.5
#direction: down

#.cell: title=center,bold body=left
#.greencell: fill=#ccffbb title=center,bold body=left
#.redcell: fill=#ff9988 title=center,bold body=left

[  🧑🏻‍💻 macbook  ] -- [ 🥸 VPN @ firestarter | digitalocean vps ]


[ colortag 🧩 validators | status ]

[  📦 foldwrap | digitalocean vps ] 
[  👀 monitoress (this) ]
[  🎀 selenium_playground  ]
[ 🐳 docker @ foldwrap ]
[ colortag 🦀 foldwrap_api | status ]
[ <database> mongodb ]
[ <database> 🚅 redis @ foldwrap ]
[ 🦀 foldwrap_api ] <--> [ <database> mongodb ]

[ 📟 eland_keenetic ]
[ colortag 🐣 eland_tinkerboard | status ]
[ colortag 📟 grani_microtic | status ]
[ 🪐 basscadet | intel i5, ubuntu ]

[ 🐳 docker @ basscadet ]
[ <database> 🚅 redis @ basscadet ]
[ 🍅 pomodoress ]
[ colortag 💾 ress_backup_manager | status ]


[  📦 foldwrap  ] - [  👀 monitoress (this) ]
[  📦 foldwrap  ] - [ 🐳 docker @ foldwrap ]
[  📦 foldwrap  ] - [  🎀 selenium_playground  ]
[ 🐳 docker @ foldwrap ] - [ 🚅 redis @ foldwrap ]
[ 🐳 docker @ foldwrap ] - [ 🦀 foldwrap_api ]


[ 📟 grani_microtic ] -- [ 🪐 basscadet ]
[ 🪐 basscadet ] - [ 💾 ress_backup_manager ]
[ 🪐 basscadet ] - [ 🍅 pomodoress ]
[ 🪐 basscadet ] - [ 🐳 docker @ basscadet ]
[ 🐳 docker @ basscadet ] - [ 🚅 redis @ basscadet ]
[ 🧩 validators ] - [ 🪐 basscadet ]
[ 👀 monitoress (this) ] <--> [ 🚅 redis @ foldwrap ]


[ 💾 ress_backup_manager ] -- [  🧑🏻‍💻 macbook  ]
[ 💾 ress_backup_manager ] --> [ 📟 eland_keenetic ]
[ 📟 eland_keenetic ] --> eland [ 🐣 eland_tinkerboard ]

[ 💾 ress_backup_manager ] <--> [ 🚅 redis @ basscadet ]


[ 🧘 existence_bot  ] heroku <--> [ <database> atlas ]

[<package> misc: | 🐔 rashka-zone | 🎵 spotify_api_playground | ☁️ notificationservice.ress.ws | ☁️ ress_morning_message ]



`
// [ colortag 🍅 pomodoress | status ]

export default {
  name: 'visual',
  setup() {
    const store = useStore()

    var nomnoml_code = ref(nomnoml_template)    
    const cell_regex = new RegExp(/\[\s(colortag)\s[^\s]*\s([^\s]*)\s\|\s(status)\s\]/g);   

    function modified_time_ago(dtobject) {
      return moment(moment.utc(dtobject)).fromNow()
    }


    const nomnoml_final = computed(() => {
        return nomnoml.renderSvg(nomnoml_code.value)
    })


    function construct_status_cell(match){
      let status_data = store.getters.status_data
      let row = match[0]
      let colortag = match[1]
      let name = match[2]
      let status = match[3]
      for (var probe of status_data.probes) {
        // console.log('probe', probe)
        if(probe.name == name){

            if (probe.success_count == null){
                probe.success_count = 0
            }
            if (probe.fail_count == null){
                probe.fail_count = 0
            }
            var color = '<greencell>'
            if (probe.status != 'ok'){
                color = '<redcell>'
            }

            let info = probe.status + ' ; ' + probe.success_count + ' / ' + probe.fail_count + ' (' + probe.success_ratio + ') ; type: ' + probe.type + ' ; ' + probe.lastcheck
            let newrow = row.replace('status', info)
            newrow = newrow.replace('colortag', color)
            nomnoml_code.value = nomnoml_code.value.replace(row, newrow)
        }
      }
    }



    async function create_nomnoml(data){
      let matches = nomnoml_template.matchAll(cell_regex);
      for (let m of matches){
          construct_status_cell(m)
      }
    }

    async function load_statuses(){
        const foo = await store.dispatch('fetchAndReturnStatus').then(data => {
          store.commit('set_status_data', {data})
          create_nomnoml(data)
        })
    }


    return { load_statuses, nomnoml_final, modified_time_ago }
  },
  computed: mapGetters(['status_loading', 'status_data']),
  methods: mapActions(['fetchAndReturnStatus']),
    created() {
      this.load_statuses()
  },
}
</script>