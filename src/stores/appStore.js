import { create } from 'zustand'
import { menuItems } from '../data/mockData.js'
export const useAppStore=create((set,get)=>({role:'Admin',customerProfile:{name:'Guest',email:'',phone:''},tableNumber:4,cart:[],search:'',category:'All items',diet:'All',sidebarOpen:true,cartOpen:false,orders:[],
 setRole:role=>set({role}),setCustomerProfile:customerProfile=>set({customerProfile}),setTableNumber:tableNumber=>set({tableNumber:Number(tableNumber)||4}),setSearch:search=>set({search}),setCategory:category=>set({category}),setDiet:diet=>set({diet}),toggleSidebar:()=>set(s=>({sidebarOpen:!s.sidebarOpen})),setCartOpen:cartOpen=>set({cartOpen}),
 addToCart:(itemOrId,custom='')=>{const item=typeof itemOrId==='object'?itemOrId:menuItems.find(x=>x.id===itemOrId);if(!item)return;set(s=>{const found=s.cart.find(x=>x.id===item.id&&x.custom===custom);return {cart:found?s.cart.map(x=>x===found?{...x,qty:x.qty+1}:x):[...s.cart,{...item,qty:1,custom}]}})},
 changeQty:(id,delta,custom='')=>set(s=>({cart:s.cart.map(x=>x.id===id&&x.custom===custom?{...x,qty:x.qty+delta}:x).filter(x=>x.qty>0)})),clearCart:()=>set({cart:[]}),
 getSubtotal:()=>get().cart.reduce((a,x)=>a+x.price*x.qty,0),
 pushOrder:order=>set(s=>({orders:[order,...s.orders.filter(existing=>existing.id!==order.id)]})),
 updateOrderStatus:(id,status)=>set(s=>({orders:s.orders.map(order=>order.id===id?{...order,status}:order)}))
}))
