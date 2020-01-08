import React, { Component } from 'react';
import './index.less';
import notfound from './images/notfound.png';
import icon_user from './images/icon_user.png';
import { withRouter } from 'react-router-dom';

@withRouter
class ViewList extends Component {

    constructor(props) {
        super(props);
    }

    GoToCourseDetail =(id)=>{
        console.log('111',id);
        if(id){
            const url = (`/course_detail/${id}/1`);
            this.props.history.push(url);
        }
    }

    render() {
        const { list } = this.props;
        const rows = list.map((item)=>{
            return (
                <div className="common_course_item" key={item.id} onClick={()=>{ this.GoToCourseDetail(item.id) }}>
                        <div className="common_course_item_left">
                            <img src={ item.cover } alt={ item.name }/>
                        </div>
                        <div className="common_course_item_right">
                            <div className="course_item_name">{ item.name }</div>
                            <div className="course_item_online_number">
                                {
                                    item.show_type !== 1 ? (<span className="teacher">{ item.teacher}</span>):null
                                }
                                <div className="icon_user">
                                    <img src={icon_user} alt="" style={{ width:'1rem'}}/> { item.studyCount }在学
                                </div> 
                                
                            </div>
                            {
                                item.charge === 0 
                                ?
                                (<div className="free">免费</div>):(<div className="price">￥{item.price}</div>) 
                            }
                        </div>
                </div>
            )
        });
        return (
            <div className="common_course_listview">
                {
                    (!list || list.length === 0) 
                    ?
                    (<div className="common_course_notfound">
                        <img src={ notfound } alt="暂无数据"/>
                    </div>)
                    :
                    rows
                }
            </div>
        )
    }
}


export default ViewList;