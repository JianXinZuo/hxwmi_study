import React, { Component } from 'react';
import './index.less';
import { connect } from 'react-redux';
import { FetchIndex } from '../../../Actions/IndexContent';
import { ListView, PullToRefresh } from 'antd-mobile';
import { MyHeader } from '../../../Components';

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

        const ds = new ListView.DataSource({
            rowHasChanged: (r1, r2) => r1 !== r2
        });

        this.state = {
            dataSource: ds,
            upLoading : false,
            pullLoading : false
        }
    }

    componentDidMount(){

        let params = {
            "subject_id":"557",
            "user_token":"67e2ce3346d946e1a9ac4ede6bfd7dd7"
        }
        
        this.props.FetchIndex(JSON.stringify(params));
        console.log(this.props);
    }

    //下拉刷新
    onRefresh = () => {
        this.setState({ pullLoading: true })
        //接口请求第一页数据,完成后将pullLoading设为false
    }

    onEndReached(){

    }
    //获取item进行展示
    renderRow = (item, i) => {
        const MyComponent= item.type;
        // console.log(item);
        return (
            <div>
                <MyComponent list={item.list} name={item.name} WhiteSpace={item.WhiteSpace}/>
            </div>
        )
    }

    render() {
        const { list } = this.props;
        let ListView = null;

        if(list && list.rows && list.rows.length >0){

            ListView = list.rows.map((item)=>{
                const MyComponent= item.type;
                const arr = item.list;

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
                <MyHeader/>
                <div className="my_index_body">
                    {/* <PullToRefresh> */}
                    {
                        ListView
                    }
                    {/* </PullToRefresh> */}
                </div>
            </div>
        )
    }
}


export default Index;