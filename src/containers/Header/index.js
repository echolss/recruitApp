import React from 'react';
import { NavBar } from 'antd-mobile';
import axios from 'axios';
import {
    Link
} from 'react-router-dom'
import { connect } from 'react-redux';
import { dataAction } from '../../redux/actions/user';

@connect(mapStateToProps)
class Header extends React.Component {
    componentDidMount() {
        axios.get('/user/info')
        .then(res => {
            if(res.status===200) {
                if(res.data.code===0) {
                    this.props.dispatch(dataAction(res.data.data));
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
                        <Link to="/me">
                            <span>嗨， </span>
                            <img src={require(`../../components/img/${avatar}.png`)} alt=""/>
                            <span>{user}</span>
                        </Link>
                    ) 
                    : (<Link to="/me">登录 | 注册</Link>)
                }
            </span>
        );
        return (
            <div id="logNav">
                <NavBar
                    leftContent={<a href="http://localhost:3000/"><img src={require('../../components/Logo/logo-Md.jpg')} alt="" className="Nav-logo-img"/></a>}
                    mode="dark"
                    rightContent={isShowUser}
                    >
                    佛山优鲜达欢迎您！
                </NavBar>
            </div>
        )
    }
}

export default Header

function mapStateToProps(state) {
    return {
        user: state.user
    }
}