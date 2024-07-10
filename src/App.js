import { BrowserRouter,Routes,Route,Navigate } from "react-router-dom";
import EditProducts from './components/Products/EditProducts';
import Login from "./components/Login";
import AdminPanel from "./components/AdminPanel";
import ClientProducts from "./components/Products/ClientProducts";
import ClientCarProducts from "./components/Products/ClientCarProducts";
function App() {
  return (
   <BrowserRouter>
      <Routes>
        <Route path = '/' element = {<Navigate to="/login"/>}>
        </Route > 
        <Route path = '/admin' element = {<AdminPanel></AdminPanel>}>

        </Route >            
        <Route path = '/admin/productos' element = {<EditProducts></EditProducts>}>
        </Route > 
        <Route path = '/login' element = {<Login></Login>}>
        </Route > 
        <Route path = '/productos' element = {<ClientProducts></ClientProducts>}>
          </Route > 
        <Route path = '/productos/addCar' element = {<ClientCarProducts></ClientCarProducts>}>
        </Route >
      </Routes>
   </BrowserRouter>
  )
}

export default App;
