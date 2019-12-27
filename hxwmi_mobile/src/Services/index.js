
import { Axios } from './api_config';

const Axios_Get_IndexContent = async (params)=>{
    return (
        await Axios.PostHeader(`/piece/base/index_combin?info=${params}`,null)
    );
}

export {
    Axios_Get_IndexContent,
};