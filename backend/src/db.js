import {DatabaseSync} from 'node:sqlite'
import {mkdirSync} from 'node:fs'
import {dirname,resolve} from 'node:path'
import {fileURLToPath} from 'node:url'
import dotenv from 'dotenv'
dotenv.config({path:resolve(process.cwd(),'.env')})
const backendDir=resolve(dirname(fileURLToPath(import.meta.url)),'..')
const databaseFile=process.env.DATABASE_FILE?resolve(process.cwd(),process.env.DATABASE_FILE):resolve(backendDir,'data/restanage.sqlite')
mkdirSync(dirname(databaseFile),{recursive:true})
export const db=new DatabaseSync(databaseFile)
db.exec('PRAGMA journal_mode = WAL; PRAGMA foreign_keys = ON;')
db.exec(`
CREATE TABLE IF NOT EXISTS users (
 id INTEGER PRIMARY KEY AUTOINCREMENT,
 name TEXT NOT NULL,
 email TEXT NOT NULL UNIQUE COLLATE NOCASE,
 phone TEXT,
 password_hash TEXT NOT NULL,
 role TEXT NOT NULL DEFAULT 'customer' CHECK(role IN ('admin','customer','kitchen','waiter')),
 created_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP
);
CREATE TABLE IF NOT EXISTS menu_items (
 id INTEGER PRIMARY KEY AUTOINCREMENT,
 name TEXT NOT NULL,
 description TEXT NOT NULL DEFAULT '',
 category TEXT NOT NULL DEFAULT 'Mains',
 price INTEGER NOT NULL CHECK(price >= 0),
 tag TEXT NOT NULL DEFAULT 'Popular',
 rating REAL NOT NULL DEFAULT 4.8,
 prep_time TEXT NOT NULL DEFAULT '12 min',
 image TEXT NOT NULL DEFAULT '',
 is_available INTEGER NOT NULL DEFAULT 1,
 created_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP
);
CREATE TABLE IF NOT EXISTS restaurant_tables (
 id INTEGER PRIMARY KEY AUTOINCREMENT,
 table_number INTEGER NOT NULL UNIQUE,
 seats INTEGER NOT NULL DEFAULT 2,
 status TEXT NOT NULL DEFAULT 'Available',
 server TEXT NOT NULL DEFAULT 'Unassigned'
);
CREATE TABLE IF NOT EXISTS orders (
 id TEXT PRIMARY KEY,
 user_id INTEGER REFERENCES users(id) ON DELETE SET NULL,
 customer_name TEXT NOT NULL,
 items_json TEXT NOT NULL,
 status TEXT NOT NULL DEFAULT 'New',
 service_type TEXT NOT NULL DEFAULT 'Dine in',
 table_number INTEGER,
 subtotal INTEGER NOT NULL,
 total INTEGER NOT NULL,
 created_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP
);
CREATE TABLE IF NOT EXISTS restaurant_records (
 id INTEGER PRIMARY KEY AUTOINCREMENT,
 resource TEXT NOT NULL,
 data_json TEXT NOT NULL,
 created_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP,
 updated_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP
);
CREATE INDEX IF NOT EXISTS idx_orders_user_created ON orders(user_id, created_at DESC);
CREATE INDEX IF NOT EXISTS idx_orders_status ON orders(status);
CREATE INDEX IF NOT EXISTS idx_records_resource ON restaurant_records(resource);
`)
const menuSeeds=[
 ['Paneer Tikka','Tandoor-charred paneer, hung curd, ajwain and mint chutney.','Starters',320,'Vegetarian',4.9,'12 min','photo-1567188040759-fb8a883dc6d8'],
 ['Butter Chicken','Slow-cooked tomato makhani gravy, cream and a touch of kasuri methi.','Mains',480,'Chef favorite',4.9,'20 min','photo-1603894584373-5ac82b2ae398'],
 ['Hyderabadi Dum Biryani','Fragrant basmati, saffron, caramelized onions and dum-cooked spices.','Mains',420,'Popular',4.8,'18 min','photo-1563379091339-03246963d96c'],
 ['Masala Dosa','Golden crisp dosa with spiced potato, coconut chutney and sambar.','Breakfast',260,'Vegetarian',4.7,'14 min','photo-1668236543090-82eba5ee5976'],
 ['Dal Makhani','Black lentils simmered overnight with butter, tomato and gentle spices.','Mains',340,'Vegetarian',4.8,'16 min','photo-1546833999-b9f581a1996d'],
 ['Gulab Jamun','Warm khoya dumplings in cardamom and saffron syrup.','Desserts',180,'Vegetarian',4.9,'5 min','photo-1666190092159-7e9cc8c5ee87'],
 ['Chole Bhature','Punjabi chickpea masala with fluffy, freshly fried bhature.','Mains',290,'Vegetarian',4.7,'15 min','photo-1626132647523-66f5bf380027'],
 ['Mango Lassi','Alphonso mango, chilled yogurt and a little cardamom.','Drinks',160,'Signature',4.8,'4 min','photo-1570197788417-0e82375c9371']
]
const insertMenu=db.prepare('INSERT OR IGNORE INTO menu_items (id,name,description,category,price,tag,rating,prep_time,image) VALUES (?,?,?,?,?,?,?,?,?)')
menuSeeds.forEach((row,index)=>insertMenu.run(index+1,...row))
const insertTable=db.prepare('INSERT OR IGNORE INTO restaurant_tables (table_number,seats,status,server) VALUES (?,?,?,?)')
for(let n=1;n<=12;n++)insertTable.run(n,n%3===1?4:2,['Occupied','Available','Reserved','Cleaning'][n%4],['Priya','Arjun','Riya'][n%3])
const recordSeeds={
 staff:[{name:'Priya Shah',role:'Floor manager',employment:'Full time',status:'On shift'},{name:'Arjun Rao',role:'Head chef',employment:'Full time',status:'On shift'},{name:'Meera Iyer',role:'Server',employment:'Part time',status:'On shift'}],
 inventory:[{name:'Fresh tomatoes',category:'Produce',stock:'14 kg',status:'Low stock'},{name:'Basmati rice',category:'Dry goods',stock:'32 kg',status:'In stock'},{name:'Paneer',category:'Dairy',stock:'8 kg',status:'Low stock'},{name:'Fresh cream',category:'Dairy',stock:'16 L',status:'In stock'}],
 reviews:[{name:'Aarav S.',review:'Amazing seasonal menu and warm service.',rating:5,date:'Today'},{name:'Diya M.',review:'The paneer tikka was perfect.',rating:5,date:'Yesterday'}],
 loyalty:[{name:'Welcome reward',points:100,description:'Points awarded on the first order.'}],
 settings:[{name:'Online ordering',value:'Enabled'},{name:'Restaurant profile',value:'Complete'}]
}
const insertRecord=db.prepare('INSERT INTO restaurant_records (resource,data_json) VALUES (?,?)')
for(const [resource,records] of Object.entries(recordSeeds))if(!db.prepare('SELECT 1 FROM restaurant_records WHERE resource=? LIMIT 1').get(resource))for(const data of records)insertRecord.run(resource,JSON.stringify(data))
