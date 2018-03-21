//专门放工具函数的js

export function getRedirectPath({type,avatar}) {  //根据用户信息，返回跳转地址
    //user.type:    boss/worker
    //user.avatar      bossinfo/workerinfo
    let url = (type==='boss') ? '/boss' : '/worker';
    if(!avatar) {
       url += 'info';
    }
    return url;
}

export function getChatid(userId, targetId) {
    return [userId,targetId].sort().join('_');
}


export function getDifferentSet(chooseIds, state) {
    let arr = [];
    let a =new Set(state);
    let b = new Set(chooseIds);
    let differenceABSet = new Set([...a].filter((x) => !b.has(x.willBuyId)));
    for(var v of differenceABSet) {
        arr.push(v);
    }
    return arr;
}

export function isAllCheck(arr) {
    let trueNum = 0;
    for(let i=0; i<arr.length; i++) {
        if(arr[i].isChecked === true) {
            trueNum = trueNum+1;
        }
    }
    if(trueNum === arr.length) {
        return true;
    }
    return false;
}

export function getAllGoodsNum(willBuyList) {
    let num = 0;
    for(let i=0; i<willBuyList.length; i++) {
        if(willBuyList[i].isChecked === true) {
            num = num + willBuyList[i].num;
        }
    }
    return num;
}

export function getAllGoodsCount(willBuyList) {
    let count = 0;
    for(let i=0; i<willBuyList.length; i++) {
        if(willBuyList[i].isChecked === true) {
            count = count + (willBuyList[i].num)*(willBuyList[i].price);
        }
    }
    return count;
}