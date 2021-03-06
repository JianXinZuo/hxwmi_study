
// import Loadable from 'react-loadable';    //懒加载配置
import { Loading } from '../Components';    //Loading 通用组件
import Loadable from './MyLoaderPlugin';    //引入自己手写的Lazy懒加载器, 简易的懒加载器


// const Login = Loadable({
//     loader:()=> import('./Login'),
//     loading: Loading
// });



// const Register = Loadable({
//     loader:()=> import('./Register'),
//     loading: Loading
// });

// const ResetPassword = Loadable({
//     loader:()=> import('./ResetPassword'),
//     loading: Loading
// });

// const Home = Loadable({
//     loader:()=> import('./Home'),
//     loading: Loading
// });

// const User = Loadable({
//     loader:()=> import('./User'),
//     loading: Loading
// });

// const About = Loadable({
//     loader:()=> import('./About'),
//     loading:Loading
// });

// const Course = Loadable({
//     loader:()=> import('./Course'),
//     loading:Loading
// });

const Index = Loadable({
    loader:async ()=> import('./Index/index'),
    loading:Loading
});

//首页
const IndexContent = Loadable({
    loader: ()=> import('./Index/Content'),
    loading:Loading
});

//我的课
const MyCourse = Loadable({
    loader:()=> import('./Index/MyCourse'),
    loading:Loading
});

//题库
const Questions = Loadable({
    loader:()=> import('./Index/Questions'),
    loading:Loading
});

//圈子问答
const FriendCircle = Loadable({
    loader:()=> import('./Index/FriendCircle'),
    loading:Loading
});

//我的问答页面
const MyQuestionsAnswers = Loadable({
    loader:()=> import('./MyQuestionsAnswers'),
    loading:Loading
});

//我的积分页面
const MyIntegral = Loadable({
    loader:()=> import('./MyIntegral'),
    loading:Loading
});

//积分详情
const IntegralDetail = Loadable({
    loader:()=> import('./IntegralDetail'),
    loading:Loading
});

//我的
const Home = Loadable({
    loader:()=> import('./Index/Home'),
    loading:Loading
});

//404页面
const NotFound = Loadable({
    loader:()=> import('./NotFound/index'),
    loading: Loading
});

//登录
const Login = Loadable({
    loader:()=> import('./Login'),
    loading: Loading
});

//注册
const Register = Loadable({
    loader:()=> import('./Register'),
    loading: Loading
});

//用户使用手册
const RegisterAgreement = Loadable({
    loader:()=> import('./RegisterAgreement'),
    loading: Loading
});

//选择专业
const SelectMajor = Loadable({
    loader:()=> import('./SelectMajor'),
    loading: Loading
});

//更多热门头条
const HotNews = Loadable({
    loader:()=> import('./HotNews'),
    loading: Loading
});

//公开课页面
const PublicCourse = Loadable({
    loader:()=> import('./PublicCourse'),
    loading: Loading
});

//直播课
const LiveCourse = Loadable({
    loader:()=> import('./LiveCourse'),
    loading: Loading
});

//系统班
const SystemCourse = Loadable({
    loader:()=> import('./SystemCourse'),
    loading: Loading
});

//专题班
const TrainingCourse = Loadable({
    loader:()=> import('./TrainingCourse'),
    loading: Loading
});

//更多好书
const GoodBook = Loadable({
    loader:()=> import('./GoodBook'),
    loading: Loading
});

//课程详情
const CourseDetail = Loadable({
    loader:()=> import('./CourseDetail'),
    loading: Loading
}); 

//课程播放页面
const CoursePlayer = Loadable({
    loader:()=> import('./CoursePlayer'),
    loading: Loading
}); 

export{
    Login,
    Register,
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
    RegisterAgreement,
    MyQuestionsAnswers,
    MyIntegral,
    IntegralDetail,
}