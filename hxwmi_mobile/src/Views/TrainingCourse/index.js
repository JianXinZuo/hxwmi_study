import React, { Component } from 'react';
import './index.less';
import { ViewHeader } from '../../Components';
import { withRouter} from 'react-router-dom';
import { GetCourseList_ByType_Async } from '../../Services/index';
import { ViewList } from '../../Components';

@withRouter
class TrainingCourse extends Component {

    constructor(props) {
        super(props);

        this.state = {
            list:[],
            OpenPage:false,
            refreshing: true,
            isLoading: true,
        }
    }

    async componentDidMount() {
        
        setTimeout(() => {
            this.setState({
                OpenPage:true
            });
        }, 1);
        
        let list = await this.GetList_Async();
        if(list){
            this.setState({
                list: [...this.state.list, ...list.combin_List],
                refreshing: false,
                isLoading: false,
            });
        }
    }

    GoToIndex = async ()=>{
        this.setState({
            OpenPage:false
        });

        setTimeout(() => {
            this.props.history.push('/index');
        }, 690);
    }

    async GetList_Async(){  //请求数据的方法

        let subject_id = localStorage.getItem('SubMajor_Id');
        let params = {  
            "subject_id": subject_id || "557",
            "user_token": localStorage.getItem('accessToken')||'',
            "combin_type":'2'   //专题训练班
        }

        let res = await GetCourseList_ByType_Async(JSON.stringify(params));
        
        if(res && res.code === "200" && res.msg === "success"){
            return res.data;
        }
        return null;
    }

    render() {
        return (
            <div className={ this.state.OpenPage ? "common_course_index active" : "common_course_index" }>
                <ViewHeader title="专题训练班" onClick={ this.GoToIndex } />
                <ViewList list={ this.state.list } />
            </div>
        )
    }
}


export default TrainingCourse;