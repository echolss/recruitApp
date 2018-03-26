import React from 'react';
import {  
    Route,
    Switch,
    BrowserRouter as Router,
} from 'react-router-dom';
import Login  from '../../containers/Login';
import Register from '../../containers/Register';
import AuthRoute from '../../components/AuthRoute';
import Dashboard from '../../containers/Dashboard';
import Chat from '../../containers/Chat';
import OrderDetail from '../../containers/OrderDetail';

class NeedLogin extends React.Component {
    render() {
        return (
            <Router>
            <div>
                <AuthRoute/>
                <Switch>
                    <Route path="/login" component={Login} />
                    <Route path="/register" component={Register} />
                    <Route path="/chat/:user" component={Chat} />
                    <Route path="/order/:orderid" component={OrderDetail} />
                    <Route component={Dashboard} />
                </Switch>
            </div>
            </Router>
        );
    }
}

export default NeedLogin