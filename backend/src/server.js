import dotenv from 'dotenv'
import {resolve} from 'node:path'
import {existsSync} from 'node:fs'
dotenv.config({path:resolve(process.cwd(),'.env')})
if(!process.env.JWT_SECRET||process.env.JWT_SECRET.length<32){console.error('JWT_SECRET is required and must be at least 32 characters. Copy .env.example to .env and set a secure value.');process.exit(1)}
const [{default:express},{default:helmet},{default:cors},{default:authRouter},{default:menuRouter},{default:orderRouter},{default:adminRouter}]=await Promise.all([import('express'),import('helmet'),import('cors'),import('./routes/auth.js'),import('./routes/menu.js'),import('./routes/orders.js'),import('./routes/admin.js')])
await import('./db.js')
const app=express()
const frontendDist=resolve(process.cwd(),'../dist')
const allowedOrigins=(process.env.CORS_ORIGINS||'http://localhost:5173,http://127.0.0.1:5173').split(',').map(value=>value.trim()).filter(Boolean)
app.disable('x-powered-by')
app.use(helmet({contentSecurityPolicy:{directives:{'img-src':["'self'",'data:','blob:','https://images.unsplash.com']}}}))
app.use(cors({origin(origin,callback){if(!origin||allowedOrigins.includes(origin))return callback(null,true);return callback(new Error('Origin is not allowed by CORS.'))},credentials:true}))
app.use(express.json({limit:'1mb'}))
app.get('/api/health',(req,res)=>res.json({status:'ok',service:'restanage-api',time:new Date().toISOString()}))
app.use('/api/auth',authRouter)
app.use('/api',menuRouter)
app.use('/api',orderRouter)
app.use('/api/admin',adminRouter)
app.use('/api',(req,res)=>res.status(404).json({message:'API route not found.'}))
if(process.env.SERVE_FRONTEND==='true'&&existsSync(frontendDist)){
 app.use(express.static(frontendDist))
 app.get(/^(?!\/api(?:\/|$)).*/, (req,res)=>res.sendFile(resolve(frontendDist,'index.html')))
}
app.use((req,res)=>res.status(404).json({message:'Page not found.'}))
app.use((error,req,res,next)=>{if(res.headersSent)return next(error);console.error(error);const status=error.status||500;res.status(status).json({message:status>=500?'The server could not complete this request.':error.message})})
const port=Number(process.env.PORT||3000)
app.listen(port,'0.0.0.0',()=>console.log(`RESTANAGE API listening on http://localhost:${port}`))
