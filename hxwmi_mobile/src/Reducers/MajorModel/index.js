import actionType from '../../Actions/ActionType';

const initState ={
    list:[
        {
            id: 101,
            name: "会计考试",
            subjects: [
                {
                    id: 557,
                    is_hot: 0,
                    name: "初级会计职称考试",
                },{
                    id: 560,
                    is_hot: 0,
                    name: "证券从业资格"
                },
            ]
        }
    ]
}

export default (state =initState, action)=>{
    switch(action.type){
        case actionType.START_FETCH_MAJOR:
            return {
                ...state,
                isLoading:true
            }
        case actionType.FETCH_MAJOR_SUCCESS:

            let res = action.payload.data;
            let result = {
                ...state,
                list:res,
                isLoading: false
            }
            
            return result;

        case actionType.FETCH_MAJOR_FAILED:
            return {
                ...state,
                isLoading: false,
                errMsg:'网络请求出错'
            }
        default:
            return state;
    }
}