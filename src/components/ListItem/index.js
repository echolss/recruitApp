import React from 'react';
import { Checkbox, Button } from 'antd-mobile';

class ListItem extends React.Component {
    handleOnchange = () => {
        const willbuyId = this.props.vegItem.willbuyId;
        this.props.handleItemCheck(willbuyId);
    }
    handleClick = () => {
        const willbuyId = this.props.vegItem.willbuyId;
        this.props.handleDeleteItem(willbuyId);
    }
    render(){
        const { imgUrl, price, title, num, isChecked } = this.props.vegItem;
		return (
            <div id="willbuyPage-willbuyList">
                <span className="checkbox-wrap"><Checkbox checked={isChecked} onChange={this.handleOnchange}></Checkbox></span>
                <span className="img-wrap"><img src={imgUrl} alt={title}/></span>
                <span className="title-wrap">{title}</span>
                <span className="price-wrap">{price}</span>
                <span className="num-wrap">{num}</span>
                <span className="count-wrap">{(price*num).toFixed(1)}</span>
                <span className="button-wrap"><Button type="danger" onClick={this.handleClick}>删除</Button></span>
            </div>
        );
	}
}

export default ListItem