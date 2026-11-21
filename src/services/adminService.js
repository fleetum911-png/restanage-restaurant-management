import {api} from './api.js'
export async function getDashboard(){const {data}=await api.get('/admin/dashboard');return data}
export async function getAdminResource(resource){const {data}=await api.get(`/admin/${resource}`);return data.items||[]}
export async function createAdminRecord(resource,payload){const {data}=await api.post(`/admin/${resource}`,payload);return data.item||data}
export async function updateAdminRecord(resource,id,payload){const {data}=await api.patch(`/admin/${resource}/${encodeURIComponent(id)}`,payload);return data.item||data}
export async function deleteAdminRecord(resource,id){await api.delete(`/admin/${resource}/${encodeURIComponent(id)}`)}
export async function createMenuItem(payload){const {data}=await api.post('/admin/menu',payload);return data.item||data}
export async function updateMenuItem(id,payload){const {data}=await api.patch(`/admin/menu/${encodeURIComponent(id)}`,payload);return data.item||data}
export async function createTable(payload){const {data}=await api.post('/admin/tables',payload);return data.item||data}
export async function updateTable(id,payload){const {data}=await api.patch(`/admin/tables/${encodeURIComponent(id)}`,payload);return data.item||data}
export async function getAdminMenu(){const {data}=await api.get('/admin/menu');return data.items||[]}
