import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import { Toast, Tabs, Icon, Accordion, List } from 'antd-mobile';
import { ViewHeader } from '../../Components';
import moment from 'moment';
import './index.less';
import icon_collection from './images/icon_collection.png';
import icon_not_collection from './images/icon_not_collection.png';
import icon_customer_service from './images/icon_customer_service.png';
import icon_time from './images/icon_time.png';
import icon_user from './images/icon_user.png';
import icon_vip from './images/icon_vip.png';
import icon_teachingmaterial from './images/icon_teachingmaterial.png';
import icon_question_bank from './images/icon_question_bank.png';
import icon_gift from './images/icon_gift.png';
import icon_heart from './images/icon_heart.png';
import icon_teacher from './images/icon_teacher.png';
import icon_ellipse from './images/icon_ellipse.png';
import icon_lock from './images/icon_lock.png';

import { 
    GetCourseDetail_Async,
    GetCourseDetailChapterList_Async,
    GetCourseDetailLessonList_Async,
} from '../../Services';

const CustomerServiceJSON={
    
    'item_1':{
        txt:'专属学习礼包',
        icon:icon_gift,
    },
    'item_2':{
        txt:'Vip课程',
        icon:icon_vip,
    },
    'item_3':{
        txt:'贴心服务',
        icon:icon_heart,
    },
    'item_4':{
        txt:'全方位督学服务',
        icon:icon_vip,
    },
    'item_5':{
        txt:'名师授课',
        icon:icon_teacher,
    },
    'item_6':{
        txt:'教材',
        icon:icon_teachingmaterial,
    },
    'item_7':{
        txt:'题库',
        icon:icon_question_bank,
    },
}

const tabs = [
    { title: <span>课程介绍</span> },
    { title: <span>课程安排</span> },
    { title: <span>讲师介绍</span> },
];

@withRouter
class CourseDetail extends Component {

    constructor(props) {
        super(props);
        
        //定义分页信息
        this.pageNo = 0;
        this.dateFormat = 'YYYY-MM-DD',

        this.state = {
            lock:false,
            currentcourseType:'',
            courseTypeList:[],
            list:[],
            OpenPage:false,
            refreshing: true,
            isLoading: true,
            height: document.documentElement.clientHeight,
            useBodyScroll: false,
            hasMore: true,
            is_running:false,
            is_collection: false,
            cover:'http://file.wm319.com/public/others/7032e45bdef34394a367163595efe999.jpeg',
            charge: 0,
            name: '',
            intro: '',
            studyCount: 0,
            start_time: new Date(),
            end_time: new Date(),
            show_type: 1,
            price:0,
            mostBuy: 0,
            label: '',
            course_introduction: '',
            is_fixed: false,
            initialPage:1,
            isOpenTitlePanel:false,
            chapterList: [],
            currentChapter: null,
            lessonList:[],
            currentLesson:null,
        }
    }
    
    async componentDidMount(){
        console.log(this.props);
        Toast.loading("Loading...", 2, ()=>{}, true);

        setTimeout(() => {
            this.setState({
                OpenPage:true
            });
        }, 0);

        let res = await this.GetDetail_Async();

        console.log('获取的数据:', res);
        
        this.setState({
            id: res.id,
            cover: res.cover || '',
            charge: res.charge || 0,
            name: res.name || '',
            intro: res.intro || '',
            studyCount: res.studyCount || 0,
            start_time: res.start_time || new Date(),
            end_time: res.end_time || new Date(),
            show_type: res.show_type || 1,
            price: res.price || 0,
            mostBuy: res.mostBuy || 0,
            label: res.label || '',
            course_introduction: res.brief || '', //课程介绍
            courseTypeList: res.combinBook_s || [], //课程类型列表
            currentcourseType: res.combinBook_s[0]
        })

        if(res && res.combinBook_s && res.combinBook_s.length >0){
 
            let params = {
                "combin_book_type": res.combinBook_s[0].combinBookType,  //课程内容类型  1视频 2直播 3自建视频
                "cas_id": res.combinBook_s[0].cas_id,
                "user_token": localStorage.getItem('accessToken')|| "",
            }

            let chapterList = await this.GetChapterList_Async(params);
            
            this.setState({
                chapterList: chapterList,
                currentChapter:chapterList[0]
            });
            console.log('获取章的列表:', chapterList);

            if(chapterList && chapterList.length >0){

                // console.log(res);
                let params = {
                    "combin_chapter_id": chapterList[0].id,
                    "combin_book_type": res.combinBook_s[0].combinBookType,  
                    "combin_id": this.props.match.params.id || '',
                    "user_token": localStorage.getItem('accessToken') || "",
                }

                let lessonList = await this.GetLessonList_Async(params);
                this.setState({
                    lessonList:lessonList
                })
                console.log('获取节的列表:', lessonList);
            }
        }
        
    }

    async GetDetail_Async(){  //请求数据的方法

        let params = {  
            "combin_id": this.props.match.params.id || "",
            "user_token": localStorage.getItem('accessToken') || "",
        }

        let res = await GetCourseDetail_Async(JSON.stringify(params));

        if(res && res.code === "200" && res.msg === "success"){
            return res.data;
        }
        
        return null;
    }

    //获取章的列表
    async GetChapterList_Async(params){

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

    GoToIndex = async ()=>{
        this.setState({
            OpenPage:false
        });

        setTimeout(() => {
            this.props.history.push('/index');
        }, 690);
    }

    GoToCustomerService = ()=>{
        window.open('https://tb.53kf.com/code/client/10192515/1');
    }

    ChangeCollection = ()=>{
        this.setState({
            is_collection: !this.state.is_collection
        });
    }

    OpenTitlePanel = ()=>{
        
        if(!this.state.isOpenTitlePanel){
            this.setState({
                isOpenTitlePanel:true
            });

            setTimeout(() => {
                let domId = `course_type_item_${this.state.currentcourseType.id}`;
                document.getElementById(domId).scrollIntoView();
            }, 100);
        }
    }

    SelectCourseType = async (obj)=>{

        if(this.state.isOpenTitlePanel){

            this.setState({
                currentcourseType: obj,
                isOpenTitlePanel:false
            });

            console.log(obj);

            let params = {
                "combin_book_type": obj.combinBookType,  //课程内容类型  1视频 2直播 3自建视频
                "cas_id": obj.cas_id,
                "user_token": localStorage.getItem('accessToken')|| "",
            }

            let chapterList = await this.GetChapterList_Async(params);
            
            this.setState({
                chapterList: chapterList,
                currentChapter:chapterList[0]
            });
            console.log('获取章的列表:', chapterList);

            
        }
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
            "combin_book_type": this.state.currentcourseType.combinBookType,  
            "combin_id": this.props.match.params.id || '',
            "user_token": localStorage.getItem('accessToken')||"",
        }

        let lessonList = await this.GetLessonList_Async(params);
        this.setState({
            lessonList:lessonList
        })
        console.log('获取节的列表:', lessonList);
    }

    //购买课程
    ToBuyCourse = ()=>{

    }

    //跳转到课程详情页
    ToCourseDetailList = (obj)=>{
        
        const url = `/course_player/${this.props.match.params.id}/${this.state.currentcourseType.combinBookType}/${ this.state.currentcourseType.cas_id}`; // :id/type:
        this.props.history.push(url);
    }

    render() {
        const start_time = this.state.start_time ? moment(this.state.start_time).format(this.dateFormat) : '';
        const end_time =  this.state.end_time ? moment(this.state.end_time).format(this.dateFormat) : '';

        let course_desc_price = null;

        if(this.state.show_type === 1){
            course_desc_price = (
                <div className="course_desc_price">
                    <div className="course_desc_price_left">
                        <div className="icon_user"><img src={icon_user} alt=""/></div>
                        <div className="icon_txt">限购：{ this.state.mostBuy || 0 }人</div>
                    </div>
                    <div className="course_desc_price_right">￥0.00</div>
                </div>)
        }else{
            course_desc_price = (
                <div className="course_desc_price">
                    <div className="course_desc_price_left">
                        <div className="icon_user"><img src={icon_user} alt=""/></div>
                        <div className="icon_txt">限购：{ this.state.mostBuy || 0 }人</div>
                    </div>
                    <div className="course_desc_price_right">￥{ this.state.price.toFixed(2) }</div>
                </div>)
        }

        let detail_footer_left = null;
        let detail_footer_right = null;

        //判断底部菜单
        if(this.state.show_type === 1){
            
            if(this.state.charge === 2){

                detail_footer_left = (
                    <div className="detail_footer_left">
                        <div className="price">已报名</div>
                        <div className="online_number">在学{ this.state.studyCount }人</div>
                    </div>  
                )

                detail_footer_right = <div className="detail_footer_right">进入课程</div>
            }else{

                detail_footer_left = (
                    <div className="detail_footer_left">
                        <div className="price">免费</div>
                        <div className="online_number">在学{ this.state.studyCount }人</div>
                    </div>  
                )
                detail_footer_right = <div className="detail_footer_right">免费获取</div>
            }

        }else{

            if(this.state.charge === 2){
                detail_footer_left = (
                    <div className="detail_footer_left">
                        <div className="price">已购买</div>
                        <div className="online_number">在学{ this.state.studyCount }人</div>
                    </div>  
                )

                detail_footer_right = <div className="detail_footer_right">进入课程</div>
                
            }else if(this.state.charge === 1){
                detail_footer_left = (
                    <div className="detail_footer_left">
                        <div className="price">{ `￥${this.state.price.toFixed(2)}` }</div>
                        <div className="online_number">在学{ this.state.studyCount }人</div>
                    </div>  
                )

                detail_footer_right = <div className="detail_footer_right">立即购买</div>

            }else{
                detail_footer_left = (
                    <div className="detail_footer_left">
                        <div className="price">免费</div>
                        <div className="online_number">在学{ this.state.studyCount }人</div>
                    </div>  
                )
                detail_footer_right = <div className="detail_footer_right">免费获取</div>
            }
        }

        let labelItems = null;
        if(this.state.label){
            labelItems = (
                <div className="course_services">
                    <div className="course_services_title">特色服务</div>
                    <div className="course_services_container">
                        {
                            this.state.label.split(',').map((item)=>{
                                return (
                                        <div className="course_services_item" key={item}>
                                            <div className="item_icon">
                                                <img src={ CustomerServiceJSON['item_' + item].icon } alt=""/>
                                                </div>
                                            <div className="item_txt">{ CustomerServiceJSON['item_' + item].txt }</div>
                                        </div>
                                )
                            })
                        }
                    </div>
                </div>
            )
        }

        //课程类型的子项
        const course_type_list = this.state.courseTypeList.map((item)=>{
            return (
                <div 
                    className={ this.state.currentcourseType.id === item.id ? "course_type_item active": "course_type_item"} 
                    key={item.id} 
                    id={ `course_type_item_${ item.id }`}
                    onClick= { ()=>{ 
                        this.SelectCourseType(item) 
                    } }
                >{ item.name }</div>
            )
        });

        const course_type_title = this.state.courseTypeList && this.state.courseTypeList.length >0 ? (
            <div className="course_type_title" onClick={ this.OpenTitlePanel }>
                <div className="course_type_title_text">{ this.state.currentcourseType.name }</div>
                <Icon type={ this.state.isOpenTitlePanel ? "up": "down" } />
            </div>
        ): null;

        // 课程子节内容
        let LessonList = (
            <List className="my-list">
                {
                    this.state.lessonList.map(item=>{

                        if(this.state.charge === 2){
                            return (
                                <List.Item key={item.id} onClick={()=>{
                                    console.log('点击查看详情');
                                    this.ToCourseDetailList();
                                }}>
                                    <div className="course_itemview" title={item.name}>
                                        <div className="course_item_icon"><img src={icon_ellipse} alt=""/></div>
                                        <div>{ item.name }</div> 
                                    </div>
                                </List.Item>
                            )
                        }else{
                            return (
                                <List.Item key={item.id} onClick={()=>{
                                    console.log('你还未购买课程，点击后购买课程');
                                    this.ToCourseDetailList(item);//this.ToBuyCourse();
                                }}>
                                    <div className="course_itemview" title={item.name}>
                                        <div className="course_item_icon"><img src={icon_lock} alt=""/></div>
                                        <div className="course_item_txt">{ item.name }</div> 
                                    </div>
                                </List.Item>
                            )
                        }
                    })
                }
            </List>
        )

        return (
        <div className={ this.state.OpenPage ? "course_detail_index active" : "course_detail_index" }>

            {/* 头部导航条信息 */}
            <ViewHeader title="课程详情" onClick={ this.GoToIndex } style={{ borderBottom:'solid 1px #e1e1e1'}} />

            {/* 详细信息 */}
            <div className="course_detail_body">

                {/* 封面图 */}
                <div className="course_detail_header_image" >
                    <img src={this.state.cover} alt=""/>
                </div>
                
                {/* 课程包详细信息 */}
                <div className="course_detail_header_desc">
                    <div className="course_title">{ this.state.name }</div>
                    <div className="course_conent">{ this.state.intro }</div>
                    <div className="course_time">
                        <div className="icon_time"><img src={icon_time} alt=""/></div>
                        <div className="text">课程时间：{ start_time } 至 { end_time }</div>
                    </div>
                    { course_desc_price }
                </div>

                {
                    // 特色服务
                    labelItems
                }


                <div className="course_detail_center" onScroll={ this.Center_ScrollHandler }>
                    <Tabs
                        animated
                        tabs={tabs}
                        initialPage={ this.state.initialPage }
                        onTabClick={(tab, index) => { 
                            this.setState({
                                initialPage:index
                            });
                        }}
                    >

                        {/* 课程介绍 */}
                        <div className="course_tab_item">
                            <img src={ this.state.course_introduction } alt={ this.state.name }/>
                        </div>

                        <div className="course_tab_item">
                            {
                                // 课程类别
                                course_type_title
                            }
                            
                            {/* 课程章节列表 */}
                            <div className="course_listview">
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

                        {/* 讲师介绍 */}
                        <div className="course_tab_item">

                        </div>

                    </Tabs>
                </div>
            </div>

            {/* 底部显示信息 */}
            <div className="course_detail_footer">
                    {
                        detail_footer_left
                    }
                    <div className="detail_footer_center">
                        <div className="icon_item" onClick={ this.ChangeCollection }>
                            <div className="icon_img">
                                {
                                    this.state.is_collection 
                                    ? 
                                    <img src={icon_collection} alt=""/>
                                    :
                                    <img src={icon_not_collection} alt=""/>
                                }
                            </div>
                            <div className="icon_text">收藏</div>
                        </div>
                        <div className="icon_item" onClick={ this.GoToCustomerService }>
                            <div className="icon_img">
                                <img src={icon_customer_service} alt=""/>
                            </div>
                            <div className="icon_text">客服</div>
                        </div>
                    </div>
                    { 
                        detail_footer_right 
                    }
            </div>

            {/* 蒙板 */}
            <div 
                className={ this.state.isOpenTitlePanel ?"course_type_list_panel active": "course_type_list_panel"}
                onClick={ ()=>{
                    this.setState({
                        isOpenTitlePanel:false
                    });
                }}
            >
            </div>

            {/* 课程类型 */}
            <div className={ this.state.isOpenTitlePanel ?"course_type_list active": "course_type_list"}>
                { course_type_list }
            </div>

        </div>
        );
    }
}

export default CourseDetail;
