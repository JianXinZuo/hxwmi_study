import React, { Component } from 'react'

class CourseItemFree extends Component {

    constructor(props) {
        super(props);
        
    }
    
    render() {
        // console.log(this.props);
        const { id, cover, name, studyCount } = this.props;
        return (
            <div className="public_course_list_item" key={id}>
                <img src={ cover } alt={ name }/>
                <div className="course_list_item_title">{ name }</div>
                <div className="course_list_item_desc">
                    <span className="course_list_item_free">免费</span>
                    <span className="course_list_item_online_number"> /在学{ studyCount }人</span>
                </div>
            </div>
        )
    }
}

export default CourseItemFree;
