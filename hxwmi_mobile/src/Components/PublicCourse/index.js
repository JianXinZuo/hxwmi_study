import './index.less';
import React, { Component } from 'react';
import DividingLine from '../DividingLine';
import IndexTitle from '../IndexTitle';
import { 
    WingBlank,
} from 'antd-mobile';
import CourseItemByFree from './course_item_free';
import CourseItemByPrice from './course_item_price';

class PublicCourse extends Component {

    constructor(props) {
        super(props);
    }
    
    render() {
        // console.log(this.props);
        const { list } = this.props;
        const courseList = list.map((item)=>{
            
            if(item.charge === 0){
                return <CourseItemByFree key={ item.id } {...item } />
            }else{
                return <CourseItemByPrice key={ item.id } {...item } />
            }
        })
        return (
            <div>
                <DividingLine></DividingLine>
                <WingBlank>
                    <IndexTitle Text="公开课" />
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
