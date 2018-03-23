import React from 'react';
import { connect } from 'react-redux';
import { Button } from 'antd-mobile';
import { getOrderGoodsNum, getOrderGoodsCount, ordersSort, timeTransDate } from '../../util';
import { readOrder, getOrderList } from '../../redux/actions/order';
import { withRouter } from 'react-router-dom';

@withRouter
@connect(mapStateToProps)
class ManagerOrder extends React.Component {
    handleClick(orderid) {
        this.props.dispatch(readOrder(orderid));
        this.props.dispatch(getOrderList());
    }
    handleOderDetail(orderid) {
        this.props.history.push(`/order/${orderid}`);
    }
    render() {
        const { orders, users } = this.props;
        return (
            <div>
                {
                        orders && orders.length !==0 && (<div id="Manager-Order-Page">
                        <div id="Manager-Order-Page-Head">
                            <span className="img-wrap"></span>
                            <span className="name-wrap">姓名</span>
                            <span className="time-wrap">时间</span>
                            <span className="num-wrap">数量</span>
                            <span className="count-wrap">总价</span>
                            <span className="button-wrap"></span>
                            <span className="state-wrap">状态</span>
                        </div>
                        {
                            ordersSort(orders).map(
                                v => (
                                    <div id="Manager-Order-Page-List" key={v.orderid}>
                                        <span className="img-wrap"><img src={require(`../img/${users[v.from].avatar}.png`)} alt=""/></span>
                                        <span className="name-wrap">{users[v.from].name}</span>
                                        <span className="time-wrap">
                                           {timeTransDate(v.create_time).Y}年{timeTransDate(v.create_time).M}月{timeTransDate(v.create_time).D}日-
                                           {timeTransDate(v.create_time).h} : {timeTransDate(v.create_time).m} : {timeTransDate(v.create_time).s}
                                        </span>
                                        <span className="num-wrap">{getOrderGoodsNum(v.orderList)}</span>
                                        <span className="count-wrap">{getOrderGoodsCount(v.orderList).toFixed(1)}</span>
                                        <span className="button-wrap"><Button onClick={()=>{this.handleOderDetail(v.orderid)}}>查看详情</Button></span>
                                        {
                                            v.handle ? (<span className="state-wrap">已发货</span>) : (
                                            <span className="button-wrap">
                                               <Button onClick={() => {this.handleClick(v.orderid,v.from)}}>马上发货</Button>
                                            </span>
                                            )
                                        }
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

export default ManagerOrder

function mapStateToProps(state) {
    return {
        orders: state.orderUser.orders,
        users: state.msgUser.users
    }
}