const initState = {
    orders: [],
    unhandle: 0
}

export function orderUser(state=initState,action) {
    switch(action.type) {
        case 'Order_List' : return {
            ...state,
            orders: action.payload.orders,
            unhandle: action.payload.orders.filter(v=>!v.handle && v.to === action.payload.userid).length, 
        };
        case 'Get_Order' :
           const { myid } = action;
           if(action.payload.to === myid || action.payload.from === myid ) {
            const n =  action.payload.to === myid ? 1 : 0;
            return {...state,orders: [...state.orders,action.payload], unhandle: state.unhandle+n};
           }
           return state;
        case 'Order_isRead' : 
           return {...state,orders: state.orders.map(v => {
               if(v.from===action.payload.from && v.to===action.payload.to) {
                v.handle = true;
               }
               return v;
           }),unhandle: state.unhandle-action.payload.num}
        // case 'Is_Read' : return {...state,userlist: action.payload};
        case 'Clear_Redux' :
            return initState;
        default : return state;
    }
}
