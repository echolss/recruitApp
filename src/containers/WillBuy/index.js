import React from 'react';
import { connect } from 'react-redux';
import axios from 'axios';
import { getWillBuyList } from '../../redux/actions/willBuyList';
import ResultNull from '../../components/ResultNull';

@connect(mapStateToProps)
class WillBuy extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            nowFoodCount: 1,
            vegItem: {}
        }
    }
    componentDidMount() {
        this.props.dispatch(getWillBuyList());
    }
    render() {
        console.log('this.props.willBuyList',this.props.willBuyList.length);
        const { willBuyList } = this.props;
        return (
            <div>
                {
                    willBuyList.length === 0 && <ResultNull/>
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