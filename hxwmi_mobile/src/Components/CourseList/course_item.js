import React, { Component } from 'react';
import notfound from './images/notfound.png';

class CourseItem extends Component {
    constructor(props) {
        super(props);
        
    }
    
    render() {
        // console.log(this.props);
        const { id, cover, name, studyCount, charge }= this.props.course;
        let desc = null;

        if(charge === 1){
            desc = <span className="course_list_item_price">￥{ this.props.course.price }</span>
        }else{
            desc = <span className="course_list_item_free">免费</span>
        }

        return (
            <div className="course_list_item" key={id} onClick={()=>{
                this.props.onClick(id);
            }}>
                <img src={ cover|| notfound } alt={ name }/>
                <div className="course_list_item_title">{ name }</div>
                <div className="course_list_item_desc">
                    {
                        desc
                    }
                    <span className="course_list_item_online_number"> /在学{ studyCount }人</span>
                </div>
            </div>
        );
    }
}

export default CourseItem;
