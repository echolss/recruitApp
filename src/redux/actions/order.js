import axios from 'axios';
import io from 'socket.io-client';

const socket = io('ws://localhost:9093');

//获取订单列表
export function getOrderList() {
    return (dispatch,getState) => {   //getState 可以获取应用里面所有的状态
        axios.get('/user/getorderlist')
        .then(res=>{
            if(res.status===200 && res.data.code===0) {
                const userid = getState().user._id;
                dispatch(orderList(res.data.orders,userid));
            }
        })
    }  
}

//订单列表
function orderList(orders,userid) {
    return {
        type: 'Order_List',
        payload: {orders,userid}
    }
}

//发送订单
export function sendOrder({from, to, orderList}) {
    return dispatch => {
        socket.emit('sendOrder',{from, to, orderList});
    }
}
export function receiveOrder(to) {
    return (dispatch,getState) => {
        socket.on('receiveOrder',function(data){
            const myid = getState().user._id;
            dispatch(getOrder(data,myid));
        });
    }
}
export function disReceiveOrder() {
    return dispatch => {
        socket.on('receiveOrder',() => {});
    }
}
//读取订单
function getOrder(order,myid) {
    return {
        type: 'Get_Order',
        payload: order,
        myid,
    }
}
//标识订单已发货
function orderIsRead({from,to,num}) {
    return {
        type: 'Order_isRead',
        payload: {from,to,num}
    }
}
export function readOrder(orderid,from) {
    return async (dispatch, getState) => {
        const res = await axios.post('/user/readorder',{orderid})
        const to = getState().user._id;
        if (res.status===200 && res.data.code===0) {
            const num = 1;
            dispatch(orderIsRead({from,to,num}))
        }
    }
}