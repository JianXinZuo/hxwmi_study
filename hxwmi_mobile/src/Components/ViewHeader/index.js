import './index.less';
import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import { Flex, WingBlank, WhiteSpace, Icon } from 'antd-mobile';

@withRouter
class ViewHeader extends Component {
    constructor(props) {
        super(props);
    }

    click_Handler =()=>{
        this.props.onClick();
    }
    
    render() {
        return (
            <div className="view_header">
                <div className="view_header_conent" style={ this.props.style }>
                    <Icon type={"left"} color="#000" onClick={ this.click_Handler }></Icon>
                    <div className="header_title">
                        {this.props.title}
                    </div>
                </div>
            </div>
        )
    }
}

export default ViewHeader;
