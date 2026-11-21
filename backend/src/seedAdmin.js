import dotenv from 'dotenv'
import {resolve} from 'node:path'
import bcrypt from 'bcryptjs'
import {db} from './db.js'
dotenv.config({path:resolve(process.cwd(),'.env')})
const email=process.env.ADMIN_EMAIL
const password=process.env.ADMIN_PASSWORD
const name=process.env.ADMIN_NAME||'RESTANAGE Admin'
if(!email||!password){console.error('Set ADMIN_EMAIL and ADMIN_PASSWORD in backend/.env before seeding the administrator.');process.exitCode=1}else if(password.length<12){console.error('ADMIN_PASSWORD must have at least 12 characters.');process.exitCode=1}else{const existing=db.prepare('SELECT id FROM users WHERE email=?').get(email);if(existing){console.log(`Admin account ${email} already exists.`)}else{const hash=await bcrypt.hash(password,12);db.prepare("INSERT INTO users (name,email,password_hash,role) VALUES (?,?,?,'admin')").run(name,email.toLowerCase(),hash);console.log(`Administrator ${email} created. Keep this password private.`)}}db.close()
