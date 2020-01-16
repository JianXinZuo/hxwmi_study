import axios from 'axios';

const baseUrl = "/api";

//请求前拦截
axios.interceptors.request.use(
    config => {

        let token = window.localStorage.getItem("accessToken1"); //设置Jwt认证Token

        if (token) {
            config.headers['accessToken'] = Token;  //将token放到请求头发送给服务器,将tokenkey放在请求头中
            return config;
        }

        return config;
    },
    err => {
        console.log("请求超时");
        return Promise.reject(err);
    }
);

//返回后拦截
axios.interceptors.response.use(
    (data) => { 
        return data 
    },
    (err) => {

        if (err.response.status === 504 || err.response.status === 404) {

            console.log("服务器被吃了⊙﹏⊙∥");
            // window.location.href = "/login"

        } else if (err.response.status === 401) {
            
            console.log("你没有权限访问");
            window.location.href = "/login"

        } else if (err.response.status === 500) {

            console.log("服务器开小差了⊙﹏⊙∥");

        }
        return Promise.reject(err);
    }
);

//RequestBody请求
const PostBody = (url, params) => {
    return axios({
        method: "post",
        url: `${baseUrl}${url}`,
        data: params,
        headers: {
            "Content-Type": "application/json",
            charset: "utf-8"
        }
    });
};

//多个请求合并
const Multiple = function(requsetArray, callback) {
    axios.all(requsetArray).then(axios.spread(callback));
};

//Get请求
const Get = (url) => {
    return axios({
        method: "get",
        url: `${baseUrl}${url}`
    });
}

//Post请求
const PostHeader = (url, params) => {
    return axios({
        method: "post",
        url: `${baseUrl}${url}`,
        data: params,
        transformRequest: [
            function(data) {
                let ret = "";
                for (let it in data) {
                    ret += encodeURIComponent(it) + "=" + encodeURIComponent(data[it]) + "&";
                }
                return ret;
            }
        ],
        headers: {
            "Content-Type": "application/x-www-form-urlencoded"
        }
    });
};

//表单提交方式
const Post_FormData = (url, params) =>{
    return axios({
        method: "post",
        url: `${baseUrl}${url}`,
        data: params,
        headers: {
            "Content-Type": "multipart/form-data",
            charset: "utf-8"
        }
    });
}

const Axios ={
    Get,
    PostHeader,
    PostBody,
    Multiple,
    Post_FormData
}

export {
    Axios
}