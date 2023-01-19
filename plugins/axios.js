// export default function ({ $axios, app }, inject) {
//   const api = $axios.create({
//     headers: {
//       common: {
//         Authorization: `Bearer ${app.$cookies.get('token')}`
//       }
//     }
//   })
//   api.setBaseURL(process.env.apiUrl)

//   inject('api', api)
// }
import Cookies from 'js-cookie'
export default function ({ $axios, app }, inject) {
  const api = $axios.create({
    baseURL: process.env.apiUrl,
  })
  
  api.interceptors.request.use((config) => {
    const token = Cookies.get('token')
    if (token) {
      config.headers.Authorization = `Bearer ${token}`
    }
    return config
  })
  inject('api', api)
}