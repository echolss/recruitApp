import React from 'react';

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
                'http://www.6ctb.com/images/upload/image/20161226/20161226164037_61126.jpg',
                'http://www.6ctb.com/themes/hd/images/liucheng.jpg'
            ],
            monthSell: '20000',
            reviews: '200'
        }
    }
    componentDidMount() {
        console.log(123)
    }
    render() {
        const { title, price, imgUrl, bigImgList, monthSell, reviews } = this.state;
        return (
            <div id="VegDetail">
                <div className="vegDetail-wrap">
                    <div class="vegdetail-content">
                        <img src={imgUrl} alt="" className="veg-right-img"/>
                        <div className="veg-right-detail">
                            <h4 className="veg-tilte">{title}</h4>
                            <p className="veg-price">本店价  {price}</p>
                            <p>月销量：{monthSell} 份</p>
                            <p>累计评价：{reviews} 条</p>
                        </div>
                    </div>
                    {
                        bigImgList.map(
                            v => (
                                <img src={v} alt="" class="veg-detail-big-img"/>
                            )
                        )
                    }
                </div>
            </div>
        );
    }
}

export default VegDetail