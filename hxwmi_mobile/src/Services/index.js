
import { Axios } from './api_config';

const Axios_Get_IndexContent = async (params)=>{
    return (
        await Axios.PostHeader(`/piece/base/index_combin?info=${params}`,null)
    );
}

const Axios_Get_MajorAll = async ()=>{
    return (
        await Axios.Get('/piece/base/getcategory')
    );
}

//获取热门头条
const GetHotNews_Async = async (params)=>{
    
    const response = await Axios.PostHeader(`/piece/ArticleShow/articleList?info=${params}`,null);
    
    if(response.status === 200 && response.statusText === "OK"){
        return response.data;
    }

    return null;
}

//根据类型获取课程列表
const GetCourseList_ByType_Async = async (params)=>{
    const response = await Axios.PostHeader(`/piece/CombinShow/secondaryList?info=${params}`,null);
    
    if(response.status === 200 && response.statusText === "OK"){
        return response.data;
    }

    return null;
}

//获取商品列表
const GetGoodList_Async = async (params)=>{
    const response = await Axios.PostHeader(`/piece/gooShow/gooList?info=${params}`,null);
    if(response.status === 200 && response.statusText === "OK"){
        return response.data;
    }
    return null;
}

//获取组合课程详情页
const GetCourseDetail_Async = async (params)=>{
    const response = await Axios.PostHeader(`/piece/CombinShow/combinsDetail?info=${params}`,null);
    if(response.status === 200 && response.statusText === "OK"){
        return response.data;
    }
    return null;
}

export {
    Axios_Get_IndexContent,
    Axios_Get_MajorAll,
    GetHotNews_Async,
    GetCourseList_ByType_Async,
    GetGoodList_Async,
    GetCourseDetail_Async
};