import { BrowserRouter,Routes,Route } from "react-router-dom";
import EditProducts from './components/Products/EditProducts';
import Login from "./components/Login";
function App() {
  return (
   <BrowserRouter>
      <Routes>
        <Route path = '/productos' element = {<EditProducts></EditProducts>}>
        </Route >  
        <Route path = '/login' element = {<Login></Login>}>
        </Route > 
      </Routes>
   </BrowserRouter>
  )
}

export default App;
