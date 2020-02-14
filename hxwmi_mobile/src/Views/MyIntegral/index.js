import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import { Icon } from 'antd-mobile';
import './index.less';
import icon_integral from './images/icon_integral.png';
import { GetMyIntegral_Async } from '../../Services';
import { Toast } from 'antd-mobile';

@withRouter
class MyIntegral extends Component {

    constructor(props) {
        super(props);
        this.state ={
            OpenPage:false,
            list:[],
            user_integral:0,
            selectIndex:0,
        }
    }

    async componentDidMount(){
        setTimeout(() => {
            this.setState({
                OpenPage:true
            });
        }, 1);

        Toast.loading("Loading...", 2, ()=>{}, true);
        let res = await this.GetIntegral();
        this.setState({
            list: res.inte_list,
            user_integral: res.user_integral
        });
    }

    GetIntegral = async ()=>{
        let params ={
            user_token: localStorage.getItem('accessToken') || "",
        }
        let res = await GetMyIntegral_Async(JSON.stringify(params));
        console.log(res);
        if(res && res.code ==="200" && res.msg==="success"){
            return res.data;
        }else{
            return null
        }
    }
    
    GoToIndex =()=>{
        this.setState({
            OpenPage:false
        });

        setTimeout(() => {
            this.props.history.push('/index/home');
        }, 690);
    }

    render() {
        const { list } = this.state;

        const Integral_List = list && list.map((item)=>{
            return (
                <div
                    key={item.id}  
                    className={ this.state.selectIndex === item.id ? "my_integral_item active":"my_integral_item" }
                    onClick={
                        ()=>{
                            this.setState({
                                selectIndex:item.id
                            });
                        }
                    }>
                    <div className="integral_item">
                        <div className="integral_item_price">{item.money}元</div>
                        <div className="integral_item_num">{item.integral_pay}积分</div>
                        <div className="integral_item_give_num">
                            <img src={ icon_integral } alt=""/>
                            <span>送{ item.integral_give }积分</span>
                        </div>
                    </div>
                </div>
            )
        })

        return (
            <div  className={ this.state.OpenPage ? "my_integral_index active" : "my_integral_index" }>

                <div className="my_integral_header_view">
                    <div className="icon_header">
                        <Icon type={"left"} color="#fff" onClick={ this.GoToIndex }></Icon>
                    </div>
                    <div>
                        <span className="header_title">我的积分</span>
                    </div>
                    <div onClick={ ()=>{
                        this.props.history.push('/integral_detail');
                    }}><span>积分明细</span></div>
                </div>

                <div className="my_integral_info_view">
                    <div className="my_integral_info">
                        <div className="left_img"></div>
                        <div className="right_btn">
                            <img src={icon_integral} alt=""/>
                            <span>积分说明</span>
                        </div>
                        <div className="total_integral">总积分</div>
                        <div className="total_number">{ this.state.user_integral }</div>
                    </div>
                </div>

                <div className="my_integral_container">
                    <div className="my_integral_listview">
                    {
                        Integral_List
                    }
                    </div>
                </div>

                <div className="my_integral_Recharge">
                    <div onClick={
                        ()=>{
                            Toast.fail("暂未开通该功能！！！",2,()=>{},true);
                        }
                    }>充值</div>
                </div>
            </div>
        );
    }
} 

export default MyIntegral;
