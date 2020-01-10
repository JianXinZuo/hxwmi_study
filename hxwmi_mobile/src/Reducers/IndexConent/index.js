import actionType from '../../Actions/ActionType'
import {
    MyCarousel, 
    HotNews,
    CourseType,
    PublicCourse,
    TrainingCourse,
    SystemCourse,
    GoodBook,
    LiveCourse
} from '../../Components';

const initState ={
    list:{
        rows:[
            {
                type: MyCarousel,      //跑马灯
                WhiteSpace:true,
                name:'MyCarousel',
                list:[
                    {
                        article_author: "沃米小编",
                        article_title: " 初级会计职称考试在哪里报名？是网上还是现场？ ",
                        article_url: "http://brace.wm319.com/wap/arti_Dp.html",
                        color_number: "#95bbcc",
                        create_time: 1575009394000,
                        file_path: "http://file.wm319.com/public/images/11d86d4af79c4058a6c7039fa1d52eb6.png",
                        id: 626,
                    },
                    {
                        article_author: "沃米小编",
                        article_title: "初级会计师持证人数曝光！再不考就晚了！ ",
                        article_url: "http://brace.wm319.com/wap/arti_Du.html",
                        color_number: "#556d83",
                        create_time: 1574644257000,
                        file_path: "http://file.wm319.com/public/images/640703ff83504fa4ba444e1a912badfe.png",
                        id: 583,
                    },
                    {
                        article_author: "沃米小编",
                        article_title: "如何有效备考2020初级会计？",
                        article_url: "http://brace.wm319.com/wap/arti_DH.html",
                        color_number: "#7fc1e1",
                        create_time: 1574059780000,
                        file_path: "http://file.wm319.com/public/images/5d9f2f4d05084fb08cc20e33622f2e19.png",
                        id: 579,
                    }
                ],
                apiKey:'tops',
            },
            {
                type: HotNews,     //热门头条
                WhiteSpace:false,
                name:'HotNews',
                list:[
                    {
                        article_author: "沃米小编",
                        article_title: "官宣！2019初级会计考试系列图书发货时间",
                        article_url: "http://brace.wm319.com/wap/arti_nu.html",
                        id: 142,
                    },
                    {
                        article_author: "沃米小编",
                        article_title: "国务院会议:延续跨境电商零售进口政策",
                        article_url: "http://brace.wm319.com/wap/arti_Ca.html",
                        id: 83,
                    }
                ],
                apiKey:'banners',
            },
            {
                type: CourseType,      //课程类别
                WhiteSpace:false,
                name:'CourseType',
                list:[],
                apiKey:null,
            },
            {
                type: PublicCourse,      //公开课
                WhiteSpace:true,
                name:'PublicCourse',
                list:[
                    {
                        charge: 0,
                        cover: "http://file.wm319.com/public/others/7032e45bdef34394a367163595efe999.jpeg",
                        end_time: 1597939200000,
                        id: 100179,
                        mostBuy: 1000,
                        name: "第一章 会计概述",
                        purchased: 1065,
                        show_type: 1,
                        show_type_name: "公开课",
                        start_time: 1566316800000,
                        studyCount: 1065,
                        subject_id: 557,
                        teacher: "史晓娟老师",
                    },{
                        charge: 0,
                        cover: "http://file.wm319.com/public/others/27a6ae72e44c43169af59b3a6fa381a6.jpeg",
                        end_time: 1597939200000,
                        id: 100180,
                        mostBuy: 1000,
                        name: "第二章 资产",
                        purchased: 508,
                        show_type: 1,
                        show_type_name: "公开课",
                        start_time: 1566316800000,
                        studyCount: 508,
                        subject_id: 557,
                        teacher: "史晓娟老师",
                    },{
                        charge: 0,
                        cover: "http://file.wm319.com/public/others/a53a922c62d14ec4bfaddef13135b022.jpeg",
                        end_time: 1597939200000,
                        id: 100187,
                        mostBuy: 1000,
                        name: "第一章 总论",
                        purchased: 434,
                        show_type: 1,
                        show_type_name: "公开课",
                        start_time: 1566316800000,
                        studyCount: 434,
                        subject_id: 557,
                        teacher: "赵川、盛英会老师",
                    }
                ],
                apiKey:'combinFeature_GKK',
            },
            {
                type: LiveCourse,      //直播课
                WhiteSpace:true,
                name:'LiveCourse',
                list:[],
                apiKey:'combinFeature_ZBK',
            },
            {
                type: TrainingCourse,      //专题训练班
                WhiteSpace:true,
                name:'TrainingCourse',
                list:[],
                apiKey:'combinFeature_ZTB',
            },
            {
                type: SystemCourse,      //全程系统班
                WhiteSpace:true,
                name:'SystemCourse',
                list:[],
                apiKey:'combinFeature_XTB',
            },
            {
                type: GoodBook,      //好书推荐
                WhiteSpace:true,
                name:'GoodBook',
                list:[],
                apiKey:'goods',
            },
        ]
    },
    isLoading:false,
    errMsg:''
}

export default (state =initState, action)=>{
    switch(action.type){
        case actionType.START_FETCH_INDEX:
            return {
                ...state,
                isLoading:true
            }
        case actionType.FETCH_INDEX_SUCCESS:
            // console.log(action.payload.data);
            let res = action.payload.data;

            let result = {
                ...state,
                isLoading: false
            }
            result.list.rows.forEach(item => {
                // console.log(item);
                if(item.apiKey){

                    if(res && res[item.apiKey]){
                        item.list = res[item.apiKey]
                    }
                }
            });

            // console.log('最终结果：', result);

            return result;
        case actionType.FETCH_INDEX_FAILED:
            return {
                ...state,
                isLoading: false,
                errMsg:'网络请求出错'
            }
        default:
            return state;
    }
}