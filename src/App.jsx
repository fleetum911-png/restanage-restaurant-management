import {lazy,Suspense} from 'react'
import {Routes,Route,Navigate,useLocation} from 'react-router-dom'
import {Toaster} from 'sonner'
import AppLayout from './components/layout/AppLayout.jsx'
import CartDrawer from './components/common/CartDrawer.jsx'
const Dashboard=lazy(()=>import('./pages/admin/Dashboard.jsx'))
const MenuPage=lazy(()=>import('./pages/customer/MenuPage.jsx'))
const KitchenPage=lazy(()=>import('./pages/operations/OperationsPages.jsx').then(module=>({default:module.KitchenPage})))
const WaiterPage=lazy(()=>import('./pages/operations/OperationsPages.jsx').then(module=>({default:module.WaiterPage})))
const GenericPage=lazy(()=>import('./pages/operations/OperationsPages.jsx').then(module=>({default:module.GenericPage})))
const AuthPage=lazy(()=>import('./pages/auth/AuthPage.jsx'))
const RegisterPage=lazy(()=>import('./pages/auth/RegisterPage.jsx'))
function RoutedWorkspace(){const loc=useLocation();const path=loc.pathname;let page;if(path==='/admin'||path==='/admin/')page=<Dashboard/>;else if(path==='/customer'||path==='/customer/')page=<MenuPage/>;else if(path==='/kitchen'||path==='/kitchen/')page=<KitchenPage/>;else if(path==='/waiter'||path==='/waiter/')page=<WaiterPage/>;else page=<GenericPage key={path} path={path}/>;return <AppLayout><Suspense fallback={<div className="page-loading" role="status">Opening your workspace…</div>}>{page}<CartDrawer/></Suspense></AppLayout>}
export default function App(){return <><Suspense fallback={<div className="page-loading" role="status">Getting things ready…</div>}><Routes><Route path="/login" element={<AuthPage/>}/><Route path="/register" element={<RegisterPage/>}/><Route path="/" element={<Navigate to="/login" replace/>}/><Route path="*" element={<RoutedWorkspace/>}/></Routes></Suspense><Toaster position="top-right" richColors closeButton/></>}
