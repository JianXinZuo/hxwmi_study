import './index.less';
import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import { ViewHeader } from '../../Components'

@withRouter
class SelectMajor extends Component {
    constructor(props) {
        super(props);
    }
    
    componentDidMount(){

    }

    render() {
        console.log(this.props);

        return (
            <div>
                <ViewHeader title="选择专业" />
                <div className="select_major">
                    <div className="major_left">
                        <div className="major_left_item">会计考试</div>
                    </div>
                    <div className="major_right"></div>
                </div>
            </div>
        )
    }
}

export default SelectMajor;