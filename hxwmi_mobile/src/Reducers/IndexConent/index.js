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
                list:[],
                apiKey:'tops',
            },
            {
                type: HotNews,     //热门头条
                WhiteSpace:false,
                name:'HotNews',
                list:[],
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
                list:[],
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
            console.log(action.payload.data);
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