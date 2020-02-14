import React, { Component } from 'react';
import './index.less';
import { Grid } from 'antd-mobile';
import icon_public_course from './images/icon_public_course.png';
import icon_live from './images/icon_live.png';
import icon_system_course from './images/icon_system_course.png';
import icon_training_course from './images/icon_training_course.png';
import icon_questions from './images/icon_questions.png';
import icon_good_book from './images/icon_good_book.png';
import icon_listen_book from './images/icon_listen_book.png';
import icon_e_book from './images/icon_e_book.png';
import { withRouter } from 'react-router-dom';

const my_tabs = [
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
];

@withRouter
class Questions extends Component {

    constructor(props) {
        super(props);
        this.state = {
            list_tabs:[]
        }
    }

    componentDidMount(){

        this.setState({
            list_tabs:my_tabs
        });
    }

    //切换专业
    SwitchMaojr = ()=>{
        this.props.history.push('/select_major');
    }
    
    render() {
        const list_tabs = this.state.list_tabs;

        return (
            <div className="qustion_index">
                <div className="qustion_header_view">
                    <div className="qustion_header_view_left">
                        <div className="sub_major_item active">
                            初级会计实物
                        </div>
                        <div className="sub_major_item">
                            经济发基础
                        </div>
                        <div className="sub_major_item">
                            经济发基础
                        </div>
                    </div>
                    <div className="qustion_header_view_right">
                        <div className="qustion_switch_major" onClick={ this.SwitchMaojr }>切换专业</div>
                    </div>
                </div>

                <div className="qustion_body_view">
                    <div className="qustion_body_view_tip">
                        <div className="body_tip_left">
                            <div className="circle_tip">
                                <div className="tip_time">58天</div>
                                <div className="tip_conent">考试倒计时</div>
                            </div>
                        </div>
                        <div className="body_tip_right">
                            <div className="tip_txt">
                                你经过33 天 的学习，已经做了88 道题， 综合正确率83%
                                <br/>
                                <span>恭喜你超过80%的用户！</span>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="question_body_tabs">
                    <Grid
                        data={ list_tabs }
                        columnNum={5}
                        hasLine={false}
                        carouselMaxRow={2}
                        onClick={ this.click_Handler } 
                    />
                </div>

                <div className="">

                </div>
            </div>
        )
    }
}


export default Questions;