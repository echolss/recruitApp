import React from 'react';

class ResultNull extends React.Component {
    
    render() {
        return (
            <div className="result-null-wrap">
                <p><img src={require('./img/null.png')} alt="" /></p>
                <p className="result-null-title">空空如也~~~~</p>
            </div>
        );
    }
}

export default ResultNull