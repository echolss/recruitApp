import { getDifferentSet } from '../../util';

export function willBuyList(state=[],action) {
    switch(action.type) {
        case 'WillBuy_List':
            return action.willBuyList;
        case 'Add_WillBuy' : 
            const willbuyItem = action.willbuyItem;
            return [
                ...state,
                {
                    willbuyId: willbuyItem.willbuyId,
                    userId: willbuyItem.userId,
                    goodsId: willbuyItem.goodsId,
                    categoryId: willbuyItem.categoryId,
                    title: willbuyItem.title,
                    imgUrl: willbuyItem.imgUrl,
                    price: willbuyItem.price,
                    num: willbuyItem.num
                }
            ];
        case 'Reduce_WillBuy': 
            return getDifferentSet(action.chooseIds, state);
        default : return state;
    }
}