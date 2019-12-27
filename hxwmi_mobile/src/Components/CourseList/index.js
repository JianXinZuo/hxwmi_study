import './index.less';
import React, { Component } from 'react';
import CourseItem from './course_item';

class CourseList extends Component {

    render() {
        const list = this.props.list.map((item)=>{
            return (
                <CourseItem key={item.id} course={item} />
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
