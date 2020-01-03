import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import { Toast } from 'antd-mobile';
import { ViewHeader } from '../../Components';
import moment from 'moment';
import { GetCourseDetail_Async } from '../../Services';

@withRouter
class CourseDetail extends Component {

    constructor(props) {
        super(props);
        
        //定义分页信息
        this.pageNo = 0;
        this.dateFormat = 'YYYY-MM-DD',

        this.state = {
            list:[],
            OpenPage:false,
            refreshing: true,
            isLoading: true,
            height: document.documentElement.clientHeight,
            useBodyScroll: false,
            hasMore: true,
            is_running:false
        }
    }
    
    async componentDidMount(){
        console.log(this.props);

        Toast.loading('Loading...', 1.5, () => {
            console.log('加载完成 !!!');
        });

        setTimeout(() => {
            this.setState({
                OpenPage:true
            });
        }, 0);

        let res = await this.GetDetail_Async();
        console.log('获取的数据:', res);
    }

    async GetDetail_Async(){  //请求数据的方法

        let params = {  
            "combin_id": this.props.match.params.id || "",
            "user_token":"67e2ce3346d946e1a9ac4ede6bfd7dd7",
        }

        let res = await GetCourseDetail_Async(JSON.stringify(params));

        if(res && res.code === "200" && res.msg === "success"){
            return res.data;
        }
        
        return null;
    }

    GoToIndex = async ()=>{
        this.setState({
            OpenPage:false
        });

        setTimeout(() => {
            this.props.history.push('/index');
        }, 690);
    }

    render() {
        return (
            <div className={ this.state.OpenPage ? "course_detail_index active" : "course_detail_index" }>
                <ViewHeader title="课程详情" onClick={ this.GoToIndex } />
                课程详情页面
                
            </div>
        );
    }
}

export default CourseDetail;
