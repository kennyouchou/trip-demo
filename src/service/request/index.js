import axios from 'axios'
import { BASE_URL , TIMEOUT } from "./config";
import useMainStore from "@/stores/modules/main";
const mainStore = useMainStore()

class KNRequest {
  constructor(baseURL,timeout){
    this.instance = axios.create({
      baseURL,
      timeout
    })

    this.instance.interceptors.request.use(config => {
      mainStore.isLoading = true
      return config
    },err => {
      return err
    })

    this.instance.interceptors.response.use(res => {
      mainStore.isLoading = false
      return res
    },err => {
      mainStore.isLoading = false
      return err
    })
  }
  
  request(config){
    // mainStore.isLoading = true
    return new Promise((resolve, reject) => {
      this.instance.request(config).then(res => {
        resolve(res.data)
        // mainStore.isLoading = false
      }).catch(err =>{
        reject(err)
        // mainStore.isLoading = false
      })
    })
  }
  get(config) {
    return this.request({ ...config, method: 'get' })
  }
  post(config) {
    return this.request({ ...config, method: 'post' })
  }
}

// const knRequest1 = new KNRequest('xxxx')
// const knRequest2 = new KNRequest('xxxx')
export default new KNRequest(BASE_URL,TIMEOUT)