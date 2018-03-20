import React from 'react';
import Foot from '../../components/Foot';
import { connect } from 'react-redux';
import axios from 'axios';

@connect(mapStateToProps)
class VegDetail extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            nowFoodCount: 1,
            vegItem: {}
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
    buyImmediately = () => {

    }
    putIntoMenu = () => {
    }
    render() {
        console.log('this.props.match.params.vegId',this.props.match.params.vegId)
        const { user } = this.props.user;
        const leftBuyButton = user ? (<button className="buy-action buy-action-left" onClick={this.buyImmediately}>立即下单</button>)
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