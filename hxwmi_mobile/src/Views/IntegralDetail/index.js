import React, { Component } from 'react';
import './index.less';
import { ViewHeader } from '../../Components';
import { withRouter } from 'react-router-dom';
import { GetIntegralLogList_Async } from '../../Services';
import { Toast } from 'antd-mobile';
import moment from 'moment';

@withRouter
class IntegralDetail extends Component {

    constructor(props) {
        super(props);

        this.pageNo = 0;
        this.dateFormat = 'YYYY-MM-DD HH:mm:ss';

        this.state ={
            OpenPage:false,
            list:[],
            isLoading:false,
            hasMore: true,
        }
    }

    async componentDidMount(){

        setTimeout(() => {
            this.setState({
                OpenPage:true,

            });
        }, 1);

        let list = await this.GetList_Async();
        
        if(list && list.length >0){    
            this.setState({
                list: [...this.state.list, ...list]
            });
        }

    }

    GotoIndex =()=>{
        this.props.history.push('/my_integral')
    }

    //获取积分列表
    GetList_Async = async()=>{
        this.pageNo++;
        let params = {
            user_token: localStorage.getItem('accessToken') || "",
            page: this.pageNo,
            limit:'5',
        }
        Toast.loading("Loading...", 0, ()=>{}, true);
        let res = await GetIntegralLogList_Async(JSON.stringify(params));
        Toast.hide();
        console.log(res);

        if(res && res.code ==="200" && res.msg==="success"){
            return res.data;
        }else{
            return null
        }
    }

    //刷新列表方法
    onRefresh = async () => {

        if(!this.state.hasMore){
            return;
        }
        
        this.setState({ isLoading: true });
        let list = await this.GetList_Async();
        this.setState({ isLoading:false });

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
    }

    //滚动列表
    ScrollHandler = async (e)=>{
        let dom = e.target;
        let position = {
            top: dom.scrollTop,
            left: dom.scrollLeft,
            width: dom.scrollWidth,
            height: dom.scrollHeight,
            clientHeight: dom.clientHeight  //div的可视区域
        };
        
        // console.log('offset:',position);

        //下拉到最底部加载下一页
        if(position.height - position.top <= dom.clientHeight){
            //alert('已经滑动到底部');
            this.state.isLoading === false &&  await this.onRefresh();
        }
    }
    
    
    render() {
        console.log(this.props);
        const { list } = this.state;
        const detail_item = list && list.map((item)=>{
            let create_time = item.create_time ? moment(item.create_time).format(this.dateFormat) : '';
            return (
                <div className="integral_detail_item" key={item.id}>
                    <div className="integral_detail_item_left">
                        <div className="integral_detail_title">{ item.remark }</div>
                        <div className="integral_detail_datetime">{ create_time }</div>
                    </div>
                    <div className="integral_detail_item_right">{ item.trans_num}</div>
                </div>
            )
        })

        return (
            <div className={ this.state.OpenPage ? "integral_detail_index active" : "integral_detail_index" }>
                <ViewHeader 
                    title="积分明细" 
                    style={{ fontWeight:"bold", borderBottom:"solid 1px #ccc"}}
                    onClick={ this.GotoIndex }
                />

                <div className="integral_detail_listview" onScroll={ this.ScrollHandler }>

                    {
                        detail_item
                    }

                    {
                        this.state.hasMore ?(
                            <div className="list_view_footer" onClick={ this.onRefresh }>点击或下拉加载数据...</div>
                        ):(
                            <div className="list_view_footer">暂无更多数据...</div>
                        )
                    }

                </div>
            </div>
        );
    }
}

export default IntegralDetail;
