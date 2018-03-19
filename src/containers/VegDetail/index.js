import React from 'react';
import Foot from '../../components/Foot';
import { connect } from 'react-redux';

@connect(mapStateToProps)
class VegDetail extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            title: '香菇 250g',
            price: '￥4.90',
            imgUrl: 'http://www.6ctb.com/images/201612/thumb_img/629_thumb_G_1482309144840.jpg',
            bigImgList: [
                'http://www.6ctb.com/images/upload/image/20161226/20161226164036_73579.jpg',
                'http://www.6ctb.com/images/upload/image/20161226/20161226164036_79823.jpg',
                'http://www.6ctb.com/images/upload/image/20161226/20161226164036_73015.jpg',
                'http://www.6ctb.com/images/upload/image/20161226/20161226164036_60745.jpg',
                'http://www.6ctb.com/images/upload/image/20161226/20161226164037_79396.jpg',
                'http://www.6ctb.com/images/upload/image/20161226/20161226164037_61126.jpg'
            ],
            monthSell: '20000',
            reviews: '200',
            sendCost: '韵达速递	6元   |   顺丰速运	23元  ',
            nowFoodCount: 1
        }
    }
    // componentDidMount() {
    //     console.log(123)
    // }
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
        const { user } = this.props.user;
        const leftBuyButton = user ? (<button className="buy-action buy-action-left" onClick={this.buyImmediately}>立即下单</button>)
            : (<a href="http://localhost:3000/needlogin"><button className="buy-action buy-action-left">立即下单</button></a>);
        const rightBuyButton = user ? (<button className="buy-action buy-action-right" onClick={this.putIntoMenu}>加入菜单</button>)
            : (<a href="http://localhost:3000/needlogin"><button className="buy-action buy-action-right">加入菜单</button></a>)
        const { title, price, imgUrl, bigImgList, monthSell, reviews, sendCost, nowFoodCount } = this.state;
        return (
            <div id="VegDetail">
                <div className="vegDetail-wrap">
                    <div className="vegdetail-content">
                        <img src={imgUrl} alt="" className="veg-right-img"/>
                        <div className="veg-right-detail">
                            <h4 className="veg-tilte">{title}</h4>
                            <p className="veg-price"><span className="our-store">本店价</span>  {price}</p>
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
                        bigImgList.map(
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