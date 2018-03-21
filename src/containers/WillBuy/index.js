import React from 'react';
import { connect } from 'react-redux';
import axios from 'axios';
import ResultNull from '../../components/ResultNull';
import ListItem from '../../components/ListItem';
import { Checkbox, Button } from 'antd-mobile';
import { isAllCheck, getAllGoodsNum, getAllGoodsCount } from '../../util';

@connect(mapStateToProps)
class WillBuy extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            nowFoodCount: 1,
            checkedSet: [],
            willBuyList: []
        }
    }
    componentDidMount() {
        axios.get('/user/getwillbuylist')
        .then(res=>{
            if(res.status===200 && res.data.code===0) {
                const willBuyList = res.data.willBuyList;
                let arr = [];
                for(let i =0; i<willBuyList.length; i++) {
                    arr[i] = {
                        ...willBuyList[i],
                        isChecked: false
                    };
                }
                this.setState({
                    willBuyList: arr
                })
            }
        })
    }
    handleAllCheck = () => {
        let arr = this.state.willBuyList;
        const isAllChecked = isAllCheck(arr);
        if(isAllChecked === true) {
            for(let i=0; i<arr.length; i++) {
                arr[i].isChecked = false;
            }
        }
        else {
            for(let i=0; i<arr.length; i++) {
                arr[i].isChecked = true;
            }
        }
        this.setState({
            willBuyList: arr
        });
    }
    handleItemCheck(willbuyId) {
        let arr = this.state.willBuyList;
        for(let i=0; i<arr.length; i++) {
            if(arr[i].willbuyId === willbuyId) {
                if(arr[i].isChecked === true) {
                    arr[i].isChecked = false;
                }
                else {
                    arr[i].isChecked = true;
                }
            }
        }
        this.setState({
            willBuyList: arr
        });
    }
    handleDeleteItem(willbuyId) {
        axios.get('/user/deletewillbuy?willbuyId='+willbuyId)
        .then(res=>{
            if(res.status===200 && res.data.code===0) {
                this.setState({
                    willBuyList: res.data.willBuyList
                })
            }
        })
    }
    handlePay = () => {
        console.log('1111')
    }
    render() {
        const { willBuyList } = this.state;
        const allGoodsNum = willBuyList.length ? getAllGoodsNum(willBuyList) : 0;
        const allGoodsCount = willBuyList.length ? getAllGoodsCount(willBuyList) : 0;
        return (
            <div id="willbuyPage">
                {
                    willBuyList.length === 0 && <ResultNull/>
                }
                {
                    willBuyList.length !== 0 && (
                        <div>
                            <div id="willbuyPage-willbuyListHead">
                                <span className="checkbox-wrap"><Checkbox onChange={this.handleAllCheck}></Checkbox></span>
                                <span className="img-wrap">全选</span>
                                <span className="title-wrap">名称</span>
                                <span className="price-wrap">价格</span>
                                <span className="num-wrap">数量</span>
                                <span className="count-wrap">小计</span>
                                <span className="button-wrap">操作</span>
                            </div>
                            {
                                willBuyList.map(
                                    v => (
                                    <ListItem 
                                    key={v.willbuyId} 
                                    vegItem={v} 
                                    isChecked={v.isChecked} 
                                    handleItemCheck={() => {this.handleItemCheck(v.willbuyId)}}
                                    handleDeleteItem={() => {this.handleDeleteItem(v.willbuyId)}}
                                    />
                                    )
                                )
                            }
                            <div id="willbuyPage-willbuyListFoot">
                                <div className="button-wrap">
                                    <Button disabled={!allGoodsNum} type="primary" onClick={this.handlePay}>下订单</Button>
                                </div>
                                <div className="num-wrap">共 {allGoodsNum} 份商品</div>
                                <div className="count-wrap">总计 {allGoodsCount} 元</div>
                            </div>
                        </div>
                    )
                }
            </div>
        );
    }
}

export default WillBuy

function mapStateToProps(state) {
    return {
        willBuyList: state.willBuyList
    }
}