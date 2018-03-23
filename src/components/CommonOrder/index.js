import React from 'react';
import { connect } from 'react-redux';
import { Button } from 'antd-mobile';
import { getOrderGoodsNum, getOrderGoodsCount, timeTransDate, ordersSort } from '../../util';
import { withRouter } from 'react-router-dom';
import { receiveHandleOrder, sendStopOrder, getOrderList } from '../../redux/actions/order';

@withRouter
@connect(mapStateToProps)
class CommonOrder extends React.Component {
    componentDidMount() {
        this.props.dispatch(receiveHandleOrder());
    }
    handleOderDetail(orderid) {
        this.props.history.push(`/order/${orderid}`);
    }
    handleStopOrder({orderid}) {
        this.props.dispatch(sendStopOrder({orderid}));
        this.props.dispatch(getOrderList());
    }
    render() {
        const { orders } = this.props;
        return (
            <div>
                {
                        orders && orders.length !==0 && (<div id="Manager-Order-Page">
                        <div id="Manager-Order-Page-Head">
                            <span className="time-wrap">时间</span>
                            <span className="num-wrap">数量</span>
                            <span className="count-wrap">总价</span>
                            <span className="button-wrap"></span>
                            <span className="button-wrap"></span>
                            <span className="count-wrap">状态</span>
                        </div>
                        {
                            ordersSort(orders).map(
                                v => (
                                    <div id="Manager-Order-Page-List" key={v.orderid}>
                                        <span className="time-wrap">
                                           {timeTransDate(v.create_time).Y}年{timeTransDate(v.create_time).M}月{timeTransDate(v.create_time).D}日-
                                           {timeTransDate(v.create_time).h} : {timeTransDate(v.create_time).m} : {timeTransDate(v.create_time).s}
                                        </span>
                                        <span className="num-wrap">{getOrderGoodsNum(v.orderList)}</span>
                                        <span className="count-wrap">{getOrderGoodsCount(v.orderList).toFixed(1)}</span>
                                        <span className="button-wrap">
                                           <Button onClick={()=>{this.handleOderDetail(v.orderid)}}>查看详情</Button>
                                        </span>
                                        <span className="button-wrap">
                                            {
                                                v.handle ? <span className="cantStop">无法取消</span> 
                                                : <Button onClick={()=>{this.handleStopOrder({orderid: v.orderid})}}>取消订单</Button>
                                            }
                                        </span>
                                        <span className="count-wrap">
                                           {v.handle ? <span className="sent">已发货</span> : <span className="willsend">未发货</span>}
                                        </span>
                                    </div>
                                )
                            )
                        }
                    </div>)
                }
            </div>
        );
    }
}

export default CommonOrder

function mapStateToProps(state) {
    return {
        orders: state.orderUser.orders,
        users: state.msgUser.users
    }
}