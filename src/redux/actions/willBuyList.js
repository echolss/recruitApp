import axios from 'axios';

export function getWillBuyList() {
    return dispatch => {   //getState 可以获取应用里面所有的状态
        axios.get('/user/getwillbuylist')
        .then(res=>{
            if(res.status===200 && res.data.code===0) {
                dispatch(willBuyList(res.data.willBuyList));
            }
        })
    }
}

function willBuyList(willBuyList) {
    return {
        type: 'WillBuy_List',
        willBuyList
    }
}