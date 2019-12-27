import ActionType from './ActionType';
import { Axios_Get_IndexContent } from '../Services';

const FetchStart = ()=>{
    return {
        type: ActionType.START_FETCH_INDEX
    }
}

const FetchSuccess = (payload)=>{
    return {
        type: ActionType.FETCH_INDEX_SUCCESS,
        payload
    }
}

const FetchFailed = ()=>{
    return {
        type: ActionType.FETCH_INDEX_FAILED
    }
}

export const FetchIndex = (params)=>{
    return (dispatch)=>{

        dispatch(FetchStart());

        Axios_Get_IndexContent(params).then((res)=>{

                if(res.status === 200 && res.statusText === "OK"){
                    
                    dispatch(
                        FetchSuccess(res.data)
                    );

                }else{
                    dispatch(FetchFailed());
                }

            }).catch((err)=>{
                console.log(err);
                dispatch(FetchFailed());
            })
    }
};