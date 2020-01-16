import React, { Component } from 'react';
import './index.less';
import icon_logo_wmyx from './images/icon_logo_wmyx.png';
import icon_pwd from './images/icon_pwd.png';
import icon_username from './images/icon_username.png';
import { Login_Async,SendSmsCode_Async } from '../../Services';
import { withRouter } from 'react-router-dom';
import {Icon, Toast } from 'antd-mobile';

@withRouter
class Login extends Component {

    constructor(props) {
        super(props);
        this.state = {
            tabIndex:0,
            username:'',
            pwd:'',
            phoneCode:'',
            verificationCode:'',
            countDown:false,
            timeSecond:60,
        }
    }

    async componentDidMount(){

    }

    //普通登录的方法
    Login_Async =async ()=>{
        
        let params = {
            username: this.state.username,
            passwordOrSms: this.state.pwd,
            type:'1'  //type = 1时为密码 ；type = 2时为验证码
        }

        if(!params.username || !params.passwordOrSms){
            Toast.fail('请输入账号密码', 2, () => {});
            return;
        }

        let res = await Login_Async(JSON.stringify(params));

        console.log(res);
        if(res.code === "200" && res.msg ==="success"){
            localStorage.setItem('accessToken',res.data.token);
            localStorage.setItem('UserInfo', JSON.stringify(res.data));
            this.props.history.push('/index');
        
        }else{
            Toast.fail(res.msg, 2, () => {});
        }
    }

    //手机号登录方法
    LoginByPhone_Async = async ()=>{
        let params = {
            username: this.state.phoneCode,
            passwordOrSms:this.state.verificationCode,
            type:'2'        //type = 1时为密码 ；type = 2时为验证码
        }

        //验证手机号
        if(/^1[3456789]\d{9}$/.test(params.username) && params.passwordOrSms){

            let res = await Login_Async(JSON.stringify(params));
            console.log(res);
            return res;
            
        }else{
            Toast.fail('手机号码有误，请重填', 2, () => {});
            return false;
        }
    }

    //输入账号
    ChangeUserName_Handler = (e)=>{
        this.setState({
            username: e.target.value
        });
    }
    
    //输入密码
    ChangePwd_Handler = (e)=>{
        this.setState({
            pwd: e.target.value
        });
    }

    //输入手机号
    ChangePhone_Handler = (e)=>{
        this.setState({
            phoneCode: e.target.value
        });
    }

    //输入验证码
    ChangeValidateCode_Handler =(e)=>{
        this.setState({
            verificationCode: e.target.value
        });
    }

    //忘记密码跳转的方法
    GotoForgetPwd = ()=>{
        console.log('忘记密码？');
    }

    //发送短信验证码
    SendCode = async ()=>{
        let params = {
            phone:this.state.phoneCode
        };

        if(/^1[3456789]\d{9}$/.test(params.phone)){
            let res = await SendSmsCode_Async(JSON.stringify(params));
            console.log(res);
            return res;
        }else{
            Toast.fail('手机号码有误，请重填', 2, () => {});
            return null;
        }
    }

    //倒计时方法
    CountDownHandler = async ()=>{

        if(this.state.countDown === false){
            let res = await this.SendCode();

            if(res && res.code === "200"){
                let timer = setInterval(() => {

                    this.setState({
                        countDown: true,
                        timeSecond: this.state.timeSecond-1
                    });
        
                    if(this.state.timeSecond == 0){
                        clearInterval(timer);
                        
                        this.setState({
                            countDown:false,
                            timeSecond: 60
                        });
        
                    }
        
                }, 1000);
            } 
        }
    }

    //跳转方法
    GotoIndex = ()=>{
        console.log(this.props);
        this.props.history.goBack();
    }

    render() {
        return (
            <div className="login_index">

                {/* 头部导航条 */}
                <div className="login_view_header">
                    <div className="login_view_header_conent" style={ this.props.style }>
                        <div className="header_left">
                            <Icon type={"left"} color="#fff" onClick={ this.GotoIndex }></Icon>
                        </div>
                        <div className="header_center">登录沃米</div>
                        <div 
                            className="header_right" 
                            onClick={()=>{
                                this.props.history.push('/register');
                            }}
                        >注册</div>
                    </div>
                </div>

                <div className="login_view_body">
                    <div className="login_logo_container">
                        <img src={icon_logo_wmyx} alt=""/>
                    </div>

                    <div className="login_view_container">
                        <div className="login_tab_container">
                    
                            <div 
                                className={ this.state.tabIndex === 0 ? "login_tab_item active":"login_tab_item"}
                                onClick={()=>{
                                    this.setState({
                                        tabIndex:0
                                    })
                                }}
                            >普通登录</div>

                            <div 
                                className={ this.state.tabIndex === 1 ? "login_tab_item active":"login_tab_item"}
                                onClick={()=>{
                                    this.setState({
                                        tabIndex:1
                                    })
                                }}
                            >手机快捷登录</div>

                        </div>

                        {/* 普通登录方式 */}
                        <div 
                            className={ this.state.tabIndex === 0 ? "login_tab_content_by_user active":"login_tab_content_by_user"}
                        >

                            <div className="username">
                                <div className="input_icon"><img src={icon_username} alt=""/></div>
                                <input 
                                    type="text" 
                                    placeholder="请输入账号" 
                                    autoComplete="off"
                                    value={ this.state.username }
                                    onChange ={ this.ChangeUserName_Handler }
                                />
                            </div>

                            <div className="user_pwd">
                                <div className="input_icon"><img src={icon_pwd} alt=""/></div>
                                <input 
                                    type="password" 
                                    placeholder="请输入密码" 
                                    autoComplete="off"
                                    value={ this.state.pwd }
                                    onChange ={ this.ChangePwd_Handler }
                                />
                            </div>

                            <div className="login_btn" onClick={ this.Login_Async }>登 录</div>
                            <div className="forget_pwd" onClick={ this.GotoForgetPwd }>忘记密码?</div>
                        </div>

                        {/* 手机号登录方式 */}
                        <div 
                            className={ this.state.tabIndex === 1 ? "login_tab_content_by_phone active":"login_tab_content_by_phone"}
                        >
                            
                            <div className="username">
                                <div className="input_icon"><img src={icon_username} alt=""/></div>
                                <input 
                                    type="text" 
                                    placeholder="请输入账号" 
                                    autoComplete="off"
                                    value={ this.state.phoneCode }
                                    onChange ={ this.ChangePhone_Handler }
                                />
                            </div>

                            <div className="verification_code">
                                <div className="verification_code_input">
                                    <div className="input_icon"><img src={icon_pwd} alt=""/></div>
                                    <input 
                                        type="text" 
                                        placeholder="请验证码" 
                                        autoComplete="off"
                                        value={ this.state.verificationCode }
                                        onChange ={ this.ChangeValidateCode_Handler }
                                    />
                                </div>
                                {
                                    this.state.countDown === false?
                                        <div className="verification_code_btn" onClick={ this.CountDownHandler }>获取验证码</div>
                                    :
                                        <div className="validate_time">{ this.state.timeSecond }s</div>
                                }
                                
                            </div>
                            
                            <div className="login_btn" onClick={ this.LoginByPhone_Async }>登 录</div>
                            <div className="forget_pwd" onClick={ this.GotoForgetPwd }>忘记密码?</div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default Login;
