import React, { Component } from 'react';
import { ViewHeader } from '../../Components';
import { withRouter} from 'react-router-dom';
import './index.less';
import { GetHotNews_Async } from '../../Services/index';
import moment from 'moment';
import { Toast, } from 'antd-mobile';

@withRouter
class HotNews extends Component {

    constructor(props) {
        super(props);

        //定义分页信息
        this.pageNo = 0;
        this.dateFormat = 'YYYY-MM-DD',

        this.state = {
            list:[],
            OpenPage:false,
            refreshing: true,
            isLoading: true,
            height: document.documentElement.clientHeight,
            useBodyScroll: false,
            hasMore: true,
            is_running:false
        }
    }

    async componentDidMount() {
        Toast.loading("加载数据中...", 2, ()=>{}, true);
        setTimeout(() => {
            this.setState({
                OpenPage:true
            });
        }, 0);
        
        let list = await this.GetList_Async();

        if(list){
            this.setState({
                list: [...this.state.list,...list],
                refreshing: false,
                isLoading: false,
            });
        }
    }

    async GetList_Async(){  //请求数据的方法

        this.pageNo++     //每次下拉的时候pageNo++
        let subject_id = localStorage.getItem('SubMajor_Id');
        let params = {  
            "subject": subject_id || "557",
            "user_token": localStorage.getItem('accessToken')|| "",
            "page":this.pageNo,
            "limit":10
        }

        let res = await GetHotNews_Async(JSON.stringify(params));
        
        if(res && res.code === "200" && res.msg === "success"){
            return res.data;
        }
        return null;
    }

    onRefresh = async () => {

        if(!this.state.hasMore){
            return;
        }

        this.setState({ refreshing: true, isLoading: true, is_running:true });
        let list = await this.GetList_Async();
        this.setState({ refreshing: false, isLoading: false,is_running:false });

        if(!list || list.length === 0){

            this.setState({
                hasMore: false,
            });

        }else{
            console.log('list:',this.state.list);
            this.setState({
                list: [...this.state.list,...list],
            });
        }
    };
    
    GoToIndex = async ()=>{
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

    GoToDetail = (url)=>{
        window.open(url);
    }


    render() {
        //这里就是个渲染数据，rowData就是每次过来的那一批数据，已经自动给你遍历好了，rouID可以作为key值使用，直接渲染数据即可
        const rows = this.state.list.map((item) => {
            return (
                <div key={item.id} className="hotnews_item" onClick={ ()=>{
                    this.GoToDetail(item.article_url)
                }}>
                    <div className="hotnews_item_text">{ item.article_title }</div>
                    <div className="hotnews_item_date">{ moment(item.create_time).format(this.dateFormat) }</div>
                </div>
            );
        });

        return (
            <div className={ this.state.OpenPage ? "hot_news_index active" : "hot_news_index" }>
                <ViewHeader title="全部资讯" onClick={ this.GoToIndex } />
                
                <div className="hotnews_listview" ref={el => this.container = el} onScroll={ this.ScrollHandler }>
                    {
                        rows
                    }
                    <div 
                        className="hotnews_listview_footer" 
                        onClick={ this.onRefresh }
                    >
                        {
                            this.state.hasMore ?"点击或下拉加载数据...":"暂无更多数据"
                        }
                    </div>
                </div>

            </div>
        )
    }
}


export default HotNews;