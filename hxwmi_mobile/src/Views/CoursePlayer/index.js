import React, { Component } from 'react';
import { ViewHeader } from '../../Components';
import './index.less';
import { withRouter } from 'react-router-dom';
import { Accordion, List,Toast } from 'antd-mobile';
import icon_ellipse from './images/icon_ellipse.png';

import { 
    GetCourseDetail_Async,
    GetCourseDetailChapterList_Async,
    GetCourseDetailLessonList_Async,
} from '../../Services';

@withRouter
class CoursePlayer extends Component {
    constructor(props) {
        super(props);
        this.state ={
            OpenPage:false,
            chapterList:[],
            lessonList:[],
            is_cover:true,
            currentLesson:null,
            currentVideoPath:'',
            id:'',
            cover:"",
            playstate:"play",
        }
    }
    
    async componentDidMount(){
        Toast.loading("Loading...", 2, ()=>{}, true);
        setTimeout(() => {
            this.setState({
                OpenPage:true
            });
        }, 0);

        let res_detail = await this.GetDetail_Async();
        console.log(res_detail);

        let res_chapter = await this.GetChapterList_Async();
        console.log(res_chapter);

        let params = {
            "combin_chapter_id": res_chapter[0].id,
            "combin_book_type": this.props.match.params.book_type,  
            "combin_id": this.props.match.params.id || '',
            "user_token": localStorage.getItem('accessToken')|| "",
        }

        let res_lesson = await this.GetLessonList_Async(params);
        console.log(res_lesson);

        this.setState({
            id: res_detail.id,
            cover: res_detail.cover,
            chapterList: res_chapter,
            lessonList: res_lesson,
            currentVideoPath: res_lesson[0].file_path
        });

        this.video.addEventListener('ended', (e)=> {
            console.log('视频播放完了')
            console.log(e);
            this.PalyerEnd();
        });
    }

    //获取详细信息
    async GetDetail_Async(){  

        let params = {  
            "combin_id": this.props.match.params.id || "",
            "user_token": localStorage.getItem('accessToken')|| "",
        }

        let res = await GetCourseDetail_Async(JSON.stringify(params));

        if(res && res.code === "200" && res.msg === "success"){
            return res.data;
        }
        
        return null;
    }

    //获取章的列表
    async GetChapterList_Async(){

        let params = {
            "combin_book_type": this.props.match.params.book_type,  //课程内容类型  1视频 2直播 3自建视频
            "cas_id": this.props.match.params.cas_id,
            "user_token": localStorage.getItem('accessToken')|| "",
        }

        let res = await GetCourseDetailChapterList_Async(JSON.stringify(params));

        if(res && res.code === "200" && res.msg === "success"){
            return res.data;
        }
        
        return null;
    }

    //获取节的列表
    async GetLessonList_Async(params) {

        let res = await GetCourseDetailLessonList_Async(JSON.stringify(params));

        if(res && res.code === "200" && res.msg === "success"){
            return res.data;
        }
        
        return null;
    }

    SelectChapter = async (id)=>{
        
        if(!id){
            this.setState({
                lessonList:[]
            });

            return;
        }

        let params = {
            "combin_chapter_id": id,
            "combin_book_type": this.props.match.params.book_type,  
            "combin_id": this.props.match.params.id || '',
            "user_token": localStorage.getItem('accessToken') || "",
        }

        let lessonList = await this.GetLessonList_Async(params);
        this.setState({
            lessonList:lessonList
        });

        console.log('获取节的列表:', lessonList);
    }

    //播放视频
    PlayerLesson = (item)=>{
        console.log(item);
        this.setState({
            is_cover:false,
            currentLesson:item,
            currentVideoPath: item.file_path
        });

        this.video.getAttribute('src') && this.video.play();
    }

    //返回上一步
    GoToIndex =()=>{
        this.setState({
            OpenPage:false
        });

        setTimeout(() => {
            this.props.history.goBack();
        }, 690);
    }

    PalyerVideo = ()=>{
        this.setState({
            is_cover:false,
        });
        this.video.getAttribute('src') && this.video.play();
    }

    render() {

        // 课程子节内容
        let LessonList = (
            <List className="my-list">
                {
                    this.state.lessonList.map(item=>{
                        return (
                            <List.Item 
                                key={item.id} 
                                onClick={()=>{
                                    this.PlayerLesson(item);
                                }}
                            >
                                <div className="course_itemview" title={item.name}>
                                    <div className="course_item_icon"><img src={icon_ellipse} alt=""/></div>
                                    <div className="course_item_txt">{ item.name }</div> 
                                </div>
                            </List.Item>
                        )
                    })
                }
            </List>
        )

        let play_window =null;
        if(this.state.is_cover){
            play_window = (
                <div className="model_windows">
                    <div className="model_windows_playbtn">
                        <div className="circle_inner_play" onClick={ this.PalyerVideo }></div>
                    </div>
                </div>
            )
        }

        return (
            <div className={ this.state.OpenPage ? "course_player_index active" : "course_player_index" }>
                {/* 头部导航条信息 */}
                <ViewHeader title="课程详情" onClick={ this.GoToIndex } style={{ borderBottom:'solid 1px #e1e1e1'}} />
                
                <div className="course_detail_header">

                    <video 
                        ref={el => this.video = el}
                        className="course_detail_header_player" 
                        src={ this.state.currentVideoPath } 
                        controls="controls"
                        style={{ display: this.state.is_cover ? "none" :"block" }}
                        
                    ></video>

                    <img src={ this.state.cover} alt="" style={{ display: this.state.is_cover ? "block" :"none" }}/>

                    {
                        play_window
                    }
                </div>

                <div className="course_list_title">课程目录</div>

                <div className="course_list_container">
                    <Accordion
                        defaultActiveKey="0" 
                        accordion 
                        className="my-accordion"
                        onChange={(id)=>{
                            console.log(id);
                            this.SelectChapter(id);
                        }}
                    >
                    {
                        this.state.chapterList.map((item)=>{
                            return (
                                <Accordion.Panel 
                                    key={item.id} 
                                    header={
                                        <div title={item.name}>{item.name}</div>
                                    }
                                >{ LessonList }</Accordion.Panel>
                            )
                        })
                    }
                    </Accordion>
                </div>
            </div>
        );
    }
} 

export default CoursePlayer;
