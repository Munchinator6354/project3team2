import React from 'react';
import {
    BrowserRouter as Router,
    Route,
    Switch,
  } from 'react-router-dom'
import Main from '../Main'
import CreateItem from '../../pages/createNewItem';
// import SearchPlayers from '../SearchPlayers';
import CreateAdminItem from '../../pages/createAdminItem';
// import CreateUser from '../../pages/createUser';
import Give from '../Give';
// import Trade from '../Trade';
import NoMatch from '../../pages/noMatch';
import Register from '../../pages/register';
import Login from '../../pages/login';
import Inventory from '../Inventory';
import ProtectedRoute from '../ProtectedRoute';
import StaffProtectedRoute from '../StaffProtectedRoute';
import AdminProtectedRoute from '../AdminProtectedRoute';
import TestComponent from '../TestComponent';
import Navbar from '../Navbar';
import Welcome from '../Welcome';
import LogOut from '../LogOut';

export default function RouteHandler(props) {
    return (
        <div>
            <Router>
                <div>
                    <Navbar/>
                    <Switch>
                        <Route exact path="/" component={Main} />
                        <Route exact path="/login" component={Login}/>
                        <Route exact path='/test' component={TestComponent}/>
                        {/* <ProtectedRoute exact path="/SearchPlayers" component={SearchPlayers} /> */}
                        <StaffProtectedRoute exact path="/Create" component={CreateItem}/>
                        <AdminProtectedRoute exact path="/CreateAdmin" component={CreateAdminItem} />
                        {/* <AdminProtectedRoute exact path="/CreateUser" component={CreateUser} /> */}
                        <ProtectedRoute exact path="/Give" component={Give} />
                        {/* <ProtectedRoute exact path="/Trade" component={Trade} /> */}
                        <ProtectedRoute exact path="/Inventory" component={Inventory} />
                        <ProtectedRoute exact path="/Welcome" component={Welcome}/>
                        <Route exact path="/Logout" component={LogOut}/>
                        <Route exact path="/Register" component={Register} />
                        <Route component={NoMatch} />
                    </Switch>
                </div>
            </Router>
        </div>
    )
}
