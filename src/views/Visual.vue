<template>
  <div class="home">
    <!-- <h2>Visual</h2> -->

    <div v-if="status_loading" class="loading loading-lg"></div>
    <div v-else>
        <div id="scheme" v-html="nomnoml_final"></div>
    </div>

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



// GRANI

[ colortag 🧩 validators | status ]
[ colortag 📟 grani_microtic | status ]
[ 🪐 basscadet | intel i5, ubuntu ]
[ 📟 grani_microtic ] -- [ 🪐 basscadet ]
[ 🪐 basscadet ] - [ 🐳 docker @ basscadet ]
[ 🧩 validators ] - [ 🪐 basscadet ]


// NEWFOLD DROPLET

[  📦 newfold | digitalocean vps ] 

[ colortag 🦀 foldwrap | status ]
[ colortag 🦀 figma_service | status ]
[ colortag 🦀 foldwrap_deploytool | status ]

[  📦 newfold  ] - [ 🐳 docker @ newfold ]

[  📦 newfold  ] - [ 🐢 tmux @ newfold ]

[ 🐳 docker @ newfold ] - [ 🤬 ress_smalltalk ]
[ 🐳 docker @ newfold ] - [ 🦀 foldwrap ]
[ 🐳 docker @ newfold ] - [ 🦀 figma_service ]

[ 🐢 tmux @ newfold ] - [ 👀 monitoress (this) ]
[ 🐢 tmux @ newfold ] - [ 🕊️ ress_notification_service ]
[ 🐢 tmux @ newfold ] - [ 🦀 foldwrap_deploytool  ]


// ENERGRAM DROPLET

[ colortag ⚡️ energram_api | status ]
[ colortag ⚡️ energram_deploytool | status ]

[  📦 energram  | digitalocean vps ]

[ 🐳 docker @ energram ]
[ 🐢 tmux @ energram ]

[  📦 energram  ] - [ 🐳 docker @ energram ]
[  📦 energram  ] - [ 🐢 tmux @ energram ]
[ 🐢 tmux @ energram ] - [ ⚡️ energram_deploytool ]
[ 🐳 docker @ energram ] - [ ⚡️ energram_api ]
[ ⚡️ energram_deploytool ] -> [ 🐳 docker @ energram ]



`

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
      // let colortag = match[1]
      let name = match[2]
      // let status = match[3]
      for (var probe of status_data.probes) {
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

            var extrafields = ''
            if (Object.keys(probe.extra).length > 0) {
                extrafields = ' | '
                for (var key in probe.extra){
                  // console.log( key, dict[key] );
                  extrafields = extrafields + key + ': ' + probe.extra[key] + ' ; '
                }

                extrafields = extrafields.substring(0, extrafields.length - 2); // remove last 2 chars - ;
            }

            let info = probe.status + ' ; ' + probe.success_count + ' / ' + probe.fail_count + ' (' + probe.success_ratio + ') ; type: ' + probe.type + ' ; ' + probe.lastcheck + extrafields
            
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