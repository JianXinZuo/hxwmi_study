import React, { Component } from 'react';
import './index.less';
import moment from 'moment';
import icon_switch from './images/icon_switch.png';
import icon_default_avator from './images/icon_defaultImage.jpg';
import { withRouter } from 'react-router-dom';
import { 
    GetQAList_Async,
    ToFollow_Async
} from '../../../Services';

@withRouter
class FriendCircle extends Component {

    constructor(props) {
        super(props);

        this.pageNo = 0;
        this.dateFormat = 'YYYY-MM-DD HH:mm:ss',

        this.state ={
            list:[],
            isExpendBtn:false,
            isLoading:false,
            hasMore: true,
        }
    }

    async componentDidMount(){
        let list = await this.GetList_Async();
        
        if(list && list.length >0){    
            this.setState({
                list: [...this.state.list, ...list]
            });
        }
    }

    //获取问答列表
    GetList_Async = async()=>{
        this.pageNo++;
        let params = {
            user_token: localStorage.getItem('accessToken') || "",
            subject_id: localStorage.getItem('SubMajor_Id') || "",
            page: this.pageNo,
            limit:'5',
        }
        
        let res = await GetQAList_Async(JSON.stringify(params));
        console.log(res);

        if(res && res.code ==="200" && res.msg==="success"){
            return res.data;
        }else{
            return null
        }
    }
    
    //展开按钮
    OpenBtnGroup = ()=>{
        this.setState({
            isExpendBtn: !this.state.isExpendBtn
        });
    }

    //关注用户
    GoToFollow = async (item)=>{
        
        let params = {
            user_token: localStorage.getItem('accessToken') || "",
            topic_id: item.id
        };

        let res = await ToFollow_Async(JSON.stringify(params));
        console.log(res);

        if(res && res.code ==="200" && res.msg === "success" && res.data === "已关注"){
            this.UpdateById(item.id,"follow", true);

        }else if(res && res.code ==="200" && res.msg === "success" && res.data === "已取消关注"){
            this.UpdateById(item.id,"follow", false);

        }else{
            console.log('接口出错网络超时')
        }
    }

    //修改数组元素
    UpdateById = (id,key,value)=>{

        let list = this.state.list.map((item)=>{
            if(item.id === id){
                item[key] = value;
            }
            return item;
        });

        this.setState({
            list:[ ...list]
        });
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
    };

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

    //选择专业
    SelectMojar = ()=>{
        this.props.history.push('/select_major');
    }

    //添加新帖
    AddNewPost =()=>{

    }

    render() {

        const ListItems = this.state.list.map((item)=>{
            
            let imagesList = [];
            if(item.image_url){
                var images = JSON.parse(item.image_url);
                imagesList = images.map((url,index)=>{
                    return (
                        <div key={index}>
                            <img src={url} alt="内容图"/>
                        </div>
                    )
                })
            }

            let create_time = item.create_time ? moment(item.create_time).format(this.dateFormat) : '';
            
            return (
                <div className="QA_item_view" key={item.id}>
                        <div className="user_info">
                            <div className="user_avator"><img src={ item.photo_url || icon_default_avator } alt="用户头像"/></div>
                            <div className="user_nickname">{ item.nick_name }</div>
                            <div className="user_follow">
                                {
                                    item.follow === true ? 
                                    (
                                        <a className="ok_follow" onClick={()=>{
                                            this.GoToFollow(item);
                                        }}>已关注</a>
                                    )
                                    :
                                    (
                                        <a onClick={()=>{
                                            this.GoToFollow(item);
                                        }}>＋关注</a>
                                    )
                                }
                            </div>
                        </div>
                        <div className="QA_content">{ item.content }</div>
                        <div className="QA_images">{imagesList}</div>
                        <div className="QA_desc">
                            <div><span>{ create_time }</span></div>
                            <div className="QA_desc_btn">
                                <span>{ item.read_total } 阅读</span>
                                <span>{ item.comment_total } 回复</span>
                            </div>
                        </div>
                    </div>

            )
        }); 

        return (
            <div className="friend_circle_index">
                <div className="friend_header_view">
                    <div className="friend_header_title">圈子</div>
                    <div className="friend_header_icon" onClick={ this.SelectMojar }>
                        <img src={icon_switch} alt="切换专业"/>
                    </div>
                </div>

                <div className="friend_body_view" onScroll={ this.ScrollHandler }>
                    {
                        ListItems
                    }
                    {/* <div className="QA_item_view">
                        <div className="user_info">
                            <div className="user_avator"><img src={icon_avator} alt=""/></div>
                            <div className="user_nickname">璐璐</div>
                            <div className="user_follow"><a>＋关注</a></div>
                        </div>
                        <div className="QA_content">考点定位用起来很方便，不然我这种学渣每次都要翻 书好久，个人也很喜欢每日一练，积少成多。</div>
                        <div className="QA_images">
                            <div><img src={icon_defaultImage} alt=""/></div>
                            <div><img src={icon_defaultImage} alt=""/></div>
                            <div><img src={icon_defaultImage} alt=""/></div>
                            <div></div>
                        </div>
                        <div className="QA_desc">
                            <div><span>2018-07-23 13:50:36</span></div>
                            <div className="QA_desc_btn">
                                <span>5阅读</span>
                                <span>1回复</span>
                            </div>
                        </div>
                    </div> */}
                    {
                        this.state.hasMore ?(
                            <div className="list_view_footer" onClick={ this.onRefresh }>点击或下拉加载数据...</div>
                        ):(
                            <div className="list_view_footer">暂无更多数据...</div>
                        )
                    }
                    
                </div>

                <div 
                    className={ this.state.isExpendBtn ? "friend_suspension_view active":"friend_suspension_view"} 
                    onClick={ this.OpenBtnGroup }
                ></div>
                <div className={ this.state.isExpendBtn ? "friend_suspension_hear active":"friend_suspension_hear"}></div>
                <div 
                    className={ this.state.isExpendBtn ? "friend_suspension_edit active":"friend_suspension_edit"}
                    onClick={ this.AddNewPost }
                ></div>

                {/* <div className="add_layer">

                </div> */}
            </div>
        )
    }
}

export default FriendCircle;