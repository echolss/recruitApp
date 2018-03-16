import React from 'react';
import { Menu, ActivityIndicator, NavBar, Carousel } from 'antd-mobile';
import VegCard from '../../components/VegCard';

const data = [
    {
      value: '1',
      label: 'Food',
    }, {
      value: '2',
      label: 'Supermarket',
    },
    {
      value: '3',
      label: 'Extra',
      isLeaf: true,
    },
];

class VegIndex extends React.Component {
    state = {
        carouselImg: ['1', '2', '3'],
        imgHeight: 176,
        slideIndex: 0,
        allGoodsList: [
            {
                categoryId: '1',
                categoryTitle: '今日特惠',
                list: [
                    {
                        id: '1001',
                        title: '三文鱼段 400克',
                        imgUrl: 'http://www.6ctb.com/images/201701/thumb_img/701_thumb_G_1484300446056.jpg',
                        price: '￥63.90'
                    },
                    {
                        id: '1002',
                        title: '蒜苗 250g',
                        imgUrl: 'http://www.6ctb.com/images/201609/thumb_img/361_thumb_G_1473671680842.jpg',
                        price: '￥2.60'
                    },
                    {
                        id: '1003',
                        title: '莲藕 250g',
                        imgUrl: 'http://www.6ctb.com/images/201612/goods_img/660_P_1482120482557.jpg',
                        price: '￥8.59'
                    },
                    {
                        id: '1004',
                        title: '香菇 250g',
                        imgUrl: 'http://www.6ctb.com/images/201612/thumb_img/629_thumb_G_1482309144840.jpg',
                        price: '￥4.90'
                    }
                ]
            },
            {
                categoryId: '2',
                categoryTitle: '清新绿蔬',
                list: [
                    {
                        id: '2001',
                        title: '黄豆芽 250克',
                        imgUrl: 'http://www.6ctb.com/images/201612/goods_img/674_G_1482134566725.jpg',
                        price: '￥1.90'
                    },
                    {
                        id: '2002',
                        title: '西兰花 400g',
                        imgUrl: 'http://www.6ctb.com/images/201612/goods_img/672_P_1482134432990.jpg',
                        price: '￥6.90'
                    },
                    {
                        id: '2003',
                        title: '生菜 250g',
                        imgUrl: 'http://www.6ctb.com/images/201612/goods_img/649_P_1482119727379.jpg',
                        price: '￥3.90'
                    },
                    {
                        id: '2004',
                        title: '茼蒿 250g',
                        imgUrl: 'http://www.6ctb.com/images/201612/goods_img/636_P_1482118422203.jpg',
                        price: '￥5.90'
                    }
                ]
            },
            {
                categoryId: '3',
                categoryTitle: '鲜美肉类',
                list: [
                    {
                        id: '3001',
                        title: '猪肉 里脊肉 250g',
                        imgUrl: 'http://www.6ctb.com/images/201612/goods_img/687_P_1482224872500.jpg',
                        price: '￥9.90'
                    },
                    {
                        id: '3002',
                        title: '猪肉 精瘦肉 250g',
                        imgUrl: 'http://www.6ctb.com/images/201612/goods_img/686_G_1482224832957.jpg',
                        price: '￥9.90'
                    },
                    {
                        id: '3003',
                        title: '猪肉 肋排 600g',
                        imgUrl: 'http://www.6ctb.com/images/201701/goods_img/689_P_1484548279689.jpg',
                        price: '￥24.90'
                    },
                    {
                        id: '3004',
                        title: '黄牛腱子肉 1kg',
                        imgUrl: 'http://www.6ctb.com/images/201701/goods_img/699_G_1484018685486.jpg',
                        price: '￥75.90'
                    }
                ]
            }
        ],
        indexNavList: [
            {
                title: '商城首页',
                path: ''
            },
            {
                title: '合作伙伴',
                path: ''
            },
            {
                title: '招商加盟',
                path: ''
            },
            {
                title: '优惠促销',
                path: ''
            },
            {
                title: '新品上架',
                path: ''
            },
            {
                title: '关于我们',
                path: ''
            }
        ],
        categorys: [
            {
                value: '1',
                label: '今日特惠',
                categoryId: '1',
                categoryTitle: '今日特惠'
            }, 
            {
                value: '2',
                label: '清新绿蔬',
                categoryId: '2',
                categoryTitle: '清新绿蔬'
            },
            {
                value: '3',
                label: '鲜美肉类',
                categoryId: '3',
                categoryTitle: '鲜美肉类',
            },
            {
                value: '4',
                label: '大连海鲜',
                categoryId: '4',
                categoryTitle: '广州海鲜'
            },
            {
                value: '5',
                label: '粮食副油',
                categoryId: '5',
                categoryTitle: '粮食副油'
            }
        ],
        show: false
    }
    componentDidMount() {
    }
    onChange = (value) => {
        let label = '';
        this.state.categorys.forEach((dataItem) => {
          if (dataItem.value === value[0]) {
            label = dataItem.label;
            if (dataItem.children && value[1]) {
              dataItem.children.forEach((cItem) => {
                if (cItem.value === value[1]) {
                  label += ` ${cItem.label}`;
                }
              });
            }
          }
        });
        console.log(label);
      }
      handleClick = (e) => {
        e.preventDefault(); // Fix event propagation on Android
        this.setState({
          show: !this.state.show,
        });
        // mock for async data loading
        if (!this.state.categorys) {
          setTimeout(() => {
            this.setState({
                categorys: data,
            });
          }, 500);
        }
      }
    
      onMaskClick = () => {
        this.setState({
          show: false,
        });
      }
    render(){
        const { categorys, show } = this.state;
        const menuEl = (
          <Menu
            className="single-foo-menu"
            data={categorys}
            value={['1']}
            level={1}
            onChange={this.onChange}
            height={document.documentElement.clientHeight * 0.6}
          />
        );
        const loadingEl = (
          <div style={{ position: 'absolute', width: '100%', height: document.documentElement.clientHeight * 0.6, display: 'flex', justifyContent: 'center' }}>
            <ActivityIndicator size="large" />
          </div>
        );
		return (
            <div>                
                <div className={show ? 'single-menu-active' : ''}>
                    <div id="cateNav">
                        <NavBar
                            mode="light"
                            leftContent={
                            <span className="inline-block-ele leftNavText">
                                <img src={require('./img/category.png')} alt='' className="cateImg"/>
                                <span className="inline-block-ele">全部商品分类</span>
                                <img src={require('./img/right.png')} alt='' className="cateImg"/>
                            </span>
                            }
                            onLeftClick={this.handleClick}
                            >
                            <ul>
                                {
                                    this.state.indexNavList.map(
                                        v => (
                                            <li key={v.title} className="indexNavList-Item">{v.title}</li>
                                        )
                                    )
                                }
                            </ul>
                        </NavBar>
                    </div>
                    {show ? categorys ? menuEl : loadingEl : null}
                    {show ? <div className="menu-mask" onClick={this.onMaskClick} /> : null}
                </div>
                <Carousel
                autoplay={true}
                infinite
                selectedIndex={1}
                >
                {this.state.carouselImg.map(val => (
                    <div
                    key={val}
                    style={{ display: 'inline-block', width: '100%', height: this.state.imgHeight }}
                    >
                    <img
                        src={require(`./img/${val}.jpg`)}
                        alt=""
                        style={{ width: '100%', verticalAlign: 'top' }}
                        onLoad={() => {
                        // fire window resize event to change height
                        window.dispatchEvent(new Event('resize'));
                        this.setState({ imgHeight: 'auto' });
                        }}
                    />
                    </div>
                ))}
                </Carousel>
                {
                    this.state.allGoodsList.map(
                        categoryItem => (
                            <div key={categoryItem.categoryId}>
                                <h4 className="categoryTitle">{categoryItem.categoryTitle}</h4>
                                <div className="veglist">
                                    {
                                        categoryItem.list.map(
                                            v => (
                                                <VegCard vegItem={v} key={v.id}/>
                                            )
                                        )
                                    }
                                </div>
                            </div>
                        )
                    )
                }
                <div className="footer-box">
                    <div className="flex-foot-item">
                        <p>购物指南</p>
                        <ul>
                           <li><a href="">购物流程</a></li>
                           <li><a href="">服务协议</a></li>
                        </ul>
                    </div>
                    <div className="flex-foot-item">
                        <p>支付帮助</p>
                        <ul>
                            <li><a href="">微信支付</a></li>
                            <li><a href="">发票说明</a></li>
                        </ul>
                    </div>
                    <div className="flex-foot-item">
                       <p>配送说明</p>
                       <ul>
                           <li><a href="">配送时间</a></li>
                           <li><a href="">配送范围</a></li>
                       </ul>
                    </div>
                </div>
            </div>
        );
	}
}

export default VegIndex