import './App.css';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Login from './components/Login';
import Main from './components/Main';
import Clients from './components/Clients';
import NewInvoice from './components/NewInvoice';
import NewClient from './components/NewClient';
import NewCar from './components/NewCar';
import OneClient from './components/OneClient';
import EditClient from './components/EditClient';
import Invoice from './components/Invoice';

function App() {  

  return (
    <BrowserRouter>
      <Routes>
          <Route index element={<Login />} />
          <Route path="/principal" element={<Main />} />
          <Route path="/nueva_factura/:userID" element={<NewInvoice />} />
          <Route path='/clientes' element={<Clients />} />
          <Route path='/nuevo_cliente' element={<NewClient />} />
          <Route path='/nuevo_coche/:userID' element={<NewCar />} />
          <Route path='/cliente/:userID' element={<OneClient />} />
          <Route path='/editar-cliente/:userID' element={<EditClient />} />
          <Route path='/ver-factura/:invoiceID' element={<Invoice />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App;
