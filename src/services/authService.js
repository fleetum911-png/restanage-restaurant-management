import {api} from './api.js'
function saveSession(data){const token=data?.accessToken||data?.token;if(token&&typeof sessionStorage!=='undefined')sessionStorage.setItem('restanage_access_token',token);const user=data?.user||data?.customer||data?.admin;if(user&&typeof sessionStorage!=='undefined')sessionStorage.setItem('restanage_user',JSON.stringify(user));return {token,user}}
export async function loginUser({email,password,role}){const {data}=await api.post('/auth/login',{email,password,role:role.toLowerCase()});return {...saveSession(data),data}}
export async function registerCustomer({name,email,phone,password}){const {data}=await api.post('/auth/register',{name,email,phone,password,role:'customer'});return {...saveSession(data),data}}
export function clearSession(){if(typeof sessionStorage==='undefined')return;sessionStorage.removeItem('restanage_access_token');sessionStorage.removeItem('restanage_user')}
