import { BrowserRouter,Routes,Route } from "react-router-dom";
import Products from './components/Products';
function App() {
  return (
   <BrowserRouter>
      <Routes>
        <Route path = '/productos' element = {<Products></Products>}>
        </Route >  
      </Routes>
   </BrowserRouter>
  )
}

export default App;
