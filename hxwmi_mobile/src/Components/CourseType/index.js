import React, { Component } from 'react';
import { Route, Switch, Redirect, withRouter } from 'react-router-dom';
import './index.less';
import {
    WhiteSpace,
    Grid,
} from 'antd-mobile';
import icon_public_course from './images/icon_public_course.png';
import icon_live from './images/icon_live.png';
import icon_system_course from './images/icon_system_course.png';
import icon_training_course from './images/icon_training_course.png';
import icon_questions from './images/icon_questions.png';
import icon_good_book from './images/icon_good_book.png';
import icon_listen_book from './images/icon_listen_book.png';
import icon_e_book from './images/icon_e_book.png';

@withRouter
class CourseType extends Component {

    constructor(props) {
        super(props);
        this.state = {
            data: [
                {
                    text: '公开课',
                    icon: icon_public_course,
                    url:'/public_course'
                },
                {
                    text:'专题班',
                    icon:icon_training_course,
                    url:'/training_course'
                },
                {
                    text: '系统班',
                    icon: icon_system_course,
                    url:'/system_course'
                },
                {
                    text: '直播课',
                    icon: icon_live,
                    url:'/live_course'
                },
                {
                    text: '必刷题库',
                    icon: icon_questions,
                    url:'/PublicCourse'
                },
                {
                    text: '必过好书',
                    icon: icon_good_book,
                    url:'/PublicCourse'
                },
                {
                    text: '天天听书',
                    icon: icon_listen_book,
                    url:'/PublicCourse'
                },
                {
                    text: '电子书',
                    icon: icon_e_book,
                    url:'/PublicCourse'
                },
            ]
        }
    }

    //跳转页面
    click_Handler = (item)=>{
        console.log(item);
        this.props.history.push(item.url);
    }

    render() {
        return (
            <div className="course_type">
                <Grid
                    data={ this.state.data }
                    columnNum={5}
                    isCarousel={true}
                    hasLine={false}
                    carouselMaxRow={1}
                    onClick={ this.click_Handler } 
                />
                <WhiteSpace/>
            </div>
        )
    }
}

export default CourseType;