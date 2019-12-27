import React, { Component } from 'react';
import { Flex,TabBar } from 'antd-mobile';
import './MyFooter.less';
import { indexRouter } from '../../Routes';

class MyFooter extends Component {

    constructor(props) {
        super(props);
    }
    

    render() {

        const tabBarItems = indexRouter.map((item)=>{
            // console.log(item);
            return (
                <TabBar.Item
                    icon={
                        <i className={ item.defaultIcon }></i>
                        // <div style={{
                        //     width: '22px',
                        //     height: '22px',
                        //     background: 'url('+ item.defaultIcon +') center center /  21px 21px no-repeat' }}
                        // />
                    }
                    selectedIcon={
                        <i className={ item.selectedIcon }></i>
                        // <div style={{
                        //     width: '22px',
                        //     height: '22px',
                        //     background: 'url('+ item.selectedIcon +') center center /  21px 21px no-repeat' }}
                        // />
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