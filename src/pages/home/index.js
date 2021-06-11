import React from 'react';
import { Link } from 'react-router-dom';

export default ()=> { return <div>home
    <ul>
        <li><Link to="/">Inicio</Link></li>
        <li><Link to="/Login">Login</Link></li>
        <li><Link to="/ajksdfkjhasdk">Error en la url</Link></li>
    </ul>

</div>;
}
