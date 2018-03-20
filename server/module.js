const mongoose = require('mongoose');

//连接mongo，并使用boss这个集合，若没有boss它会自动帮我新建
const DB_URL = 'mongodb://localhost:27017/boss'; 
mongoose.connect(DB_URL);

const models = {
    user: {
        'user': {type: String, require: true},
        'pwd': {type: String, require: true},
        'type': {type: String, require: true},
        'avatar': {type: String},  //头像
        'desc': {type: String},   //个人简介
        'job': {type: String},   //职位名
        //if boss
        'company': {type: String}, //公司
        'money': {type: String}   //工资
    },
    chat: {
        'chatid': {type: String, require: true},
        'from': {type: String, require: true},
        'to': {type: String, require: true},
        'read': {type: Boolean, default: false},
        'content': {type: String, require: true, default: ''},
        'create_time': {type: Number, default: Date.now}     
    },
    goods: {
        'goodsId': {type: String, require: true},
        'title': {type: String, require: true},
        'imgUrl': {type: String, require: true},
        'price': {type: Number, require: true},
        'categoryId': {type: String, require: true},
        'bigImgList': {type: Array},
        'monthSell': {type: Number, require: true},
        'reviews': {type: Number, require: true},
        'sendCost': {type: String, require: true, default: '中通快递 10元'},
    },
    categorys: {
        'categoryId': {type: String, require: true},
        'categoryTitle': {type: String, require: true},
    },
    willbuy: {
        'willbuyId': {type: String, require: true},
        'userId': {type: String, require: true},
        'goodsId': {type: String, require: true},
        'categoryId': {type: String, require: true},
        'title': {type: String, require: true},
        'imgUrl': {type: String, require: true},
        'price': {type: Number, require: true},
        'num': {type: Number, require: true},
    }
}

for(let m in models) {
    mongoose.model(m, new mongoose.Schema(models[m]))
}

module.exports = {
    getModel: function(name) {
        return mongoose.model(name)
    }
}
