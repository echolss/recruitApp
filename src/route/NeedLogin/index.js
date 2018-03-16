import React from 'react';
import {  
    Route,
    Switch,
    BrowserRouter as Router,
} from 'react-router-dom';
import Login  from '../../containers/Login';
import Register from '../../containers/Register';
import AuthRoute from '../../components/AuthRoute';
import BossInfo from '../../containers/BossInfo';
import WorkerInfo from '../../containers/WorkerInfo';
import Dashboard from '../../containers/Dashboard';
import Chat from '../../containers/Chat';
import VegDetail from '../../containers/VegDetail';

class NeedLogin extends React.Component {
    render() {
        return (
            <Router>
            <div>
                <AuthRoute/>
                <Switch>
                    <Route path="/bossinfo" component={BossInfo}/>
                    <Route path="/workerinfo" component={WorkerInfo}/>
                    <Route path="/login" component={Login} />
                    <Route path="/register" component={Register} />
                    <Route path="/chat/:user" component={Chat} />
                    <Route path="/vegdetail/:vegId" component={VegDetail} />
                    <Route component={Dashboard} />
                </Switch>
            </div>
            </Router>
        );
    }
}

export default NeedLogin