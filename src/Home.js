import React from 'react';
import VegIndex from './containers/VegIndex';
import { NavBar } from 'antd-mobile';
import axios from 'axios';
import {
    BrowserRouter as Router,
    Route,
    Link
} from 'react-router-dom'
import NeedLogin from './route/NeedLogin';
import VegDetail from './containers/VegDetail';
import { connect } from 'react-redux';
import { dataAction } from './redux/actions/user';

@connect(mapStateToProps)
class Home extends React.Component {
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
    componentDidMount() {
        axios.get('/user/info')
        .then(res => {
            if(res.status===200) {
                if(res.data.code===0) {
                    this.props.dispatch(dataAction(res.data.data));
                    this.setState({
                        avatar: res.data.data.avatar,
                        name: res.data.data.user
                    })
                }
            }
        })
    }
    render() {
        const { user, avatar } = this.props.user;
        const isShowUser = (
            <span>
                {
                    user 
                    ? 
                    (
                        <Link to="/needlogin">
                            <span>嗨， </span>
                            <img src={require(`./components/img/${avatar}.png`)} alt=""/>
                            <span>{user}</span>
                        </Link>
                    ) 
                    : (<Link to="/needlogin">登录 | 注册</Link>)
                }
            </span>
        );
        return this.state.hasError ? (<h1>页面出错了！</h1>) : (
            <Router>
                <div>
                    <div id="logNav">
                        <NavBar
                            leftContent={<a href="http://localhost:3000/"><img src={require('./components/Logo/logo-Md.jpg')} alt="" className="Nav-logo-img"/></a>}
                            mode="dark"
                            rightContent={isShowUser}
                            >
                            佛山优鲜达欢迎您！
                        </NavBar>
                    </div>
                    <Route exact path="/" component={VegIndex}/>
                    <Route path="/needlogin" component={NeedLogin}/>
                    <Route path="/vegdetail/:vegId" component={VegDetail} />
                </div>
            </Router>
        )
    }
}

export default Home

function mapStateToProps(state) {
    return {
        user: state.user
    }
}