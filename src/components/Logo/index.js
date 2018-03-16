import React from 'react';


class Logo extends React.Component {
    render() {
        return (
            <div className="logo-container">
                <img src={require('./logo-Lg.jpg')} alt="" className="logImg"/>
            </div>
        );
    }
}

export default Logo