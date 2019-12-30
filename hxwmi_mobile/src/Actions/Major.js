import ActionType from './ActionType';
import { Axios_Get_MajorAll } from '../Services';

const FetchStart = ()=>{
    return {
        type: ActionType.START_FETCH_MAJOR
    }
}

const FetchSuccess = (payload)=>{
    return {
        type: ActionType.FETCH_MAJOR_SUCCESS,
        payload
    }
}

const FetchFailed = ()=>{
    return {
        type: ActionType.FETCH_MAJOR_FAILED
    }
}

export const FetchMajor = ()=>{

    return (dispatch)=>{

        dispatch(FetchStart());

        Axios_Get_MajorAll().then((res)=>{

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