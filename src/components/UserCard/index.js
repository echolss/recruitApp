import React from 'react';
import { Card, WhiteSpace, WingBlank } from 'antd-mobile';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';

@withRouter
class UserCard extends React.Component {
    handleClick(v) {
        this.props.history.push(`/chat/${v._id}`);
    }
    render() {
        return (
            <WingBlank>
            <WhiteSpace/>
                {
                    this.props.userList.map(
                        v => (
                                v.avatar &&
                                <Card key={v._id} onClick={()=>this.handleClick(v)}>
                                    <Card.Header
                                        title={v.user}
                                        thumb={require(`../img/${v.avatar}.png`)}
                                        extra={<span>客服</span>}
                                    />
                                </Card>

                        )
                    )
                }
            </WingBlank>
        );
    }
}

export default UserCard

UserCard.propTypes = {
    userList: PropTypes.array.isRequired
}