import React from 'react';
import axios from 'axios';
import VegCard from '../VegCard';

class CateDetail extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            nowFoodCount: 1,
            cateItem: []
        }
    }
    componentDidMount() {
        const cateId = this.props.match.params.cateId;
        axios.get('/user/catedetail?cateId='+cateId)
        .then(res=>{
            if(res.status===200) {
                console.log('res.data',res.data)
                this.setState({
                    cateItem: res.data
                });
            }
        })
    }
    render() {
        const { cateItem } = this.state;
        return (
            <div className="veglist">
                {
                    cateItem.length && cateItem.map(
                        v => (
                            <VegCard vegItem={v} key={v.goodsId}/>
                        )
                    )
                }
            </div>
        );
    }
}

export default CateDetail