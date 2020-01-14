import React, { Component } from 'react'
import './index.less';
import icon_phone_code from './images/icon_phone_code.png';
import icon_pwd from './images/icon_pwd.png';
import icon_logo_wmyx from './images/icon_logo_wmyx.png';
import icon_nick_name from './images/icon_nick_name.png';
import icon_key from './images/icon_key.png';
import { Icon, Toast } from 'antd-mobile';
import { SendSmsCode_Async, Register_Async, } from '../../Services';

class Register extends Component {

    constructor(props) {
        super(props);
        this.state ={
            phoneCode:'',
            pwd:'',
            nickName:'',
            verificationCode:'',
            invite_id: '',
            countDown:false,
            timeSecond:60
        }
    }

    GotoIndex =()=>{

    }
    
    //输入手机号
    ChangePhone_Handler = (e)=>{
        this.setState({
            phoneCode: e.target.value
        });
    }
    //输入密码
    ChangePwd_Handler = (e)=>{
        this.setState({
            pwd: e.target.value
        });
    }
    //输入昵称
    ChangeNickName_Handler = (e)=>{
        this.setState({
            nickName: e.target.value
        });
    }
    //输入验证码
    ChangeValidateCode_Handler =(e)=>{
        this.setState({
            verificationCode: e.target.value
        });
    }
    //邀请码
    ChangeTnviteId_Handler = (e) =>{
        this.setState({
            invite_id: e.target.value
        });
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
    //用户注册
    UserRegister_Async = async ()=>{

        let params = {
            username: this.state.phoneCode,
            password: this.state.pwd,
            nickname: this.state.nickName,
            equip:'',
            verificationCode: this.state.verificationCode,
            invite_id: this.state.invite_id,
        }

        if(!(/^1[3456789]\d{9}$/.test(params.username))){   //验证手机号

            Toast.fail('手机号码有误，请重填', 2, () => {});
            return false;
            
        }else if(!params.passwordOrSms){    //验证密码

            Toast.fail('您的密码还没有填写', 2, () => {});
            return false;

        }else if (!params.nickname){    //验证昵称
            Toast.fail('您的昵称还没有填写', 2, () => {});
            return false;

        }else if (!params.verificationCode){

            Toast.fail('请填写验证码', 2, () => {});
            return false;
            
        }else{
            let res = await Register_Async(JSON.stringify(params));
            console.log(res);

            if(res && res.code === "200"){
                this.props.history.push('/login');
            }
            
            return true;
        }
    }

    render() {
        return (
            <div className="register_index">
                
                <div className="register_view_header">
                    <div className="register_view_header_icon">
                        <Icon type={"left"} color="#fff" onClick={ this.GotoIndex }></Icon>
                    </div>
                    <div className="register_view_header_title">新用户注册</div>
                </div>

                <div className="register_view_body">

                    <div className="register_logo">
                        <img src={icon_logo_wmyx} alt=""/>
                    </div>

                    {/* 手机号 */}
                    <div className="inputbox">
                        <div className="input_icon"><img src={icon_phone_code} alt=""/></div>
                        <input 
                            type="number" 
                            placeholder="请输入您的手机号" 
                            autoComplete="off"
                            value={ this.state.phoneCode }
                            onChange ={ this.ChangePhone_Handler }
                        />
                    </div>

                    {/* 密码 */}
                    <div className="inputbox">
                        <div className="input_icon"><img src={icon_pwd} alt=""/></div>
                        <input 
                            type="password" 
                            placeholder="密码" 
                            autoComplete="off"
                            value={ this.state.pwd }
                            onChange ={ this.ChangePwd_Handler }
                        />
                    </div>

                    {/* 昵称 */}
                    <div className="inputbox">
                        <div className="input_icon"><img src={icon_nick_name} alt=""/></div>
                        <input 
                            type="password" 
                            placeholder="昵称" 
                            autoComplete="off"
                            value={ this.state.nickName }
                            onChange ={ this.ChangeNickName_Handler }
                        />
                    </div>

                    {/* 验证码 */}
                    <div className="verification_code">
                        <div className="inputbox">
                            <div className="input_icon"><img src={icon_key} alt=""/></div>
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

                    {/* 邀请码 */}
                    <div className="inputbox">
                        <div className="input_icon"><img src={icon_key} alt=""/></div>
                        <input 
                            type="password" 
                            placeholder="邀请码" 
                            autoComplete="off"
                            value={ this.state.invite_id }
                            onChange ={ this.ChangeTnviteId_Handler }
                        />
                    </div>

                    {/* 注册按钮 */}
                    <div className="register_btn" onClick={ this.UserRegister_Async }>注 册</div>
                </div>
            </div>
        )
    }
}

export default Register;
