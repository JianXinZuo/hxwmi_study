
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

export {
    Axios_Get_IndexContent,
    Axios_Get_MajorAll
};