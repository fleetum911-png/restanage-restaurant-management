import {api} from './api.js'
export async function getMenu(){const {data}=await api.get('/menu');return Array.isArray(data)?data:(data.items||data.menu||[])}
