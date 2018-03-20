import React from 'react';
import { Menu, ActivityIndicator, NavBar, Carousel } from 'antd-mobile';
import VegCard from '../../components/VegCard';
import Foot from '../../components/Foot';
import axios from 'axios';

class VegIndex extends React.Component {
    state = {
        carouselImg: ['1', '2', '3'],
        imgHeight: 176,
        slideIndex: 0,
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
        categorys: [],
        show: false,
        seafood: [],
        greens: [],
        meat: []
    }
    componentDidMount() {
        axios.get('/user/categorystest')
        .then(res => {
            if(res.status===200) {
                let arr = [];
                res.data.map(
                    v => {
                        arr.push({value: v.categoryId, label: v.categoryTitle, categoryId: v.categoryId, categoryTitle: v.categoryTitle})
                        return v;
                    }
                );
                this.setState({
                    categorys: arr
                });
            }
        });
        axios.get('/user/fourSeafood')
        .then(res => {
            if(res.status===200) {
                this.setState({
                    seafood: res.data.seafood
                })
            }
        });
        axios.get('/user/fourGreens')
        .then(res => {
            if(res.status===200) {
                this.setState({
                    greens: res.data.greens
                })
            }
        });
        axios.get('/user/fourMeat')
        .then(res => {
            if(res.status===200) {
                this.setState({
                    meat: res.data.meat
                })
            }
        })
    }
    onChange = (value) => {
        this.props.history.push(`/catedetail/${value}`);
    }
    handleClick = (e) => {
        e.preventDefault(); // Fix event propagation on Android
        this.setState({
        show: !this.state.show,
        });
        // mock for async data loading
    }
    
    onMaskClick = () => {
        this.setState({
        show: false,
        });
    }
    render(){
        const { categorys, show, seafood, greens, meat } = this.state;
        const menuEl = (
          <Menu
            className="single-foo-menu"
            data={categorys}
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
                    categorys.length && <div>
                        <CatVegCard categoryTitle={categorys[0].categoryTitle} list={seafood}/>
                        <CatVegCard categoryTitle={categorys[1].categoryTitle} list={greens}/>
                        <CatVegCard categoryTitle={categorys[2].categoryTitle} list={meat}/>
                        <Foot/>
                    </div>
                }
            </div>
        );
	}
}

function CatVegCard(props) {
    return (
        <div>
            <h4 className="categoryTitle">{props.categoryTitle}</h4>
            <div className="veglist">
                {
                    props.list.map(
                        v => (
                            <VegCard vegItem={v} key={v.goodsId}/>
                        )
                    )
                }
            </div>
        </div>
    );
}
export default VegIndex