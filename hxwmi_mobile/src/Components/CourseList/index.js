import './index.less';
import React, { Component } from 'react';
import CourseItem from './course_item';
import { withRouter } from 'react-router-dom';

@withRouter
class CourseList extends Component {

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
        const list = this.props.list.map((item)=>{
            return (
                <CourseItem key={item.id} course={item} onClick={ this.GoToCourseDetail } />
            )
        })

        return(
            <div className="course_list">
                {list}
            </div>
        )
    }
}

export default CourseList;
