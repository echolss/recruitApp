import React from 'react';

class Foot extends React.Component {
    render() {
        return (
            <div className="footer-box">
                <div className="flex-foot-item">
                    <p>购物指南</p>
                    <ul>
                        <li><a href="">购物流程</a></li>
                        <li><a href="">服务协议</a></li>
                    </ul>
                </div>
                <div className="flex-foot-item">
                    <p>支付帮助</p>
                    <ul>
                        <li><a href="">微信支付</a></li>
                        <li><a href="">发票说明</a></li>
                    </ul>
                </div>
                <div className="flex-foot-item">
                    <p>配送说明</p>
                    <ul>
                        <li><a href="">配送时间</a></li>
                        <li><a href="">配送范围</a></li>
                    </ul>
                </div>
            </div>
        );
    }
}

export default Foot