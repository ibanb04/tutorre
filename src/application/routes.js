import { BrowserRouter, Route, Switch } from 'react-router-dom';
import Home from '../pages/home/index';
import Login from '../pages/login/index';
import users from '../pages/users';
import torres from '../pages/torres';   
export default () => (
    <BrowserRouter>
        <Switch>    
            { /*Si no usamos el atributo exact bastaría con que el principio de la url coincidiese con alguno de los valores del atributo path para que el componente fuese renderizado. Por tanto, si no usásemos el atributo exact y en la url tuviesemos /contacto, se renderizarían los componentes Home y Contacto simultaneamente */}    
            <Route exact path="/" component={Home} />
            <Route path="/Login/" component={Login} />
            <Route path="/users/" component={users} />
            <Route path="/torres/" component={torres} />
            
             { /* Es muy recomendable añadir esta ruta para obtener un mensaje de error en el caso de que la 
            ruta no exista. De lo contrario, si la ruta no existe llegaremos a una página en blanco */}    
            <Route path="*" component={() => <div>404</div> } />
        </Switch>
    </BrowserRouter>
);