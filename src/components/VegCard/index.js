import React from 'react';
import { withRouter } from 'react-router-dom';

@withRouter
class VegCard extends React.Component {
    state = {
        data: ['1', '2', '3'],
        imgHeight: 176,
        slideIndex: 0,
    }
    handleClick(vegId) {
        this.props.history.push(`/vegdetail/${vegId}`);
    }
    render(){
        const { title, price, imgUrl } = this.props.vegItem;
        const vegId = this.props.vegItem.goodsId;
		return (
            <div className="vegItem" onClick={() => {this.handleClick(vegId)}}>
                <img src={imgUrl} alt={title} className="vegImg"/>
                <p className="veg-name">{title}</p>
                <p className="veg-price">￥ {price}</p>
            </div>
        );
	}
}

export default VegCard