import React, { Component } from 'react';
import './index.less';
import icon_avator2x from './images/icon_avator2x.png';
import icon_qrcode2x from './images/icon_qrcode2x.png';
import icon_note2x from './images/icon_note2x.png';
import icon_error2x from './images/icon_error2x.png';
import icon_like2x from './images/icon_like2x.png';
import icon_order2x from './images/icon_order2x.png';
import icon_red_packet from './images/icon_red_packet.png';
import { Icon, } from 'antd-mobile';
import icon_integral from './images/icon_integral.png';
import icon_orderByList from './images/icon_orderByList.png';
import icon_address from './images/icon_address.png';
import icon_feedback from './images/icon_feedback.png';
import icon_shared from './images/icon_shared.png';
import icon_setting from './images/icon_setting.png';
import icon_invitation from './images/icon_invitation.png';

class Home extends Component {
    render() {
        return (
            <div className="home_index">

                <div className="home_header_view">
                    <div className="icon_avator">
                        <img src={icon_avator2x} alt=""/>
                    </div>

                    <div className="home_header_view_center">
                        <div className="home_nickName">Anonymous</div>
                        <div className="home_major">默认考试：全国护士职业资格考试</div>
                    </div>

                    <div className="home_header_view_right">
                        <img src={icon_qrcode2x} alt="二维码按钮"/>
                    </div>
                </div>

                <div className="home_tab_container">
                    <div className="home_tab_box">
                        <div className="home_tab_item">
                            <img src={icon_note2x} alt="我的笔记"/>
                            <span>我的笔记</span>
                        </div>
                        <div className="home_tab_item">
                            <img src={icon_error2x} alt="我的错题"/>
                            <span>我的错题</span>
                        </div>
                        <div className="home_tab_item">
                            <img src={icon_like2x} alt="我的收藏"/>
                            <span>我的收藏</span>
                        </div>
                        <div className="home_tab_item">
                            <img src={icon_order2x} alt="我的订单"/>
                            <span>我的订单</span>
                        </div>
                    </div>
                </div>

                <div className="home_list_view">
                    <div className="home_item_view">
                        <div className="home_item_view_left">
                            <img src={icon_red_packet} alt="我的红包"/>
                        </div>
                        <div className="home_item_view_center">我的红包</div>
                        <div className="home_item_view_right">
                            <Icon type={"right"} color="#666666" onClick={ this.GotoIndex }></Icon>
                        </div>
                    </div>

                    <div className="home_item_view">
                        <div className="home_item_view_left">
                            <img src={icon_red_packet} alt="我的问答"/>
                        </div>
                        <div className="home_item_view_center">我的问答</div>
                        <div className="home_item_view_right">
                            <Icon type={"right"} color="#666666" onClick={ this.GotoIndex }></Icon>
                        </div>
                    </div>

                    <div className="home_item_view">
                        <div className="home_item_view_left">
                            <img src={icon_integral} alt="我的积分"/>
                        </div>
                        <div className="home_item_view_center">我的积分</div>
                        <div className="home_item_view_right">
                            <Icon type={"right"} color="#666666" onClick={ this.GotoIndex }></Icon>
                        </div>
                    </div>

                    <div className="home_item_view">
                        <div className="home_item_view_left">
                            <img src={icon_orderByList} alt="我的订单"/>
                        </div>
                        <div className="home_item_view_center">我的订单</div>
                        <div className="home_item_view_right">
                            <Icon type={"right"} color="#666666" onClick={ this.GotoIndex }></Icon>
                        </div>
                    </div>

                    <div className="home_item_view">
                        <div className="home_item_view_left">
                            <img src={icon_address} alt="我的地址"/>
                        </div>
                        <div className="home_item_view_center">我的地址</div>
                        <div className="home_item_view_right">
                            <Icon type={"right"} color="#666666" onClick={ this.GotoIndex }></Icon>
                        </div>
                    </div>

                    <div className="home_item_view">
                        <div className="home_item_view_left">
                            <img src={icon_feedback} alt="意见反馈"/>
                        </div>
                        <div className="home_item_view_center">意见反馈</div>
                        <div className="home_item_view_right">
                            <Icon type={"right"} color="#666666" onClick={ this.GotoIndex }></Icon>
                        </div>
                    </div>

                    <div className="home_item_view">
                        <div className="home_item_view_left">
                            <img src={icon_shared} alt="分享好友"/>
                        </div>
                        <div className="home_item_view_center">分享好友</div>
                        <div className="home_item_view_right">
                            <Icon type={"right"} color="#666666" onClick={ this.GotoIndex }></Icon>
                        </div>
                    </div>

                    <div className="home_item_view">
                        <div className="home_item_view_left">
                            <img src={icon_setting} alt="设置"/>
                        </div>
                        <div className="home_item_view_center">设置</div>
                        <div className="home_item_view_right">
                            <Icon type={"right"} color="#666666" onClick={ this.GotoIndex }></Icon>
                        </div>
                    </div>

                    <div className="home_item_view">
                        <div className="home_item_view_left">
                            <img src={icon_invitation} alt="邀请"/>
                        </div>
                        <div className="home_item_view_center">邀请</div>
                        <div className="home_item_view_right">
                            <Icon type={"right"} color="#666666" onClick={ this.GotoIndex }></Icon>
                        </div>
                    </div>

                </div>

            </div>
        )
    }
}

export default Home;

