import React from 'react';
import Foot from '../../components/Foot';
import { connect } from 'react-redux';
import axios from 'axios';
import { sendOrder } from '../../redux/actions/order';

@connect(mapStateToProps)
class VegDetail extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            nowFoodCount: 1,
            vegItem: {},
            showToast: false,
            toastInfo: ''
        }
    }
    componentDidMount() {
        const vegId = this.props.match.params.vegId;
        axios.get('/user/vegdetail?vegId='+vegId)
        .then(res=>{
            if(res.status===200) {
                this.setState({
                    vegItem: res.data
                });
            }
        })
    }
    addClick = () => {
        this.setState({
            nowFoodCount: this.state.nowFoodCount+1
        })
    }
    reduceClick = () => {
        if(this.state.nowFoodCount > 2 || this.state.nowFoodCount === 2) {
            this.setState({
                nowFoodCount: this.state.nowFoodCount-1
            })
        }
    }
    putIntoMenu = () => {
        const userId = this.props.user._id;
        const { goodsId, categoryId, title, imgUrl, price } = this.state.vegItem;
        const num = this.state.nowFoodCount;
        const willbuyItem = {
            userId: userId,
            goodsId: goodsId,
            categoryId: categoryId,
            title: title,
            imgUrl: imgUrl,
            price: price,
            num: num
        }
        axios.post('/user/addwillbuy',willbuyItem)
        .then(res => {
            if(res.status===200 && res.data.code===0) {
                this.setState({
                    showToast: true,
                    toastInfo: '成功添加到购物车 !!!'
                });
                setTimeout(() => {
                    this.setState({
                        showToast: false
                    });
                }, 1000);
            }
        })
    }
    handlePay = () => {
        const from = this.props.user._id;
        const to = '5ab324e8b3eaf33bacf534f6';
        const vegItem = this.state.vegItem;
        const orderList = [
            {
              goodsId: vegItem.goodsId,
              categoryId: vegItem.categoryId,
              title: vegItem.title,
              imgUrl: vegItem.imgUrl,
              price: vegItem.price,
              num: this.state.nowFoodCount
            }
        ];
        this.props.dispatch(sendOrder({from,to,orderList}));
        this.setState({
            showToast: true,
            toastInfo: '下单成功 !!!'
        });
        setTimeout(() => {
            this.setState({
                showToast: false
            });
        }, 1000);
    }
    render() {
        const Toast = () => (
            <div className="toast">
                <div className="toast-mask"></div>
                <div className="toast-wrap">
                    <p><img src={require('./img/success.png')} alt="" /></p>
                    <p>{toastInfo}</p>
                </div>
            </div>
        );
        const { showToast, toastInfo } = this.state;
        const { user } = this.props.user;
        const leftBuyButton = user ? (<button className="buy-action buy-action-left" onClick={this.handlePay}>立即下单</button>)
            : (<a href="http://localhost:3000/needlogin"><button className="buy-action buy-action-left">立即下单</button></a>);
        const rightBuyButton = user ? (<button className="buy-action buy-action-right" onClick={this.putIntoMenu}>加入菜单</button>)
            : (<a href="http://localhost:3000/needlogin"><button className="buy-action buy-action-right">加入菜单</button></a>)
        const { title, price, imgUrl, bigImgList, monthSell, reviews, sendCost } = this.state.vegItem;
        const nowFoodCount = this.state.nowFoodCount;
        return (
            <div id="VegDetail">
                <div className="vegDetail-wrap">
                    <div className="vegdetail-content">
                        <img src={imgUrl} alt="" className="veg-right-img"/>
                        <div className="veg-right-detail">
                            <h4 className="veg-tilte">{title}</h4>
                            <p className="veg-price"><span className="our-store">本店价 </span>￥  {price}</p>
                            <p className="veg-monthSell">月销量：{monthSell} 份</p>
                            <p className="veg-reviews">累计评价：{reviews} 条</p>
                            <p>{sendCost}</p>
                            <p>
                                <span>数量：</span>
                                <button className="buy-count buy-count-left" onClick={this.reduceClick}>-</button>
                                <button className="buy-count buy-count-center">{nowFoodCount}</button>
                                <button className="buy-count buy-count-right" onClick={this.addClick}>+</button>
                            </p>
                            <p>
                                {leftBuyButton}
                                {rightBuyButton}
                            </p>
                        </div>
                    </div>
                    {
                        bigImgList && bigImgList.map(
                            v => (
                                <img src={v} alt="" className="veg-detail-big-img" key={v}/>
                            )
                        )
                    }
                </div>
                <Foot/>
                {
                    showToast && <Toast />
                }
            </div>
        );
    }
}


export default VegDetail

function mapStateToProps(state) {
    return {
        user: state.user
    }
}