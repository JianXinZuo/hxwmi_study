import React, { Component } from 'react';
import { Flex,TabBar } from 'antd-mobile';
import './MyFooter.less';
import icon_home from './Images/icon_home.png';
import icon_home_active from './Images/icon_home_active.png';
import icon_course from './Images/icon_course.png';
import iconCourseActive from './Images/iconCourseActive.png';
import icon_questions from './Images/icon_questions.png';
import icon_questions_active from './Images/icon_questions_active.png';
import icon_circle from './Images/icon_circle.png';
import icon_circle_active from './Images/icon_circle_active.png';
import icon_user from './Images/icon_user.png';
import icon_user_active from './Images/icon_user_active.png';

const bottomTabs = [
    {
        breadcrumbName:'首页',
        pathname:'/index/content',     //首页内容组件
        selectedIcon: icon_home_active,
        defaultIcon: icon_home
    },
    {
        breadcrumbName:'我的课',
        pathname:'/index/mycourse',     //我的课程
        selectedIcon: iconCourseActive,
        defaultIcon: icon_course
    },
    {
        breadcrumbName:'题库',
        pathname:'/index/questions',     //题库
        selectedIcon: icon_questions_active,
        defaultIcon: icon_questions
    },
    {
        breadcrumbName:'圈子',
        pathname:'/index/circle',     //圈子
        selectedIcon: icon_circle_active,
        defaultIcon: icon_circle
    },
    {
        breadcrumbName:'我的',
        pathname:'/index/home',     //我的
        selectedIcon: icon_user_active,
        defaultIcon: icon_user
    },
]

class MyFooter extends Component {

    constructor(props) {
        super(props);
    }
    

    render() {

        const tabBarItems = bottomTabs.map((item)=>{
            // console.log(item);
            return (
                // <div>
                    <TabBar.Item
                        icon={
                            // <i className={ item.defaultIcon }></i>
                            <div style={{
                                width: '22px',
                                height: '22px',
                                background: 'url('+ item.defaultIcon +') center center /  21px 21px no-repeat' }}
                            />
                        }
                        selectedIcon={
                            // <i className={ item.selectedIcon }></i>
                            <div style={{
                                width: '22px',
                                height: '22px',
                                background: 'url('+ item.selectedIcon +') center center /  21px 21px no-repeat' }}
                            />
                        }
                        title={ item.breadcrumbName }
                        key={ item.pathname }
                        dot={false}
                        selected={
                            this.props.selectedTab === item.pathname
                        }
                        onPress={()=>{
                            this.props.onChange(item.pathname)
                        }}
                    />
                // </div>
            );
        });

        return (
            <div className="my_footer">
                <Flex>
                    <Flex.Item>
                        <TabBar
                            unselectedTintColor="#949494"
                            tintColor="#ff8004"
                            barTintColor="white"
                            tabBarPosition="bottom"
                        >
                            {
                                tabBarItems
                            }
                        </TabBar>
                    </Flex.Item>
                </Flex>
            </div>
            
        )
    }
}


export default MyFooter;