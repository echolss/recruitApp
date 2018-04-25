import React from 'react';
import Logo from '../../components/Logo';
import { List, InputItem, WingBlank, WhiteSpace, Button, Toast } from 'antd-mobile';
import { initAction } from '../../redux/actions/user';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import HOCform from '../../components/HOCform';
import axios from 'axios';
import { authSuccess, errorMsg } from '../../redux/actions/user';

@connect(mapStateToProps)
@HOCform
class Login extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
          isAuth: false,
          hasAuthed: false
        }
    }
    componentDidMount() {
        this.props.dispatch(initAction);
    }
    handleClick = () => {
        const { user, pwd } = this.props.state;
        if(!user || !pwd) {
            Toast.info('用户和密码必须输入', 2, null, false);
        }
        else {
            axios.post('/user/login',{user,pwd})
            .then(res => {
                if(res.status===200 && res.data.code===0) {
                     this.props.dispatch(authSuccess(res.data.data));  //返回数据中有type
                     this.setState({
                        isAuth: true,
                        hasAuthed: true
                    })
                }
                else {
                    this.props.dispatch(errorMsg(res.data.msg));
                    this.setState({
                        isAuth: false,
                        hasAuthed: true
                    });
                }
            })
        }
    }
    handleRegister = () => {
        this.props.history.push('/register')
    }
    render() {
        const { msg } =this.props;
        const pathname = this.props.location.state ? this.props.location.state.from.pathname : '/';
        if(this.state.hasAuthed && this.state.isAuth){
            return (<Redirect to={pathname}/>);
        }
        return (
            <div id="loginBox">
                <Logo/>
                <WingBlank>
                    <List>
                        <WingBlank>{msg && <p className="err-tip">{msg}</p>}</WingBlank>
                        <InputItem onChange={v => this.props.handleChange('user',v)}>用户</InputItem>
                        <WhiteSpace/>
                        <InputItem onChange={v => this.props.handleChange('pwd',v)}>密码</InputItem>
                    </List>
                    <WhiteSpace/>
                    <Button onClick={this.handleClick}>登录</Button>
                    <WhiteSpace/>
                    <Button onClick={this.handleRegister}>注册</Button>
                </WingBlank>
                <WhiteSpace/>
            </div>
        );
    }
}

export default Login

function mapStateToProps(state) {
    return {
        user: state.user,
        msg: state.user.msg,
        redirectTo: state.user.redirectTo
    }
}