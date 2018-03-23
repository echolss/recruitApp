const express = require('express')
const Router = express.Router();
const model = require('./module');
const User = model.getModel('user');
const Chat = model.getModel('chat');
const Goods = model.getModel('goods');
const Categorys = model.getModel('categorys');
const Willbuy = model.getModel('willbuy');
const Order = model.getModel('order');
const utils = require('utility');

const _filter = {'pwd': 0, '__v': 0};  //定义一个统一显示条件

Router.get('/info',function(req,res) {
    //用户有没有cookie
    const { userid } =req.cookies;      //读取cookie
    if(!userid) {
        return res.json({code: 1});
    }
    User.findOne({_id: userid},_filter,function(err,doc) {
        if(err) {
            return res.json({code: 1,msg: '后端出错了'})
        }
        if(doc) {
            return res.json({code:0, data: doc})
        }

    })
})
Router.get('/usertest',function(req,res) {
    //User.remove({},function(err,doc) {})  //删除所有数据
    User.find({},_filter,function(err,doc) {
        return res.json(doc)
    })
})
Router.get('/msgtest',function(req,res) {
    //Chat.remove({},function(err,doc) {})  //删除所有数据
    Chat.find({},function(err,doc) {
        return res.json(doc)
    })
})

Router.get('/list',function(req,res) {
    const { type } =req.query;
    //用户有没有cookie
    //User.remove({},function(err,doc) {})  //删除所有数据
    User.find({type},_filter,function(err,doc) {
        return res.json({code: 0, data: doc})
    })
})
Router.post('/register',function(req,res) {
    const {user, pwd, type,avatar,address} = req.body;
    User.findOne({user},function(err,doc) {
        if(doc) {
            return res.json({code: 1,msg: '用户已存在'})
        }
        /*因为create并不能返回生成后的id，需要换一种写法
        User.create({user,pwd: md5Pwd(pwd),type},function(err,doc) {
            if(err) {
                return res.json({code: 1,msg: '后端出错了'})
            }
            return res.json({code: 0})
        })
        */
        const userModel = new User({user,pwd: md5Pwd(pwd),type,avatar,address});
        userModel.save(function(err,doc) {
            if(err) {
                return res.json({code: 1,msg: '后端出错了'})
            }
            res.cookie('userid',doc._id);   //写入cookie
            const { user, type, _id,avatar,address } = doc;   //过滤返回的信息
            return res.json({code: 0, data: { user, type, _id,avatar,address }})
        })
    })
})

//标识信息为已读
//update默认查询到第一条

Router.post('/readmsg',function(req,res) {
    const myid = req.cookies.userid;
    const { from } = req.body;
    Chat.update(
        {from,to: myid},
        {'$set': {read: true}},
        {'multi': true},
        function(err,doc) {
            if(!err) {
                return res.json({code: 0,num: doc.nModified});
            }
            return res.json({code: 1,msg: '修改失败'});
        }
    )
})

Router.post('/login',function(req,res) {
    const {user, pwd} = req.body;
    User.findOne({user,pwd: md5Pwd(pwd)},_filter,function(err,doc) {  //第一个是查询条件，第二个是后端返回数据的显示条件
        if(doc) {
            res.cookie('userid',doc._id)  //设置cookie
            return res.json({code: 0,data: doc})
        }
        User.findOne({user},function(err,doc) {
            if(!doc) {
                return res.json({code: 1,msg: '该用户不存在'})
            }
            else if(doc) {
                return res.json({code: 1,msg: '密码错误'})
            }
            else if(err) {
                return res.json({code: 1,msg: '后端出错了'})
            }
        })
    })
})

Router.post('/update', function(req,res) {
    const userid = req.cookies.userid; //做一下cookie的校验
    if(!userid) {  //1、查找ID是否存在
        return json.dumps({code: 1})
    }
    const updateData = req.body;
    User.findByIdAndUpdate(userid,updateData,function(err,doc) {
        const data = Object.assign({},{
            user: doc.user,
            type: doc.type
        },updateData);
        if(err) {
            return res.json({code: 1,msg: '后端出错了'})
        }
        return res.json({code: 0, data})
    })
})

Router.get('/getmsglist',function(req,res) {
    const userid = req.cookies.userid;

    User.find({},function(err,userdoc) {
        let users = {};
        userdoc.forEach(v => {
            users[v._id] = {
                name: v.user,
                avatar: v.avatar
            }
        });
        Chat.find({'$or':[{from:userid},{to:userid}]},function(err,doc) {
            if(err) {
                console.log('后端出错了');
            }
            else{
                return res.json({code: 0, msgs: doc, users: users})
            }
        })
    })
    
})

function md5Pwd(pwd) {  //光用utils.md5(pwd)是不够的，可以在对应网站查出对应密码，加盐md5，外层再加md5才合格
    const salt = 'luo_sha_sha_280508950@ECHO~~~~';
    return utils.md5(utils.md5(pwd+salt));
}

function getMaxwillbuyId(doc) {   //获取最大数+1
    var id = 1;
    for(var i = 0; i<doc.length; i++) {
        if(Number(doc[i].willbuyId.substr(1)) > id) {
            id = Number(doc[i].willbuyId.substr(1))
        }
    }
    return id + 1;
}

Router.get('/goodstest',function(req,res) {
    //Goods.remove({},function(err,doc) {})  //删除所有数据
    Goods.find({},function(err,doc) {
        return res.json(doc)
    })
})
// const greens = Goods.find({categoryId: '2'},function(err,doc) {
    //     return res.json(doc).slice(0,4)
    // })
    // const meat = Goods.find({categoryId: '3'},function(err,doc) {
    //     return res.json(doc).slice(0,4)
    // })
    // return {
    //     data: {
    //         seafood: seafood,
    //         greens: greens,
    //         meat: meat
    //     }
    // }
Router.get('/fourSeafood',function(req,res) {
    Goods.find({categoryId: '1'},function(err,doc) {
        if(err) {
            console.log('后端出错了');
        }
        else{
            return res.json({seafood: doc.slice(doc.length-4,doc.length)})
        }
    })
})
Router.get('/fourGreens',function(req,res) {
    Goods.find({categoryId: '2'},function(err,doc) {
        if(err) {
            console.log('后端出错了');
        }
        else{
            return res.json({greens: doc.slice(doc.length-4,doc.length)})
        }
    })
})
Router.get('/fourMeat',function(req,res) {
    Goods.find({categoryId: '3'},function(err,doc) {
        if(err) {
            console.log('后端出错了');
        }
        else{
            return res.json({meat: doc.slice(doc.length-4,doc.length)})
        }
    })
});
Router.get('/vegdetail',function(req,res) {
    const { vegId } =req.query;
    Goods.findOne({goodsId: vegId},function(err,doc) {  //第一个是查询条件，第二个是后端返回数据的显示条件
        return res.json(doc)
    })
});
Router.get('/catedetail',function(req,res) {
    const { cateId } =req.query;
    Goods.find({categoryId: cateId},function(err,doc) {  //第一个是查询条件，第二个是后端返回数据的显示条件
        return res.json(doc)
    })
});
Router.get('/getwillbuylist',function(req,res) {
    const userid = req.cookies.userid; 
    Willbuy.find({userId: userid},function(err,doc) {
        if(err) {
            console.log('后端出错了');
        }
        else{
            return res.json({code: 0, willBuyList: doc})
        }
    })
    
})
Router.post('/addwillbuy',function(req,res) {
    const {userId,goodsId,categoryId,title,imgUrl,price,num} = req.body;
    Willbuy.find({goodsId},function(err,doc) {
        if(doc.length===1) {
            Willbuy.findOne({goodsId},function(oneerr,onedoc) {
                Willbuy.update(
                    {goodsId},
                    {'$set': {num: onedoc.num + num}},
                    function(err,doc) {
                        if(!err) {
                            return res.json({code: 0});
                        }
                        return res.json({code: 1,msg: '修改失败'});
                    }
                )
            })
        } else {
            Willbuy.find({},function(allerr,alldoc) {
                const willbuyId = alldoc.length ? getMaxwillbuyId(alldoc) : 1;
                Willbuy.create(
                    {
                        willbuyId: 'w'+willbuyId,
                        userId,
                        goodsId,
                        categoryId,
                        title,
                        imgUrl,
                        price,
                        num
                    },
                    function(e,d) {
                        return res.json({code: 0})
                    }
                );
            })
        }
    })
})
Router.get('/willbuystest',function(req,res) {
    Willbuy.find({},function(err,doc) {
        return res.json(doc)
    })
})
Router.get('/deletewillbuy',function(req,res) {
    const { willbuyId } =req.query;
    Willbuy.remove({willbuyId: willbuyId},function(e,d) {  //第一个是查询条件，第二个是后端返回数据的显示条件
        Willbuy.find({},function(err,doc) {
            return res.json({code: 0, willBuyList: doc})
        })
    })
});
//Willbuy.remove({},function(err,doc) {})  //删除所有数据

//Willbuy.remove({ willbuyId: { $in: ['w4', 'w6','w11','w12'] } },function(e,d) {});  //删除多条记录
Router.get('/deletewillbuysByIds',function(req,res) {
    const { willbuyIds } =req.query;  //"ws-w10-w11-w12"
    const deleteIds = willbuyIds.split('-').slice(1);  // ['w10','w11','w12']
    Willbuy.remove({ willbuyId: { $in: deleteIds } },function(err,doc) {
        if(err) {
            console.log('后端出错了');
        }
        else{
            return res.json({code: 0})
        }
    });
});
//将user为小桃的type改为manager
//User.update({'user': '小桃'},{'$set': {type: 'manager'}},function(err,doc) {})
/*
User.create(
    {
        "user": "小红",
        "type": "manager",
        "avatar": "girl",
        "job": "管理员",
        "desc": "一只可爱的开心果！"
    }
);
*/
//User.remove({},function(err,doc) {});
/*
Goods.create(
    [
        {
            goodsId: '1005',
            title: '正宗南澳鱼骨海鲜干货特产 500g',
            imgUrl: 'https://g-search3.alicdn.com/img/bao/uploaded/i4/i2/267896053/TB2ZsIDuhRDOuFjSZFzXXcIipXa_!!267896053.jpg_250x250.jpg_.webp',
            price: '¥138.00',
            categoryId: '1',
            bigImgList: [
                'http://www.6ctb.com/images/upload/image/20161130/20161130160934_68198.jpg',
                'http://www.6ctb.com/images/upload/image/20161130/20161130160935_83081.jpg',
                'http://www.6ctb.com/images/upload/image/20161130/20161130160935_38905.jpg',
                'http://www.6ctb.com/images/upload/image/20161130/20161130160935_46962.jpg',
                'http://www.6ctb.com/images/upload/image/20161130/20161130160936_74285.jpg',
                'http://www.6ctb.com/images/upload/image/20161130/20161130160936_40397.jpg'
            ],
            monthSell: '10000',
            reviews: '26',
            sendCost: '韵达速递	6元   |   顺丰速运	23元  '
        }
    ]
);
*/
Router.get('/categorystest',function(req,res) {
    Categorys.find({},function(err,doc) {
        return res.json(doc)
    })
})
//Goods.remove({},function(err,doc) {})  //删除所有数据

module.exports = Router

//Chat.remove({},function(err,doc) {});

//post参数body来获取，get参数query来获取
/*
Goods.create(
    [
        {
          "bigImgList": [
            "http://www.6ctb.com/images/upload/image/20161130/20161130160934_68198.jpg",
            "http://www.6ctb.com/images/upload/image/20161130/20161130160935_83081.jpg",
            "http://www.6ctb.com/images/upload/image/20161130/20161130160935_38905.jpg",
            "http://www.6ctb.com/images/upload/image/20161130/20161130160935_46962.jpg",
            "http://www.6ctb.com/images/upload/image/20161130/20161130160936_74285.jpg",
            "http://www.6ctb.com/images/upload/image/20161130/20161130160936_40397.jpg"
          ],
          "sendCost": "韵达速递\t6元   |   顺丰速运\t23元  ",
          "goodsId": "1001",
          "title": "红虾 阿根廷 2Kg",
          "imgUrl": "http://www.6ctb.com/images/201611/goods_img/496_P_1478053438754.jpg",
          "price": 168.00,
          "categoryId": "1",
          "monthSell": 10000,
          "reviews": 26
        }
      ]
);
*/

/*
Categorys.create(
    [
        {
            categoryId: '1',
            categoryTitle: '大连海鲜'
        },
        {
            categoryId: '2',
            categoryTitle: '清新绿蔬'
        },
        {
            categoryId: '3',
            categoryTitle: '鲜美肉类'
        },
        {
            categoryId: '4',
            categoryTitle: '粮食副油',
        },
        {
            categoryId: '5',
            categoryTitle: '脆香水果',
        }
    ]
);
*/
Router.get('/orderstest',function(req,res) {
    Order.find({},function(err,doc) {
        return res.json(doc)
    })
})
Router.get('/getorderlist',function(req,res) {
    const userid = req.cookies.userid;
    Order.find({'$or':[{from:userid},{to:userid}]},function(err,doc) {
        if(err) {
            console.log('后端出错了');
        }
        else{
            return res.json({code: 0, orders: doc})
        }
    })
})
Router.get('/getorderdetailById',function(req,res) {
    const { orderid } = req.query;
    Order.findOne({orderid},function(err,doc) {
        return res.json({code: 0, orderList: doc.orderList})
    })
})
Router.post('/readorder',function(req,res) {
    const { orderid } = req.body;
    Order.update(
        {orderid},
        {'$set': {handle: true}},
        function(err,doc) {
            if(!err) {
                return res.json({code: 0});
            }
            return res.json({code: 1,msg: '修改失败'});
        }
    )
})
//Order.remove({},function(err,doc) {});
/*
Order.create(
    [
        {
            orderid: 'o1',
            from: '5ab31d31b3eaf33bacf534f4',
            to: '5ab324e8b3eaf33bacf534f6',
            handle: false,
            orderList: [
                {
                  "goodsId": "2001",
                  "categoryId": "2",
                  "title": "黄豆芽 250克",
                  "imgUrl": "http://www.6ctb.com/images/201612/goods_img/674_G_1482134566725.jpg",
                  "price": 1.9,
                  "num": 1
                },
                {
                  "goodsId": "3003",
                  "categoryId": "3",
                  "title": "猪肉 肋排 600g",
                  "imgUrl": "http://www.6ctb.com/images/201701/goods_img/689_P_1484548279689.jpg",
                  "price": 24.9,
                  "num": 3
                },
                {
                  "goodsId": "1004",
                  "categoryId": "1",
                  "title": "黄辣丁 500g",
                  "imgUrl": "http://www.6ctb.com/images/201611/goods_img/579_P_1479719353955.jpg",
                  "price": 25.9,
                  "num": 1
                },
                {
                  "goodsId": "1003",
                  "categoryId": "1",
                  "title": "鳕鱼 500g",
                  "imgUrl": "http://www.6ctb.com/images/201610/goods_img/437_P_1476773151802.jpg",
                  "price": 26.9,
                  "num": 1
                }
            ],
            create_time: 1518319634075     
        },
        {
            orderid: 'o2',
            from: '5ab31d31b3eaf33bacf534f4',
            to: '5ab324e8b3eaf33bacf534f6',
            handle: false,
            orderList: [
                {
                  "goodsId": "2001",
                  "categoryId": "2",
                  "title": "黄豆芽 250克",
                  "imgUrl": "http://www.6ctb.com/images/201612/goods_img/674_G_1482134566725.jpg",
                  "price": 1.9,
                  "num": 1
                },
                {
                  "goodsId": "1004",
                  "categoryId": "1",
                  "title": "黄辣丁 500g",
                  "imgUrl": "http://www.6ctb.com/images/201611/goods_img/579_P_1479719353955.jpg",
                  "price": 25.9,
                  "num": 1
                }
            ],
            create_time: 1518320266219     
        }
    ]
);
*/
// Order.create(
//     {
//         orderid: 'o3',
//         from: '5ab36e034e0ab951d0997639',
//         to: '5ab324e8b3eaf33bacf534f6',
//         handle: true,
//         orderList: [
//             {
//                 "goodsId": "2001",
//                 "categoryId": "2",
//                 "title": "黄豆芽 250克",
//                 "imgUrl": "http://www.6ctb.com/images/201612/goods_img/674_G_1482134566725.jpg",
//                 "price": 1.9,
//                 "num": 1
//             }
//         ],
//         create_time: 1519374515824    
//     }
// );