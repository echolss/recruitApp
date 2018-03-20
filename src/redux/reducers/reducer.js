import { combineReducers } from 'redux';
import { user } from './user';
import { chatUser } from './chat';
import { msgUser } from './msg';
import { willBuyList } from './willBuyList';


export default combineReducers({user,chatUser,msgUser,willBuyList})

/*
JSX:            <h1 style="color: red" className="demo">hello,world</h1>
实际上执行的是：
React.createElement(
  "h1",               //type
  { style: "color: red", className: "demo" },   //config 属性
  "hello,world"            //children
);
 */