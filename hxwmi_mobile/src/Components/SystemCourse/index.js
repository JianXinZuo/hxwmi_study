import React, { Component } from 'react';
import DividingLine from '../DividingLine';
import IndexTitle from '../IndexTitle';
import { 
    WingBlank,
} from 'antd-mobile';
import CourseList from '../CourseList';

class SystemCourse extends Component {
    render() {
        return (
            <div>
                <DividingLine></DividingLine>
                <WingBlank>
                    <IndexTitle Text="全程系统班" />
                </WingBlank>
                <CourseList list={this.props.list}/>
            </div>
        )
    }
}

export default SystemCourse;
