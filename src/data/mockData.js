export const menuItems = [
 {id:1,name:'Paneer Tikka',category:'Starters',price:320,tag:'Vegetarian',rating:4.9,time:'12 min',image:'photo-1567188040759-fb8a883dc6d8',description:'Tandoor-charred paneer, hung curd, ajwain and mint chutney.'},
 {id:2,name:'Butter Chicken',category:'Mains',price:480,tag:'Chef favorite',rating:4.9,time:'20 min',image:'photo-1603894584373-5ac82b2ae398',description:'Slow-cooked tomato makhani gravy, cream and a touch of kasuri methi.'},
 {id:3,name:'Hyderabadi Dum Biryani',category:'Mains',price:420,tag:'Gluten free',rating:4.8,time:'18 min',image:'photo-1563379091339-03246963d96c',description:'Fragrant basmati, saffron, caramelized onions and dum-cooked spices.'},
 {id:4,name:'Masala Dosa',category:'Breakfast',price:260,tag:'Vegetarian',rating:4.7,time:'14 min',image:'photo-1668236543090-82eba5ee5976',description:'Golden crisp dosa with spiced potato, coconut chutney and sambar.'},
 {id:5,name:'Dal Makhani',category:'Mains',price:340,tag:'Vegetarian',rating:4.8,time:'16 min',image:'photo-1546833999-b9f581a1996d',description:'Black lentils simmered overnight with butter, tomato and gentle spices.'},
 {id:6,name:'Gulab Jamun',category:'Desserts',price:180,tag:'Vegetarian',rating:4.9,time:'5 min',image:'photo-1666190092159-7e9cc8c5ee87',description:'Warm khoya dumplings in cardamom and saffron syrup.'},
 {id:7,name:'Chole Bhature',category:'Mains',price:290,tag:'Vegetarian',rating:4.7,time:'15 min',image:'photo-1626132647523-66f5bf380027',description:'Punjabi chickpea masala with fluffy, freshly fried bhature.'},
 {id:8,name:'Mango Lassi',category:'Drinks',price:160,tag:'Signature',rating:4.8,time:'4 min',image:'photo-1570197788417-0e82375c9371',description:'Alphonso mango, chilled yogurt and a little cardamom.'}
]
export const orders = [
 {id:'#SS-2048',customer:'Aarav Sharma',items:'2 items · Butter Chicken, Naan',status:'Preparing',time:'12:42 PM',amount:680,type:'Dine in · T4'},
 {id:'#SS-2047',customer:'Diya Mehta',items:'3 items · Biryani, Lassi',status:'Ready',time:'12:38 PM',amount:740,type:'Dine in · T8'},
 {id:'#SS-2046',customer:'Kabir Rao',items:'1 item · Paneer Tikka',status:'New',time:'12:35 PM',amount:320,type:'Pickup'},
 {id:'#SS-2045',customer:'Anaya Iyer',items:'4 items · Family feast',status:'Completed',time:'12:29 PM',amount:1280,type:'Dine in · T2'},
 {id:'#SS-2044',customer:'Vivaan Kapoor',items:'2 items · Mains',status:'Preparing',time:'12:21 PM',amount:820,type:'Delivery'}
]
export const tables = Array.from({length:12},(_,i)=>({id:i+1,seats:i%3===0?4:2,status:['Occupied','Available','Reserved','Cleaning','Occupied','Available'][i%6],server:['Priya','Arjun','Riya'][i%3],time:i%6===0?'42 min':null}))
export const sales = [{day:'Mon',revenue:32000,orders:89},{day:'Tue',revenue:41000,orders:102},{day:'Wed',revenue:37000,orders:94},{day:'Thu',revenue:52000,orders:128},{day:'Fri',revenue:46000,orders:114},{day:'Sat',revenue:68000,orders:156},{day:'Sun',revenue:59000,orders:142}]
