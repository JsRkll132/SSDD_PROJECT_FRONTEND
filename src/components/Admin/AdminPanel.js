import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { NavLink,Outlet } from 'react-router-dom';
import useSignOut from 'react-auth-kit/hooks/useSignOut';

const AdminPanel = () =>{
    const signOut = useSignOut()
    return (
        <div>
        
        <h1 style={{padding:"30px"}}>Panel Administrativo</h1>
        <nav style={{padding:"30px"}}>
          <ul  > 
            <li style={{padding:"5px"}}>
              <Link to="productos">Producto</Link>
            </li>
      
            <li style={{padding:"5px"}}>
              <Link to="settings">Settings</Link>
            </li>
            <li style={{padding:"5px"}}>
              <NavLink onClick={() => {signOut()}} to={"/login"}>Salir</NavLink>
            </li>
          </ul>
        </nav>
        <Outlet></Outlet>
      </div>
        
    )
}

export default AdminPanel;