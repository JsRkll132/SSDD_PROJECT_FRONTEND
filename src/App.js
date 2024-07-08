import { BrowserRouter,Routes,Route } from "react-router-dom";
import EditProducts from './components/Products/EditProducts';
import Login from "./components/Login";
import AdminPanel from "./components/AdminPanel";
import ClientProducts from "./components/Products/ClientProducts";
function App() {
  return (
   <BrowserRouter>
      <Routes>
        <Route path = '/admin' element = {<AdminPanel></AdminPanel>}>

        </Route >            
        <Route path = '/admin/productos' element = {<EditProducts></EditProducts>}>
        </Route > 
        <Route path = '/login' element = {<Login></Login>}>
        </Route > 
        <Route path = '/productos' element = {<ClientProducts></ClientProducts>}>
          </Route > 
      </Routes>
   </BrowserRouter>
  )
}

export default App;
