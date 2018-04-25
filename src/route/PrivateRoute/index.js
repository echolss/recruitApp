import React from 'react';
import {
  Redirect,
} from 'react-router-dom';
import { connect } from 'react-redux';
import axios from 'axios';

@connect(mapStateToProps)
export default function PrivateRoute(Comp) {
  return class WrapperComp extends React.Component {
      constructor(props) {
        super(props);
        this.state = {
          isAuth: false,
          hasAuthed: false
        }
      }
      componentDidMount() {
        axios.get('/user/info')
        .then(res => {
            if(res.status===200) {
                if(res.data.code===0) {
                    this.setState({
                      isAuth: true,
                      hasAuthed: true
                    })
                } else {
                  this.setState({
                    isAuth: false,
                    hasAuthed: true
                  })
                }
            }
        })
      }
      render() {
        if(!this.state.hasAuthed){
          return null;
        }
        return (
          this.state.isAuth ? (
              <Comp {...this.props}/>
          ) : (
              <Redirect to={{
              pathname: '/login',
              state: { from: this.props.location }
              }}/>
          )
        );
      }
  }
}

function mapStateToProps(state) {
  return {
      user: state.user
  }
}