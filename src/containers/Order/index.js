import React from 'react';
import { connect } from 'react-redux';
// import axios from 'axios';

@connect(mapStateToProps)
class Order extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            nowFoodCount: 1,
            vegItem: {}
        }
    }
    componentDidMount() {
    }
    render() {
        return (
            <div>
                Order
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