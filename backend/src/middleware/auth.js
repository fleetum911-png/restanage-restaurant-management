import jwt from 'jsonwebtoken'
export function requireAuth(req,res,next){const header=req.get('authorization')||'';const token=header.startsWith('Bearer ')?header.slice(7):null;if(!token)return res.status(401).json({message:'Sign in to continue.'});try{req.user=jwt.verify(token,process.env.JWT_SECRET);next()}catch{return res.status(401).json({message:'Your session has expired. Sign in again.'})}}
export function requireRole(...roles){return (req,res,next)=>{if(!req.user||!roles.includes(req.user.role))return res.status(403).json({message:'You do not have access to this area.'});next()}}
