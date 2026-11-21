import axios from 'axios'
const configuredBaseUrl=(import.meta.env.VITE_API_BASE_URL||'').trim()
export const apiConfigured=Boolean(configuredBaseUrl)
export const api=axios.create({baseURL:configuredBaseUrl||'/api',timeout:15000,headers:{'Content-Type':'application/json','Accept':'application/json'}})
api.interceptors.request.use(config=>{const token=typeof sessionStorage!=='undefined'?sessionStorage.getItem('restanage_access_token'):null;if(token)config.headers.Authorization=`Bearer ${token}`;return config})
api.interceptors.response.use(response=>response,error=>{const status=error.response?.status;if(status===401&&typeof sessionStorage!=='undefined'){sessionStorage.removeItem('restanage_access_token');sessionStorage.removeItem('restanage_user')}return Promise.reject(error)})
export function getApiError(error,fallback='Something went wrong. Please try again.'){return error?.response?.data?.message||error?.response?.data?.error||error?.message||fallback}
export const fetchResource=async(path,config)=>{const {data}=await api.get(path,config);return data}
export const saveResource=async(path,payload,config)=>{const {data}=await api.post(path,payload,config);return data}
