import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { ViewHeader } from '../../Components';
import { withRouter} from 'react-router-dom';
import './index.less';
import { PullToRefresh,ListView  } from 'antd-mobile';
import { GetHotNews_Async } from '../../Services/index';
import moment from 'moment';

@withRouter
class HotNews extends Component {

    constructor(props) {
        super(props);

        //初始化ListView数据源
        const dataSource = new ListView.DataSource({  
            rowHasChanged: (row1, row2) => row1 !== row2,
        });

        //定义分页信息
        this.pageNo = 0;
        this.dateFormat = 'YYYY-MM-DD',

        this.state = {
            list:[],
            OpenPage:false,
            dataSource,
            refreshing: true,
            isLoading: true,
            height: document.documentElement.clientHeight,
            useBodyScroll: false,
            hasMore: true,
        }
    }

    async componentDidMount() {
        
        this.setState({
            OpenPage:true
        });

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
            "subject_id": subject_id || "557",
            "user_token":"67e2ce3346d946e1a9ac4ede6bfd7dd7",
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

        this.setState({ refreshing: true, isLoading: true });
        let list = await this.GetList_Async();
        this.setState({ refreshing: false, isLoading: false });

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
        const dom = ReactDOM.findDOMNode(this.container);
        console.log(dom);
        
        const height = this.state.height - dom.offsetTop;
        console.log('height:',height);
    };
    
    GoToIndex = async ()=>{
        this.setState({
            OpenPage:false
        });

        setTimeout(() => {
            this.props.history.push('/index');
        }, 690);
    }

    render() {
        //这里就是个渲染数据，rowData就是每次过来的那一批数据，已经自动给你遍历好了，rouID可以作为key值使用，直接渲染数据即可
        const rows = this.state.list.map((item) => {
            return (
                <div key={item.id} className="hotnews_item">
                    <div className="hotnews_item_text">{item.article_title}</div>
                    <div className="hotnews_item_date">{ moment(item.create_time).format(this.dateFormat) }</div>
                </div>
            );
        });

        return (
            <div className={ this.state.OpenPage ? "hot_news_index active" : "hot_news_index" }>
                <ViewHeader title="全部资讯" onClick={ this.GoToIndex } />
                
                <div className="hotnews_listview" ref={el => this.container = el}>
                    {
                        rows
                    }
                    <div 
                        className="hotnews_listview_footer" 
                        onClick={ this.onRefresh }
                        ref={el => this.bottom = el}
                    >点击或下拉加载数据...</div>
                </div>

            </div>
        )
    }
}


export default HotNews;