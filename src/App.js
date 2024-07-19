import { BrowserRouter,Routes,Route,Navigate } from "react-router-dom";
import EditProducts from './components/Products/EditProducts';
import Login from "./components/Login";
import AdminPanel from "./components/Admin/AdminPanel";
import ClientProducts from "./components/Products/ClientProducts";
import ClientCarProducts from "./components/Products/ClientCarProducts";
import AdmClientsSales from "./components/Admin/AdmClientsSales";
import ClientPayBuys from "./components/Products/ClientPayBuys";
import ClientOrderInfo from "./components/Products/ClientOrderInfo";
import RequireAuth from "@auth-kit/react-router/RequireAuth";
import AuthOutlet from "@auth-kit/react-router/AuthOutlet";
function App() {
  return (
   <BrowserRouter>
      <Routes>
        <Route path = '/' element = {<Navigate to="/login"/>}>
        </Route > 
       
        <Route path = '/login' element =  {<Login></Login>} > </Route > 
        <Route element={<AuthOutlet fallbackPath='/login' />}>
            <Route path = '/admin' element = {<AdminPanel></AdminPanel>}>
            </Route >            
            <Route path = '/admin/productos' element = {<EditProducts></EditProducts>}>
            </Route > 
            <Route path = '/admin/ventas' element = {<AdmClientsSales></AdmClientsSales>}>
            </Route > 
            <Route path = '/productos' element = {<ClientProducts></ClientProducts>}>
            </Route > 
            <Route path = '/productos/addCar' element = {<ClientCarProducts></ClientCarProducts>}>
            </Route >
            <Route path = '/productos/compras' element = {<ClientPayBuys></ClientPayBuys>}>
              
              </Route > 
              <Route path = '/productos/compras/info/:id_orden' element = {<ClientOrderInfo></ClientOrderInfo>}>
                </Route >
       </Route>

        
      </Routes>
   </BrowserRouter>
  )
}

export default App;
