import React, { Component } from 'react'
import {Result} from 'antd-mobile';
import notfound from './images/notfound.png';

const myImg = src => <img src={src} className="spe am-icon am-icon-md" alt="" />;
class NotFound extends Component {
    render() {
        return (
            <div>
                <Result
                    img={myImg(notfound)}
                    title="404"
                    message="对不起，您访问的页面不存在。"
                />
            </div>
        )
    }
}

export default NotFound;
