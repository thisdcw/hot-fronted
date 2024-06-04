import axios, {AxiosInstance, CreateAxiosDefaults} from "axios";

const myAxios: AxiosInstance = axios.create({
    baseURL: 'http://localhost:8080/api'
})

myAxios.defaults.withCredentials = true;

myAxios.interceptors.request.use((config) => {
    console.log("发送请求")
    return config;
}, (error) => {
    return Promise.reject(error)
});

myAxios.interceptors.response.use((response) => {
    console.log("响应成功")
    return response.data;
}, (error) => {
    console.log("响应失败")
    return Promise.reject(error)
});

export default myAxios;