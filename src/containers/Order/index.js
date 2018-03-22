import React from 'react';
import { connect } from 'react-redux';
// import axios from 'axios';
import { getOrderList, receiveOrder } from '../../redux/actions/order';
import ManagerOrder from '../../components/ManagerOrder';
import CommonOrder from '../../components/CommonOrder';

@connect(mapStateToProps)
class Order extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
           orders: []
        }
    }
    componentDidMount() {
        this.props.dispatch(getOrderList());
        this.props.dispatch(receiveOrder());
    }
    render() {
        const type = this.props.user.type;
        return (
            <div>
                {
                   type==="manager" ? <ManagerOrder/> : <CommonOrder/>
                }
            </div>
        );
    }
}

export default Order

function mapStateToProps(state) {
    return {
        user: state.user
    }
}