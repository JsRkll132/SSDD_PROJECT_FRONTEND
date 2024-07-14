import React, { useEffect, useState } from 'react';
import { Link,NavLink,Outlet  } from 'react-router-dom';


const AdmClientsSales = () =>{
    return (
        <div>
        <h2 style={{padding:"30px",textAlign:"center"}}>Ventas - Cliente</h2>
        <div className='row justify-content-center mt-3'>
        <div className='col-12 col-lg-8'>
            <div className='table-responsive'>
        <table class="table">
              <thead>
                <tr>
                  <th scope="col">#</th>
                  <th scope="col">First</th>
                  <th scope="col">Last</th>
                  <th scope="col">Detalles</th>
                </tr>
              </thead>
              <tbody class="table-group-divider">
                <tr>
                  <th scope="row">1</th>
                  <td>Mark</td>
                  <td>Otto</td>
                  <td>@mdo</td>
                </tr>
                <tr>
                  <th scope="row">2</th>
                  <td>Jacob</td>
                  <td>Thornton</td>
                  <td>@fat</td>
                </tr>
                <tr>
                  <th scope="row">3</th>
                  <td colspan="2">Larry the Bird</td>
                  <td>@twitter</td>
                </tr>
              </tbody>
      </table>
      </div>
      </div>
      </div>
      </div>
        
    )
}

export default AdmClientsSales;