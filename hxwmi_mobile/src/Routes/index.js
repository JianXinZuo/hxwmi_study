import {
    Login,
    NotFound,
    Index,
    IndexContent,
    MyCourse,
    Questions,
    FriendCircle,
    Home,
    SelectMajor,
    HotNews,
    PublicCourse,
    LiveCourse,
    SystemCourse,
    TrainingCourse,
    GoodBook,
    CourseDetail,
    CoursePlayer,

} from '../Views';

//一级页面
export const mainRouter = [
    {
        pathname:'/index',      //网站首页
        component: Index,
        title:'首页',
        exact: false,
    },{
        pathname:'/login',      //登录页面
        component: Login,
        title:'登录',
        exact: false,
    },{
        pathname:'/404',        //404页面
        component: NotFound,
        title:'未找到',
        exact: false,
    },{
        pathname:'/select_major',        //选择专业
        component: SelectMajor,
        title:'选择专业',
        exact: false,
    },{
        pathname:'/hotnews',        //热门头条
        component: HotNews,
        title:'热门头条',
        exact: false,
    },{
        
        pathname:'/public_course',        //公开课
        component: PublicCourse,
        title:'公开课',
        exact: false,
    },{
        
        pathname:'/live_course',        //直播课
        component: LiveCourse,
        title:'直播课',
        exact: false,
    },{
        
        pathname:'/system_course',        //全程系统班
        component: SystemCourse,
        title:'全程系统班',
        exact: false,
    },{
        
        pathname:'/training_course',        //专题训练班
        component: TrainingCourse,
        title:'专题训练班',
        exact: false, 
    },{
        
        pathname:'/good_book',        //商品列表
        component: GoodBook,
        title:'商品列表',
        exact: false,
    },{
        
        pathname:'/course_detail/:id/:type',        //课程详情页
        component: CourseDetail,
        title:'商品列表',
        exact: false,
    },{
        pathname:'/course_player/:id/:book_type/:cas_id',        //课程
        component: CoursePlayer,
        title:'商品列表',
        exact: false,
    }
    
    // {
    //     pathname:'/register',   //注册页面
    //     component: Register,
    //     title:'注册'
    // },{
    //     pathname:'/resetpassword',   //重置密码页面
    //     component: ResetPassword,
    //     title:'重置密码'
    // },
    
]

//二级页面
export const indexRouter = [
    {
        path:'/index/content',
        breadcrumbName:'首页',
        pathname:'/index/content',     //首页内容组件
        component: IndexContent,
        exact: true,
        selectedIcon:'iconfont icon-shouye',    //'https://zos.alipayobjects.com/rmsportal/IIRLrXXrFAhXVdhMWgUI.svg',
        defaultIcon:'iconfont icon-shouye' //'https://zos.alipayobjects.com/rmsportal/psUFoAMjkCcjqtUCNPxB.svg'
    },
    {
        path:'/index/mycourse',
        breadcrumbName:'我的课',
        pathname:'/index/mycourse',     //我的课程
        component: MyCourse,
        exact: true,
        selectedIcon:'iconfont icon-bofang3-copy', //'https://zos.alipayobjects.com/rmsportal/IIRLrXXrFAhXVdhMWgUI.svg',
        defaultIcon:'iconfont icon-bofang3' //'https://zos.alipayobjects.com/rmsportal/psUFoAMjkCcjqtUCNPxB.svg'
    },
    {
        path:'/index/questions',
        breadcrumbName:'题库',
        pathname:'/index/questions',     //题库
        component: Questions,
        exact: true,
        selectedIcon:'iconfont icon-icon-test-copy',   //'https://zos.alipayobjects.com/rmsportal/IIRLrXXrFAhXVdhMWgUI.svg',
        defaultIcon:'iconfont icon-icon-test'    //'https://zos.alipayobjects.com/rmsportal/psUFoAMjkCcjqtUCNPxB.svg'
    },
    {
        path:'/index/circle',
        breadcrumbName:'圈子',
        pathname:'/index/circle',     //圈子
        component: FriendCircle,
        exact: true,
        selectedIcon:'iconfont icon-iconfontquanzi-copy',    //'https://zos.alipayobjects.com/rmsportal/IIRLrXXrFAhXVdhMWgUI.svg',
        defaultIcon:'iconfont icon-iconfontquanzi' //'https://zos.alipayobjects.com/rmsportal/psUFoAMjkCcjqtUCNPxB.svg'
    },
    {
        path:'/index/home',
        breadcrumbName:'我的',
        pathname:'/index/home',     //我的
        component: Home,
        exact: true,
        selectedIcon:'iconfont icon-wodedangxuan-copy', //'https://zos.alipayobjects.com/rmsportal/IIRLrXXrFAhXVdhMWgUI.svg',
        defaultIcon:'iconfont icon-wodedangxuan' //'https://zos.alipayobjects.com/rmsportal/psUFoAMjkCcjqtUCNPxB.svg'
    },
]

// //三级页面
// export const homeRouter = [
//     {
//         pathname:'/index/home/collection',   //收藏
//         component:'',
//     },{
//         pathname:'/index/home/recommend',   //推荐
//         component:'',
//     },{
//         pathname:'/index/home/info',    //资料
//         component:'',
//     },{
//         pathname:'/index/home/comment',   //评论
//         component:'',
//     },
// ]

// //用户个人中心
// export const userRouter = [
//     {
//         pathname:'/index/user/collection',   //我的收藏
//         component:'',
//     },{
//         pathname:'/index/user/work',    //我的作品
//         component:'',
//     },{
//         pathname:'/index/user/experience',  //我的经验
//         component:'',
//     },{
//         pathname:'/index/user/follow',  //我的关注
//         component:'',
//     },{
//         pathname:'/index/user/info',    //我的资料
//         component:'',
//     },{
//         pathname:'/index/user/setting',    //用户设置
//         component:'',
//     },{
//         pathname:'/index/user/resume',    //我的简历
//         component:'',
//     }
// ];