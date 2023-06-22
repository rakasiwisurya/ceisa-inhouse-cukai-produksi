import Axios from "axios";
import { getUserAccessToken } from "./DataUser";

class AxiosRequest {
    header = {
        'Beacukai-api-key': process.env.REACT_APP_API_ALL_V2_KEY,
    }
    get = (url) => {
        return new Promise(async (resolve, reject) => {
            try {
                const request = await Axios.get(url, {
                    headers: {
                        ...this.header,
                        Authorization: 'Bearer ' + await getUserAccessToken()
                    }
                })
                resolve(request)
            } catch (error) {
                reject(error)
            }
        })
    }
    post = (url, payload) => {
        return new Promise(async (resolve, reject) => {
            try {
                const request = await Axios.post(url, payload, {
                    headers: {
                        ...this.header,
                        Authorization: 'Bearer ' + await getUserAccessToken()
                    }
                })
                resolve(request)
            } catch (error) {
                reject(error)
            }
        })
    }
    put = (url, payload) => {
        return new Promise(async (resolve, reject) => {
            try {
                const request = await Axios.put(url, payload, {
                    headers: {
                        ...this.header,
                        Authorization: 'Bearer ' + await getUserAccessToken()
                    }
                })
                resolve(request)
            } catch (error) {
                reject(error)
            }
        })
    }
    deletes = (url) => {
        return new Promise(async (resolve, reject) => {
            try {
                const request = await Axios.delete(url, {
                    headers: {
                        ...this.header,
                        Authorization: 'Bearer ' + await getUserAccessToken()
                    }
                })
                resolve(request)
            } catch (error) {
                reject(error)
            }
        })
    }
}

export default new AxiosRequest()