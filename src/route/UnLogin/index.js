import React from 'react';
import {  
    Route,
    Switch,
    BrowserRouter as Router,
} from 'react-router-dom';
import VegDetail from '../../containers/VegDetail';

class NeedLogin extends React.Component {
    render() {
        return (
            <Router>
                <Switch>
                   <Route path="/vegdetail/:vegId" component={VegDetail} />
                   <Route component={VegDetail} />
                </Switch>
            </Router>
        );
    }
}

export default NeedLogin