import React, { Component } from 'react';
import './index.less';
import { 
    WingBlank,
    WhiteSpace,
    Icon
} from 'antd-mobile';

class IndexTitle extends Component {
    constructor(props) {
        super(props);
    }
    
    render() {
        const txt = this.props.Text?this.props.Text:'公开课';

        return (
            <div className="index_title">
                <div className="index_title_text">
                    {
                        txt
                    }
                </div>
                <div className="index_title_more">
                    <a href="">
                        <div className="index_title_more_txt">更多</div>
                        <Icon type="right" color="#ff8004"/>
                    </a>
                </div>
            </div>
        )
    }
}

export default IndexTitle;
