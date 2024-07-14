import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { NavLink,Outlet } from 'react-router-dom';

const AdminPanel = () =>{
    return (
        <div>
        
        <h1>Panel Administrativo</h1>
        <nav>
          <ul>
            <li>
              <Link to="productos">Producto</Link>
            </li>
            <li>
              <Link to="ventas">Ventas</Link>
            </li>
            <li>
              <Link to="settings">Settings</Link>
            </li>
            
          </ul>
        </nav>
        <Outlet></Outlet>
      </div>
        
    )
}

export default AdminPanel;