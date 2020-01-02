import React, { Component } from 'react';
import './index.less';
import { Icon } from 'antd-mobile';
import { withRouter } from 'react-router-dom';

@withRouter
class IndexTitle extends Component {
    constructor(props) {
        super(props);
    }

    GotoIndex = ()=>{
        let url = this.props.MoreUrl;
        console.log(url);
        if(url){
            setTimeout(() => {
                this.props.history.push(url);
            }, 690);
        }
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
                    <a onClick={ this.GotoIndex }>
                        <div className="index_title_more_txt">更多</div>
                        <Icon type="right" color="#ff8004"/>
                    </a>
                </div>
            </div>
        )
    }
}

export default IndexTitle;
