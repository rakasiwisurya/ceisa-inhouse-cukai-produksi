import Axios from "axios";

// barkir
// const axiosInstance = Axios.create({
//     baseURL: 'https://apisdev-gw.beacukai.go.id/barkir-svc-postgre',
//     // baseURL: process.env.REACT_APP_API_CASE_MANAGEMENT,
//     headers: {
//         'beacukai-api-key': '99be72b9-e953-4fa8-9bc7-be1dfb7270e6',
//         'Access-Control-Allow-Origin': '*'
//     }
// })

// case management
const axiosInstance = Axios.create({
    baseURL: process.env.REACT_APP_API_CASE_MANAGEMENT,
    headers: {
        'beacukai-api-key': process.env.REACT_APP_API_CASE_MANAGEMENT_SECRET_KEY,
        'Access-Control-Allow-Origin': '*'
    }
})

export default axiosInstance;