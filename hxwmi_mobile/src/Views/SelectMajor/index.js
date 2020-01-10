import './index.less';
import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import { ViewHeader } from '../../Components'
import { connect } from 'react-redux';
import { FetchMajor } from '../../Actions/Major';

const mapStateToProps = (state)=>{
    // console.log(state);
    return {
        list: state.Major.list,
        isLoading: state.Major.isLoading,
        errMsg: state.Major.errMsg
    }
}

@connect(mapStateToProps,{ FetchMajor })
@withRouter
class SelectMajor extends Component {
    constructor(props) {
        super(props);
        this.state = {
            show_page:'select_major_index',
            select_major:'0',
            select_sub_major:'0'
        }
    }
    
    componentDidMount(){
        
        this.props.FetchMajor();    //请求数据
        let id = localStorage.getItem('Major_Id');
        let subId = localStorage.getItem('SubMajor_Id');

        setTimeout(() => {
            this.setState({ 
                select_major: id,
                select_sub_major: subId,
                show_page:'select_major_index active'
            });

            if(id){
                let major_id = `major_${id}`;
                document.getElementById(major_id).scrollIntoView();
            }
        }, 10);
    }

    //选择一级专页
    click_Handler = (key)=>{
        console.log(key);
        localStorage.setItem('Major_Id',key);

        this.setState({
            select_major:key
        });

        let id = `major_${key}`;
        document.getElementById(id).scrollIntoView();
    }

    //选择二级专业
    SelectSubMajor =(key,subKey,name)=>{

        localStorage.setItem('Major_Id',key);
        localStorage.setItem('SubMajor_Id',subKey);
        localStorage.setItem('MajorName',name);
        this.setState({
            select_major: key,
            select_sub_major: subKey
        });

        this.GotoIndex();
    }

    //跳转到首页
    GotoIndex = ()=>{
        this.setState({ show_page:'select_major_index' });
        setTimeout(()=>{
            this.props.history.push('/index');
        },685);
    }

    render() {
        const { list } = this.props;
        let firstList = null, lastList = null;

        firstList = list && list.map((item)=>{
            return (
                <div 
                    key={item.id}
                    className={ this.state.select_major === `${item.id}` ? "major_left_item active":"major_left_item"}
                    onClick={ ()=>{
                        this.click_Handler(`${item.id}`);
                    }}
                ><em>{ item.name }</em></div>
            );
        });

        lastList = list && list.map((item)=>{
            return (
                <div className="major_right_item" key={item.id}>
                    <div className="major_title" id={ `major_${ item.id }`}>{ item.name }</div>
                        <div className="major_content">
                            {
                                item.subjects.map(subItem => {
                                    let str = this.state.select_sub_major === `${subItem.id}`  ? "major_sub_item active":'major_sub_item';
                                    if(subItem.is_hot === 1){
                                        str+=" hot";
                                    }
                                    return (
                                        <div 
                                            key={subItem.id}
                                            className={ str }
                                            onClick={()=>{
                                                this.SelectSubMajor(`${item.id}`,`${subItem.id}`,subItem.name)
                                            }}
                                        >{ subItem.name }</div>
                                    )
                                })
                            }
                        </div>
                </div>
            );
        });

        return (
            <div className={this.state.show_page}>
                <ViewHeader title="选择专业" onClick={ this.GotoIndex } />

                <div className="select_major">

                    <div className="major_left">
                        {firstList}
                    </div>

                    <div className="major_right">
                        {lastList}
                    </div>

                </div>
            </div>
        )
    }
}

export default SelectMajor;