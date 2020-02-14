import React, { Component } from 'react';
import notfound from './images/notfound.png';
import { ViewHeader } from '../../Components';
import { withRouter } from 'react-router-dom';
import './index.less';
import { GetGoodList_Async } from '../../Services';
import { Toast } from 'antd-mobile';

@withRouter
class GoodBook extends Component {

    constructor(props) {
        super(props);

        this.pageNo = 0;

        this.state = {
            list:[],
            cover: '',
            OpenPage:false,
            refreshing: true,
            isLoading: true,
            hasMore: true,
            is_running:false
        }
    }
    
    async componentDidMount() {
        
        Toast.loading('Loading...', 0);

        setTimeout(() => {
            this.setState({
                OpenPage:true
            });
        }, 1);
        
        let res = await this.GetList_Async();
        
        if(res){
            this.setState({
                cover: res.top_images,
                list: [...this.state.list, ...res.goods],
                refreshing: false,
                isLoading: false,
            });
        }
        Toast.hide();
    }

    async GetList_Async(){  //请求数据的方法

        this.pageNo++     //每次下拉的时候pageNo++
        let subject_id = localStorage.getItem('SubMajor_Id');
        let params = {  
            "subject": subject_id || "557",
            "user_token": localStorage.getItem('accessToken') ||"",
            "page": this.pageNo,
            "limit":'4'
        }

        let res = await GetGoodList_Async(JSON.stringify(params));
        console.log(res);
        if(res && res.code === "200" && res.msg === "success"){
            return res.data;
        }
        return null;
    }

    GoToIndex = ()=>{

        this.setState({
            OpenPage:false
        });

        setTimeout(() => {
            this.props.history.push('/index');
        }, 690);
    }

    ScrollHandler = async (e)=>{
        let dom = e.target;

        let position = {
            top: dom.scrollTop,
            left: dom.scrollLeft,
            width: dom.scrollWidth,
            height: dom.scrollHeight,
            clientHeight: dom.clientHeight  //div的可视区域
        };
        
        console.log('offset:',position);

        //下拉到最底部加载下一页
        if(position.height - position.top <= dom.clientHeight){
            //alert('已经滑动到底部');
            this.state.is_running === false &&  await this.onRefresh();
        }
    }

    onRefresh = async () => {

        if(!this.state.hasMore){
            return;
        }

        this.setState({ refreshing: true, isLoading: true, is_running:true });
        let res = await this.GetList_Async();
        this.setState({ refreshing: false, isLoading: false,is_running:false });

        if(!res || !res.goods || res.goods.length === 0){

            this.setState({
                hasMore: false,
            });

        }else{
            console.log('list:',this.state.list);
            this.setState({
                cover:res.top_images,
                list: [...this.state.list, ...res.goods],
            });
        }
    };

    render() {
        const { list } = this.state;
        let rows = null;

        rows = list.map((item)=>{
            return (
                <div className="goodbook_item" key={item.id}>
                    <div className="book_item_cover" style={{ backgroundImage:'url('+item.cover+')'}}></div>
                    <div className="book_item_desc">
                        <span >全网最低价</span>
                    </div>
                    <div className="book_item_name">{item.name}</div>
                    <div className="book_item_bottom">
                        <div className="book_item_price">￥{ item.price }</div>
                        <div className="book_item_buy_number">{ item.shopper }人付款</div>
                    </div>
                </div>
            )
        })
        return (
            <div className={ this.state.OpenPage ? "good_book_index active" : "good_book_index" }>
                <ViewHeader title="商品列表" onClick={ this.GoToIndex } />
                {
                    (!list || list.length === 0) 
                    ?
                    (<div className="common_course_notfound">
                        <img src={ notfound } alt="暂无数据"/>
                    </div>)
                    :
                    (
                        null
                    )
                }

                {/* <div className="top_images">
                    <img src={ this.state.cover } alt=""/>
                </div> */}

                <div className="goodbook_listview" onScroll={ this.ScrollHandler }>
                    <div className="top_images">
                        <img src={ this.state.cover } alt=""/>
                    </div>
                    {
                        rows
                    }
                    
                    <div className="goodbook_footer" onClick={ this.onRefresh }>
                    {
                        this.state.hasMore ?"点击或下拉加载数据...":"暂无更多数据"
                    }
                    </div>
                </div>
            </div>
        )
    }
}

export default GoodBook;
