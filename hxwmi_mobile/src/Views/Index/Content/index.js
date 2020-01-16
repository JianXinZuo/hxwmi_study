import React, { Component } from 'react';
import './index.less';
import { connect } from 'react-redux';
import { FetchIndex } from '../../../Actions/IndexContent';
import { MyHeader } from '../../../Components';
import { Toast } from 'antd-mobile';

const mapStateToProps = (state)=>{
    // console.log(state);
    return {
        list: state.IndexConent.list,
        isLoading: state.IndexConent.isLoading,
        errMsg: state.IndexConent.errMsg
    }
}

@connect(mapStateToProps,{ FetchIndex })
class Index extends Component {
    constructor(props) {
        super(props);
        this.state= {
            title:''
        }
    }

    componentDidMount (){
        Toast.loading("Loading...", 2, ()=>{}, true);
        let subject_id = localStorage.getItem('SubMajor_Id');
        let token = localStorage.getItem('accessToken');

        let params = {  
            subject_id: subject_id || "557",
            user_token: token || ""
        }
        this.props.FetchIndex(JSON.stringify(params));
    }

    MajorChange = ()=>{
        
    }

    render() {
        const { list } = this.props;
        let ListView = null;

        if(list && list.rows && list.rows.length >0){

            ListView = list.rows.map((item)=>{
                const MyComponent= item.type;

                if(item.name === 'CourseType' || item.list && item.list.length >0){
                    return (
                        <div key={item.name}>
                            <MyComponent list={item.list} name={item.name} WhiteSpace={item.WhiteSpace}/>
                        </div>
                    )
                }else{
                    return null
                }
            });
        }

        return (
            <div>
                <MyHeader title={ this.state.title }/>
                <div className="my_index_body">
                    {
                        ListView
                    }
                </div>
            </div>
        )
    }
}


export default Index;