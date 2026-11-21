import { motion } from 'framer-motion'
export function Button({children,variant='primary',className='',type='button',...props}){return <button type={type} className={`btn btn-${variant} ${className}`} {...props}>{children}</button>}
export function Card({children,className='',...props}){return <section className={`card ${className}`} {...props}>{children}</section>}
export function Badge({children,tone='neutral'}){return <span className={`badge badge-${tone}`}>{children}</span>}
export function PageTitle({eyebrow,title,description,actions}){return <div className="page-title"><div>{eyebrow&&<p className="eyebrow">{eyebrow}</p>}<h1>{title}</h1>{description&&<p className="muted subtitle">{description}</p>}</div>{actions&&<div className="title-actions">{actions}</div>}</div>}
export function Animate({children}){return <motion.div initial={{opacity:0,y:8}} animate={{opacity:1,y:0}} transition={{duration:.25}}>{children}</motion.div>}
