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

export function getOrderGoodsNum(orderList) {
    let num = 0;
    for(let i=0; i<orderList.length; i++) {
        num = num + orderList[i].num;
    }
    return num;
}

export function getOrderGoodsCount(orderList) {
    let count = 0;
    for(let i=0; i<orderList.length; i++) {
        count = count + (orderList[i].num)*(orderList[i].price);
        
    }
    return count;
}

export function timeTransDate(timestamp1){
    let timestamp = new Date(timestamp1);//如果timestamp为10位不需要乘1000
    let Y = timestamp.getFullYear();
    let M = timestamp.getMonth() + 1;
    let D = timestamp.getDate();
    let h = timestamp.getHours();
    let m = timestamp.getMinutes();
    let s = timestamp.getSeconds();
    return {
        Y,
        M,
        D,
        h,
        m,
        s
    };
}

export function getOrderList(willBuyList) {
    let List = willBuyList;
    let arr = [];
    for(let i=0; i<List.length; i++) {
        if(List[i].isChecked === true) {
            delete List[i].isChecked;
            delete List[i].userId;
            delete List[i].willbuyId;
            delete List[i].__v;
            arr.push(List[i]);
        }
    }
    return arr;
}

export function ordersSort(orders) {
    let arr = orders;
    arr.sort(function(a,b) {
        return b.create_time-a.create_time;
    })
    return arr;
}
export function getWillbuyIds(willBuyList) {
    let List = willBuyList;
    let str = "ws";
    for(let i=0; i<List.length; i++) {
        if(List[i].isChecked === true) {
            str = str + "-"+List[i].willbuyId;
        }
    }
    return str;
}