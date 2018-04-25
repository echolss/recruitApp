import React from 'react';
import VegIndex from '../../containers/VegIndex';
import {
    BrowserRouter as Router,
    Route,
    Switch
} from 'react-router-dom'
import VegDetail from '../../containers/VegDetail';
import { connect } from 'react-redux';
import CateDetail from '../../components/CateDetail';
import AuthUser from '../../components/AuthUser';
import Login from '../../containers/Login';
import Register from '../../containers/Register';
import Chat from '../../containers/Chat';
import OrderDetail from '../../containers/OrderDetail';
import Dashboard from '../../containers/Dashboard';
import Header from '../../containers/Header';

@connect(mapStateToProps)
class Index extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            hasError: false,
        }
    }
    componentDidCatch(err, info) {
        console.log(err, info);
        this.setState({hasError: true});
    }
    render() {
        return this.state.hasError ? (<h1>页面出错了！</h1>) : (
            <Router>
                <div>
                    <Header/>
                    <Switch>
                        <Route exact path="/" component={VegIndex}/>
                        <Route path="/vegdetail/:vegId" component={VegDetail} />
                        <Route path="/catedetail/:cateId" component={CateDetail} />
                        <Route path="/authuser" component={AuthUser}/>
                        <Route path="/login" component={Login} />
                        <Route path="/register" component={Register} />
                        <Route path="/chat/:user" component={Chat} />
                        <Route path="/order/:orderid" component={OrderDetail} />
                        <Route component={Dashboard} />
                    </Switch>
                </div>
            </Router>
        )
    }
}

export default Index

function mapStateToProps(state) {
    return {
        user: state.user
    }
}