import {Router} from 'express'
import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'
import {z} from 'zod'
import {rateLimit} from 'express-rate-limit'
import {db} from '../db.js'
import {requireAuth} from '../middleware/auth.js'
import {userDto} from '../utils.js'
const router=Router()
const authLimit=rateLimit({windowMs:15*60*1000,limit:30,standardHeaders:'draft-8',legacyHeaders:false,message:{message:'Too many sign-in attempts. Please wait a few minutes.'}})
const loginSchema=z.object({email:z.string().trim().email(),password:z.string().min(1),role:z.enum(['admin','customer','kitchen','waiter']).optional()})
const registerSchema=z.object({name:z.string().trim().min(2).max(100),email:z.string().trim().email().max(254),phone:z.string().trim().min(10).max(30),password:z.string().min(8).max(100).regex(/[A-Za-z]/).regex(/[0-9]/),role:z.literal('customer').optional()})
function issueToken(user){return jwt.sign({sub:String(user.id),role:user.role,email:user.email},process.env.JWT_SECRET,{expiresIn:'7d',issuer:'restanage-api',audience:'restanage-web'})}
router.post('/register',authLimit,async(req,res,next)=>{try{const parsed=registerSchema.safeParse(req.body);if(!parsed.success)return res.status(400).json({message:'Please check the registration details.',errors:parsed.error.flatten().fieldErrors});const {name,email,phone,password}=parsed.data;const exists=db.prepare('SELECT id FROM users WHERE email=?').get(email);if(exists)return res.status(409).json({message:'An account with this email already exists.'});const hash=await bcrypt.hash(password,12);const result=db.prepare('INSERT INTO users (name,email,phone,password_hash,role) VALUES (?,?,?,?,?)').run(name,email.toLowerCase(),phone,hash,'customer');const user=db.prepare('SELECT * FROM users WHERE id=?').get(result.lastInsertRowid);return res.status(201).json({accessToken:issueToken(user),user:userDto(user)})}catch(error){next(error)}})
router.post('/login',authLimit,async(req,res,next)=>{try{const parsed=loginSchema.safeParse(req.body);if(!parsed.success)return res.status(400).json({message:'Enter a valid email and password.'});const {email,password,role}=parsed.data;const user=db.prepare('SELECT * FROM users WHERE email=?').get(email);if(!user||!(await bcrypt.compare(password,user.password_hash)))return res.status(401).json({message:'Email or password is incorrect.'});if(role&&user.role!==role)return res.status(403).json({message:`This account does not have the ${role} role.`});return res.json({accessToken:issueToken(user),user:userDto(user)})}catch(error){next(error)}})
router.get('/me',requireAuth,(req,res)=>{const user=db.prepare('SELECT * FROM users WHERE id=?').get(Number(req.user.sub));if(!user)return res.status(404).json({message:'Account not found.'});res.json({user:userDto(user)})})
export default router
