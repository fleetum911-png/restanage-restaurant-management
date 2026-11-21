export function userDto(user){return {id:user.id,name:user.name,email:user.email,phone:user.phone||'',role:user.role,createdAt:user.created_at}}
export function orderDto(row){return {id:row.id,customer:row.customer_name,userId:row.user_id,items:JSON.parse(row.items_json),status:row.status,type:row.service_type,tableNumber:row.table_number,subtotal:row.subtotal,amount:row.total,time:row.created_at,createdAt:row.created_at}}
export function recordDto(row){return {id:row.id,...JSON.parse(row.data_json),createdAt:row.created_at,updatedAt:row.updated_at}}
