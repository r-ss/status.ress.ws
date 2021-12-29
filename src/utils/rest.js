import axios from 'axios'

// const token = localStorage.getItem('token')

export const universalFetch = function (dispatch, commit, url, method = 'GET') {
    return new Promise((resolve, reject) => {
        // console.log('Universal fetch')
        // dispatch('makeNotification', 'universalFetch')

        // temporary solution to token error after login and redirect to campaigns page


        // commit('startLoading')
        // commit('startGlobalLoading')
        fetch(url, { method: method, headers: { 'Access-Control-Allow-Origin': '*', 'Content-type': 'application/json' }}).then(resp => {

            // resp.json().then((data => {
            //     // temporary handling expired token sceario here - because no skill to intercept and check token in axios request
            //     resolve(data)
            // }))

            resp.json().then((data => {
                // temporary handling expired token sceario here - because no skill to intercept and check token in axios request
                // console.log('data', data) 
                resolve(data)
            }))

        }).catch(err => {
            console.error('Custom error in universalFetch')
            // console.log(err)
            reject(err)
        }).finally(() => {
            // commit('stopLoading')
            // commit('stopGlobalLoading')
        })
    })
}

export const universalPost = function (dispatch, commit, url, data, method = 'POST') {
    return new Promise((resolve, reject) => {
        // console.log('Universal post')
        // dispatch('makeNotification', 'universalPost')

        // temporary solution to token error after login and redirect to campaigns page
        // const token = localStorage.getItem('token')
        // axios.defaults.headers.common['Authorization'] = token

        // commit('startLoading')
        // commit('startGlobalLoading')

        // let headers = { 'Access-Control-Allow-Origin': '*', 'Content-type': 'application/json', 'Authorization': token }
        let headers = { 'Access-Control-Allow-Origin': '*', 'Content-type': 'application/json' }

        // console.log(data, file)

        // let formData = null
        // if (file){
        //     formData = new FormData();
        //     formData.append('file', file);
        //     headers = { 'Content-Type': 'multipart/form-data' }
        // }

        axios({ url: url,
                data: {data: data},
                method: method,
                headers: headers
        })
        .then(resp => {
            if (resp.data.result) {
                // console.log('result ok')
                // console.log(resp)

                // if(resp.data.message) dispatch('makeNotification', resp.data.message)

                resolve(resp)    
            } else {
                console.error('Custom error in universalPost, bad result response')
                // dispatch('makeNotification', 'Error. Bad result response')
                reject('Custom error in universalPost, bad result response')
            }
        })
        .catch(err => {
            console.error('Custom error in universalPost')
            reject(err)
        })//.finally(() => {
            // commit('stopLoading')
            // commit('stopGlobalLoading')
        //})
    })
}


export const universalUpload = function (dispatch, commit, url, files) {
    return new Promise((resolve, reject) => {
        // console.log('Universal post')
        // dispatch('makeNotification', 'universalPost')

        // commit('startLoading')
        commit('startGlobalLoading')

        // console.log(file)

        let formData = new FormData();

        // console.log(files.length)

        // look are we have multiple files (FilesList) or just one
        if(files.length){
            for (var i = 0; i < files.length; i++) {    
                formData.append('file', files[i]);
            }
        } else {
            formData.append('file', files);
        }

        // formData.append('file', file);
        
        // formData.append('operationtype', operationtype);
        
        axios({ url,
                data: formData,
                method: 'post',
                headers: {'Content-Type': 'multipart/form-data'},
                onUploadProgress: (progressEvent) => {
                    const totalLength = progressEvent.lengthComputable ? progressEvent.total : progressEvent.target.getResponseHeader('content-length') || progressEvent.target.getResponseHeader('x-decompressed-content-length');
                    // console.log("onUploadProgress", totalLength);
                    if (totalLength !== null) {
                        // this.updateProgressBarValue(Math.round( (progressEvent.loaded * 100) / totalLength ));
                        // console.log(Math.round( (progressEvent.loaded * 100) / totalLength ));
                        // commit('updateACProgressBar', Math.round( (progressEvent.loaded * 100) / totalLength ))
                        commit('updateACProgressBar', Math.round( (progressEvent.loaded * 100) / totalLength ))
                    }
                }
        })
        .then(resp => {
            if (resp.data.result) {
                // console.log('result ok')
                // console.log(resp)

                if(resp.data.message) dispatch('makeNotification', resp.data.message)

                resolve(resp)    
            } else {
                console.error('Custom error in universalPost, bad result response')
                dispatch('makeNotification', 'Error. Bad result response')
                reject('Custom error in universalPost, bad result response')
            }
        })
        .catch(err => {
            console.error('Custom error in universalPost')
            reject(err)
        }).finally(() => {
            // commit('stopLoading')
            commit('stopGlobalLoading')
        })
    })
}