import React, { Component } from 'react';
import { Flex, WingBlank, WhiteSpace, Icon } from 'antd-mobile';
import './myheader.less';
import { withRouter } from 'react-router-dom';

@withRouter
class MyHeader extends Component {

    constructor(props) {
        super(props);
    }

    componentDidMount(){
        let major = localStorage.getItem('major');
        document.title = `沃米易学-${major || "初级会计职称考试"}`;
    }
    
    click_Handler =()=>{
        console.log(this.props);
        this.props.history.push('/select_major');
    }

    render() {
        return (
            <div className="my_index_header_container">
                <div className="my_index_header">
                    <WhiteSpace size="lg" />

                    <WingBlank>
                        <Flex alignContent="center">
                            <Icon type={"left"} color="#ff8004" onClick={ this.click_Handler }></Icon>
                            <div className="header_title" onClick={ this.click_Handler }>初级会计职称考试</div>
                        </Flex>
                    </WingBlank>
                </div>
            </div>
        )
    }
}


export default MyHeader;