import React, { Component } from 'react';
import './index.less';
import moment from 'moment';
import icon_switch from './images/icon_switch.png';
import icon_default_avator from './images/icon_defaultImage.jpg';
import { withRouter } from 'react-router-dom';
import {  GetQAList_Async, ToFollow_Async, AddNewPost_Async } from '../../../Services';
import {
    TextareaItem,
    ImagePicker,
    WingBlank,
    Toast,

 } from 'antd-mobile';

@withRouter
class FriendCircle extends Component {

    constructor(props) {
        super(props);

        this.pageNo = 0;
        this.dateFormat = 'YYYY-MM-DD HH:mm:ss';

        this.state ={
            files:[],
            list:[],
            isExpendBtn:false,
            isLoading:false,
            hasMore: true,
            openEditBox:false,
            edit_content:"",
        }
    }

    async componentDidMount(){
        Toast.loading("Loading...", 2, ()=>{}, true);
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
    AddNewPost =async ()=>{
        console.log(this.state.edit_content);
        let params = {
            user_token: localStorage.getItem('accessToken') || "",
            subject_id: localStorage.getItem('SubMajor_Id') || "",
            content: this.state.edit_content,
        }
        const data = new FormData();
        const { files } =  this.state;

        files && files.forEach((item)=>{
            data.append("files", item.file);
        });

        let res = await AddNewPost_Async(JSON.stringify(params),data);
        console.log(res);
        
        if(res.code === "200" && res.msg === "success"){

            Toast.success('发表成功！', 2, () => {

                this.setState({
                    list:[ res.data, ...this.state.list],
                    openEditBox:false
                },()=>{
                    this.refs.friend_body_view.scrollTop = 0
                });
            });
        }else{

            if(res.code === "300" && res.msg === "用户标识失效,请重新登录！"){
                
                Toast.info('登录已过期，请重新登录', 2, () => {
                    this.setState({
                        openEditBox:false
                    });
                    this.props.history.push('/login');
                });

            }else{

            }
        }
    }

    onFileChange = (files, type, index) => {
        console.log(files, type, index);
        this.setState({
            files
        });
    }

    render() {
        const { list, files } = this.state;
        const ListItems = list && list.map((item)=>{
            
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

                <div className="friend_body_view" ref="friend_body_view" onScroll={ this.ScrollHandler }>
                    {
                        ListItems
                    }
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
                <div 
                    className={ this.state.isExpendBtn ? "friend_suspension_hear active":"friend_suspension_hear"}
                    onClick={ ()=>{
                        window.open('https://tb.53kf.com/code/client/10192515/1');
                    }}
                ></div>
                <div 
                    className={ this.state.isExpendBtn ? "friend_suspension_edit active":"friend_suspension_edit"}
                    onClick={ ()=>{
                        this.setState({
                            openEditBox:true
                        });
                    } }
                ></div>

                <div className={ this.state.openEditBox ? "add_layer active":"add_layer"}>
                    <div className="layer_header_view">
                        <div 
                            className="layer_header_cancel" 
                            onClick={()=>{
                                this.setState({
                                    edit_content:'',
                                    openEditBox:false
                                });
                                console.log(this.refs);
                        }}>取消</div>

                        <div className="layer_header_yes" onClick={ this.AddNewPost }>发表</div>
                    </div>

                    <div className="layer_header_conent">
                        <WingBlank>
                            <TextareaItem
                                value={ this.state.edit_content }
                                onChange={(txt)=>{
                                    this.setState({edit_content:txt})
                                }}
                                placeholder="输入想要提出的问题..."
                                rows={6}
                                count={10000}
                            />
                        
                            <ImagePicker
                                files={files}
                                onChange={this.onFileChange}
                                onImageClick={(index, fs) => console.log(index, fs)}
                                selectable={true}
                                multiple={true}
                            />
                        </WingBlank> 
                    </div>
                </div>
            </div>
        )
    }
}

export default FriendCircle;