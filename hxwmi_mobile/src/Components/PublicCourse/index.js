import './index.less';
import React, { Component } from 'react';
import DividingLine from '../DividingLine';
import IndexTitle from '../IndexTitle';
import { 
    WingBlank,
} from 'antd-mobile';
import CourseItemByFree from './course_item_free';
import CourseItemByPrice from './course_item_price';
import { withRouter } from 'react-router-dom';

@withRouter
class PublicCourse extends Component {

    constructor(props) {
        super(props);
    }
    
    GoToCourseDetail =(id)=>{
        console.log('111',id);
        if(id){
            const url = (`/course_detail/${id}/1`);
            this.props.history.push(url);
        }
    }

    render() {
        // console.log(this.props);
        const { list } = this.props;
        const courseList = list.map((item)=>{
            
            if(item.charge === 0){
                return <CourseItemByFree key={ item.id } {...item }  onClick={ this.GoToCourseDetail } />
            }else{
                return <CourseItemByPrice key={ item.id } {...item } />
            }
        })
        return (
            <div>
                <DividingLine></DividingLine>
                <WingBlank>
                    <IndexTitle Text="公开课" MoreUrl="/public_course" />
                </WingBlank>
                <div className="public_course_list">
                    {
                        courseList
                    }
                </div>
            </div>
        )
    }
}

export default PublicCourse;
