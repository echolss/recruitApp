import React from 'react';
import { List, InputItem, WingBlank, WhiteSpace, Button, Toast, TextareaItem } from 'antd-mobile';
import { connect } from 'react-redux';
import { registerAsync } from '../../redux/actions/user';
import { Redirect } from 'react-router-dom';
import HOCform from '../../components/HOCform';
import AvatarSelector from '../../components/AvatarSelector';

@connect(mapStateToProps)
@HOCform
class Register extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            avatar: '',
            type: 'common'
        }
    }
    componentDidMount() {
        this.props.handleChange('type','worker');
    }
    handleClick = () => {
        const { user, pwd, repeatPwd } = this.props.state;
        if(!user || !pwd || !repeatPwd) {
            Toast.info('用户和密码必须输入', 2, null, false);
        }
        else if(pwd!==repeatPwd) {
            Toast.info('重复密码和密码必须相同', 2, null, false);
        }
        else {
            this.props.dispatch(registerAsync(Object.assign(this.props.state, this.state)));
        }
    }
    selectAvatar = (imgName) => {
        this.setState({
            avatar: imgName
        })
    }
    render() {
        const { msg, redirectTo } =this.props;
        console.log('this.state.avatar',this.state.avatar);
        return (
            <div id="registerBox">
                {redirectTo && <Redirect to={redirectTo}/>}
                <WingBlank>
                    <List>
                        <WhiteSpace/>
                        <WingBlank>{msg && <p className="err-tip">{msg}</p>}</WingBlank>
                        <WhiteSpace/>
                        <InputItem onChange={v => this.props.handleChange('user',v)}>用户</InputItem>
                        <WhiteSpace/>
                        <InputItem onChange={v => this.props.handleChange('pwd',v)}>密码</InputItem>
                        <WhiteSpace/>
                        <InputItem onChange={v => this.props.handleChange('repeatPwd',v)}>确认密码</InputItem>
                        <WhiteSpace/>
                        <AvatarSelector selectAvatar={this.selectAvatar}/>
                        <WhiteSpace/>
                        <TextareaItem
                            title="收货地址"
                            rows={3}
                            onChange={v => this.props.handleChange('address',v)}
                            autoHeight
                        />
                        <WhiteSpace/>
                    </List>
                    <WhiteSpace/>
                    <Button onClick={this.handleClick}>注册</Button>
                </WingBlank>
            </div>
        );
    }
}

export default Register

function mapStateToProps(state) {
    return {
        user: state.user,
        msg: state.user.msg,
        redirectTo: state.user.redirectTo
    }
}
