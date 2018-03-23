import React from 'react';
import { connect } from 'react-redux';
import axios from 'axios';
import { getOrderGoodsNum, getOrderGoodsCount } from '../../util';

@connect(mapStateToProps)
class OrderDetail extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            orderList: []
        }; 
    }
    componentDidMount() {
        const orderid = this.props.match.params.orderid;
        axios.get('/user/getorderdetailById?orderid='+orderid)
        .then(res=>{
            if(res.status===200 && res.data.code===0) {
                this.setState({
                    orderList: res.data.orderList
                })
            }
        })
    }
    render() {
        const orderList = this.state.orderList;
        return (
            <div id="willbuyPage">
                {
                    orderList.length !== 0 && (
                        <div>
                            <div id="willbuyPage-willbuyListHead">
                                <span className="img-wrap">图片</span>
                                <span className="title-wrap">名称</span>
                                <span className="price-wrap">价格</span>
                                <span className="num-wrap">数量</span>
                                <span className="count-wrap">小计</span>
                            </div>
                            {
                                orderList.map(
                                    v => (
                                        <div id="willbuyPage-willbuyList" key={v.goodsId}>
                                            <span className="img-wrap"><img src={v.imgUrl} alt={v.title}/></span>
                                            <span className="title-wrap">{v.title}</span>
                                            <span className="price-wrap">{v.price}</span>
                                            <span className="num-wrap">{v.num}</span>
                                            <span className="count-wrap">{(v.price*v.num).toFixed(1)}</span>
                                        </div>
                                    )
                                )
                            }
                            <div id="willbuyPage-willbuyListFoot">
                                <div className="button-wrap"></div>
                                <div className="num-wrap">共 {getOrderGoodsNum(orderList)} 份商品</div>
                                <div className="count-wrap">总计 {getOrderGoodsCount(orderList).toFixed(1)} 元</div>
                            </div>
                        </div>
                    )
                }
            </div>
        );
    }
}

export default OrderDetail

function mapStateToProps(state) {
    return {
        orderUser: state.orderUser,
        user: state.user
    }
}