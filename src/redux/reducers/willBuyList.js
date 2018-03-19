import { getDifferentSet } from '../../util';

export function willBuyList(state=[],action) {
    switch(action.type) {
        case 'WillBuy_List':
            return action.willBuyList;
        case 'Add_WillBuy' : 
            return [
                ...state,
                {
                goodsId: action.goodsId,
                title: action.title,
                completed: false,
                willBuyId: action.willBuyId,
                userId: action.userId
                }
            ];
        case 'Reduce_WillBuy': 
            return getDifferentSet(action.chooseIds, state);
        default : return state;
    }
}