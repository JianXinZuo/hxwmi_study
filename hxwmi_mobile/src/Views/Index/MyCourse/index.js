import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import './index.less';
import { Tabs,Toast } from 'antd-mobile';
import {GetMyCourseList_Async} from '../../../Services';

const tabs = [
    { title: <span>公开课</span>, type:'1' },
    { title: <span>专题班</span>, type:'2' },
    { title: <span>系统班</span>, type:'3' },
    { title: <span>直播课</span>, type:'4' },
];

@withRouter
class MyCourse extends Component {

    constructor(props) {
        super(props);

        //定义分页信息
        this.pageNo = 0;

        this.state ={
            course_type: '1',
            initialPage:0,
            isLoading:false,
            loadingSecond:0,
            hasMore: true,
            list:[],
        }
    }

    async componentDidMount(){
        let res = await this.GetCourseList();
        console.log(res);
        if(res){
            this.setState({
                list:[ ...this.state.list, ...res]
            });
        }
    }

    GetCourseList = async ()=>{
        this.pageNo++;

        let params = {
            user_token: localStorage.getItem('accessToken') || "",
            show_type: this.state.course_type,  //显示类型 1:公开课   2:专题班   3:系统班  4:直播课
            page: this.pageNo,
            limit:'5'
        }

        this.setState({
            isLoading:true,
        });

        Toast.loading("Loading...", 0, ()=>{}, true);
        let res = await GetMyCourseList_Async(JSON.stringify(params));
        Toast.hide();
        this.setState({
            isLoading:false,
        });

        if(res && res.code === "200" && res.msg === "success"){
            return res.data;
        }
        
        return null;
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
        if((position.height - position.top <= dom.clientHeight) && (this.state.isLoading === false)){
            await this.onRefresh();
        }
    }

    //刷新加载数据
    onRefresh = async ()=>{

        let res = await this.GetCourseList();
        console.log(res);

        if(!res){
            this.props.history.push('/login');
        }

        if(res && res.length === 0){
            //暂无更多数据
            this.setState({
                hasMore:false
            });
        }else{
            res && this.setState({
                list:[ ...this.state.list, ...res],
                hasMore:true
            });
        }
    }
    
    render() {
        let footerText = null;
        const { list, hasMore }  = this.state;

        const CourseItems = list && list.map((item)=>{
            return (
                <div className="my_course_item" key={item.id}>
                    <div className="my_course_item_left">
                        <img src={ item.cover || "" } alt="封面图" />
                    </div>
                    <div className="my_course_item_center">
                        <div className="title">{ item.name }</div>
                        <div className="teacher">{ item.teacher }老师</div>
                    </div>
                    <div className="my_course_item_right">
                        <a onClick={()=>{
                            this.props.history.push('/course_detail/' + item.id+"/1");
                        }}>立即学习</a>
                    </div>
                </div>
            )
        })

        if(hasMore){
            footerText = "点击或下拉加载数据...";
        }else{
            footerText ="暂无更多数据";
        }
        
        return (
            <div className="my_Course_index">

                <div className="view_header">
                    <div className="view_header_conent" style={ this.props.style }>
                        <div className="header_title">我的课程</div>
                    </div>
                </div>

                <div className="view_body">

                    <Tabs
                        animated
                        tabs={tabs}
                        initialPage={ this.state.initialPage }
                        onChange={async (tab)=>{
                            console.log(tab); 
                            this.pageNo = 0;
                            this.setState({
                                course_type: tab.type,
                                list:[],
                                hasMore:true
                            }, async ()=>{
                               await this.onRefresh();
                            });
                        }}
                        onTabClick={(tab,index) => {
                            this.setState({
                                initialPage:index
                            });
                        }}
                    >
                        <div className="course_tab_item" onScroll={ this.ScrollHandler }>
                            { CourseItems }
                            {/* <div className="my_course_item">
                                <div className="my_course_item_left">
                                    <img src="http://file.wm319.com/public/others/7032e45bdef34394a367163595efe999.jpeg" alt="第一章 会计概述" />
                                </div>
                                <div className="my_course_item_center">
                                    <div className="title">第一章 会计概述</div>
                                    <div className="teacher">史晓娟老师</div>
                                </div>
                                <div className="my_course_item_right">
                                    <a>立即学习</a>
                                </div>
                            </div> */}

                            <div className="mycourse_listview_footer" 
                                onClick={ this.onRefresh }
                            >{ footerText }</div>

                        </div>

                        <div className="course_tab_item">
                            {CourseItems}

                            <div className="mycourse_listview_footer" 
                                onClick={ this.onRefresh }
                            >{ footerText }</div>
                        </div>

                        <div className="course_tab_item">
                            {CourseItems}
                            <div className="mycourse_listview_footer" 
                                onClick={ this.onRefresh }
                            >{ footerText }</div>
                        </div>

                        <div className="course_tab_item">
                            {CourseItems}
                            <div className="mycourse_listview_footer" 
                                onClick={ this.onRefresh }
                            >{ footerText }</div>
                        </div>
                    </Tabs>

                </div>
            </div>
        )
    }
}


export default MyCourse;