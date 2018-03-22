import React from 'react';
import Boss from '../Boss';
import { connect } from 'react-redux';
import Message from '../Message';
import User from '../User';
import TabLinkBar from '../../components/TabLinkBar';
import { Route, Redirect } from 'react-router-dom';
import { getMsgList, receiveMsg } from '../../redux/actions/msg';
import Order from '../Order';
import WillBuy from '../WillBuy';

@connect(mapStateToProps)
class Dashboard extends React.Component {
    constructor(props) {
        super(props);
        this.state = {}; 
    }
    componentDidMount() {
        if(!this.props.chatmsg.length) {
            this.props.dispatch(getMsgList());
            this.props.dispatch(receiveMsg());
        }
    }
    // componentWillUnmount() {
    //     this.props.dispatch(disReceiveMsg());
    // }
    handleClick(elm) {
        this.setState(elm);   
        this.props.selectAvatar(elm.text);
    }
    render() {
        const pathname = this.props.location.pathname;
        const { user } = this.props;
        const navList = [
            {
                path: '/willbuy',
                text: '购物车',
                icon: 'willbuy',
                title: '个人中心',
                component: WillBuy,
                hide: user.type==='manager'
            },
            {
                path: '/order',
                text: '订单',
                icon: 'order',
                title: '个人中心',
                component: Order
            },
            {
                path: '/boss',
                text: '联系客服',
                icon: 'boss',
                title: '牛人列表',
                component: Boss,
                hide: user.type==='manager'
            },
            {
                path: '/message',
                text: '消息',
                icon: 'msg',
                title: '消息列表',
                component: Message
            },
            {
                path: '/me',
                text: '我',
                icon: 'user',
                title: '个人中心',
                component: User
            }
        ]

        const page = navList.find(v=>v.path===pathname);
        return page  ? (
            <div>
                <div className="fixed-body">
                {/* <QueueAnim duration={800} type="scaleX"> */}
                    <Route path={page.path} component={page.component} key={page.path}/>
                {/* </QueueAnim> */}
                </div>
                <TabLinkBar navList={navList} />
            </div>
        ) : (<Redirect to={user.type==='manager' ? "/order" : "/willbuy"}></Redirect>);
    }
}

export default Dashboard

function mapStateToProps(state) {
    return {
        user: state.user,
        msg: state.user.msg,
        redirectTo: state.user.redirectTo,
        unread: state.msgUser.unread,
        chatmsg: state.msgUser.chatmsg,
        unhandle: state.orderUser.unhandle
    }
}