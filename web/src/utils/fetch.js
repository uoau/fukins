import axios from 'axios';

export function fetch(query = {}) {
    // 参数
    const params = { ...query };
    // 处理get请求
    if (params.method === 'get') {
        params.params = params.data;
        delete params.data;
    }
    // headers
    if (params.method !== 'get'){
        params.headers = {};
        params.headers.Authorization = localStorage.getItem('token');
    }
    // 合理状态
    params.validateStatus = (status) => (status >= 200 && status < 400);

    return axios(params)        
        .then((res) => {
            return res.data;
        })
        .catch((err)=>{
            console.log(err);
        })
}

export function get(url, data = {}, headers = {}){
    return fetch({
        url, 
        data, 
        method: 'get', 
        headers,
    });
}

export function post(url, data = {}, headers = {}){
    return fetch({
        url, 
        data, 
        method: 'post', 
        headers,
    });   
}

export function put(url, data = {}, headers = {}){
    return fetch({
        url, 
        data, 
        method: 'put', 
        headers,
    });        
}

export function del(url, data = {}, headers = {}){
    return fetch({
        url, 
        data, 
        method: 'delete', 
        headers,
    });        
}