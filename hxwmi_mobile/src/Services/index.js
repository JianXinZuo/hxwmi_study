
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

const GetHotNews_Async = async (params)=>{
    
    const response = await Axios.PostHeader(`/piece/ArticleShow/articleList?info=${params}`,null);
    
    if(response.status === 200 && response.statusText === "OK"){
        return response.data;
    }

    return null;
}

export {
    Axios_Get_IndexContent,
    Axios_Get_MajorAll,
    GetHotNews_Async
};