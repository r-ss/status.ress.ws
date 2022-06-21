import axios from 'axios'


export const universalFetch = function (dispatch, commit, url, method = 'GET') {
    return new Promise((resolve, reject) => {

        fetch(url, { method: method, headers: { 'Access-Control-Allow-Origin': '*', 'Content-type': 'application/json' }}).then(resp => {

            resp.json().then((data => {
                resolve(data)
            }))

        }).catch(err => {
            console.error('Custom error in universalFetch')
            reject(err)
        })
    })
}

export const universalPost = function (dispatch, commit, url, data, method = 'POST') {
    return new Promise((resolve, reject) => {

        let headers = { 'Access-Control-Allow-Origin': '*', 'Content-type': 'application/json' }


        axios({ url: url,
                data: {data: data},
                method: method,
                headers: headers
        })
        .then(resp => {
            if (resp.data.result) {
                resolve(resp)    
            } else {
                console.error('Custom error in universalPost, bad result response')
                reject('Custom error in universalPost, bad result response')
            }
        })
        .catch(err => {
            console.error('Custom error in universalPost')
            reject(err)
        })
    })
}


export const universalUpload = function (dispatch, commit, url, files) {
    return new Promise((resolve, reject) => {
        commit('startGlobalLoading')

        let formData = new FormData();

        if(files.length){
            for (var i = 0; i < files.length; i++) {    
                formData.append('file', files[i]);
            }
        } else {
            formData.append('file', files);
        }

        axios({ url,
                data: formData,
                method: 'post',
                headers: {'Content-Type': 'multipart/form-data'},
                onUploadProgress: (progressEvent) => {
                    const totalLength = progressEvent.lengthComputable ? progressEvent.total : progressEvent.target.getResponseHeader('content-length') || progressEvent.target.getResponseHeader('x-decompressed-content-length');
                    if (totalLength !== null) {
                        commit('updateACProgressBar', Math.round( (progressEvent.loaded * 100) / totalLength ))
                    }
                }
        })
        .then(resp => {
            if (resp.data.result) {

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
            commit('stopGlobalLoading')
        })
    })
}