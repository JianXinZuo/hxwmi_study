import React, { Component } from 'react';
import DividingLine from '../DividingLine';
import IndexTitle from '../IndexTitle';
import { 
    WingBlank,
} from 'antd-mobile';
import CourseList from '../CourseList';

class TrainingCourse extends Component {

    constructor(props) {
        super(props);
        
    }
    
    render() {
        // console.log(this.props);
        return (
            <div>
                <DividingLine></DividingLine>
                <WingBlank>
                    <IndexTitle Text="专题训练班" />
                </WingBlank>
                <CourseList list={this.props.list}/>
            </div>
        )
    }
}

export default TrainingCourse;