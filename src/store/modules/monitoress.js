//import axios from 'axios'
import router from '@/router'
import axios from 'axios'

import {universalFetch, universalPost, universalUpload} from '@/utils/rest'

const apihost = process.env.VUE_APP_API_HOST

// const apihost = 'https://status.ress.ws/api/all'

export default {
    //inject:['$apiHost'],
    state: {
        loading: false,
        status_data: null
    },
    actions: {
        async fetchStatus({ dispatch, commit }) {
            commit('startStatusLoading')
            let url = apihost + '/all'
            let data = await universalFetch( dispatch, commit, url ).then((data => {
                // temporary handling expired token sceario here - because no skill to intercept and check token in axios request
                console.log('data', JSON.stringify(data)) 
                commit('stopStatusLoading')
                commit('set_status_data', data)
            }))
            
        },
        async fetchAndReturnStatus({ dispatch, commit }) {
            commit('startStatusLoading')

            return new Promise((resolve, reject) => {
                axios({ url: apihost + '/all', method: 'GET'}).then(resp => {
                    // console.log(resp.data.client)
                    commit('stopStatusLoading')
                    // commit('set_status_data', resp.data)
                    resolve(resp.data)
                    
                })
            })

            // let url = apihost
            // let data = await universalFetch( dispatch, commit, url ).then((data => {
            //     // temporary handling expired token sceario here - because no skill to intercept and check token in axios request
            //     // console.log('data', data) 
            //     commit('stopStatusLoading')
            //     commit('set_status_data', data)
            //     return data
            // }))
            
        }
    },
    mutations: {

        startStatusLoading(state) { state.loading = true },
        stopStatusLoading(state) { state.loading = false },

        set_status_data(state, data) {
            state.status_data = JSON.stringify(data.data)
        },


    },
    getters: {
        status_loading(state) {
            return state.loading
        },
        status_data(state) {
            return JSON.parse(state.status_data)
        },

    }
} 