
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
    loader:()=> import('./Index/index'),
    loading:Loading
});

//首页
const IndexContent = Loadable({
    loader:()=> import('./Index/Content'),
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

//我的
const Home = Loadable({
    loader:()=> import('./Index/Home'),
    loading:Loading
});

const NotFound = Loadable({
    loader:()=> import('./NotFound/index'),
    loading: Loading
});

const Login = Loadable({
    loader:()=> import('./Login/index'),
    loading: Loading
});


export{
    Login,
    NotFound,
    Index,
    IndexContent,
    MyCourse,
    Questions,
    FriendCircle,
    Home
}