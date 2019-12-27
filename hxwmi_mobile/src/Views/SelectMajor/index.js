import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';

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
                选择专业页面
            </div>
        )
    }
}

export default SelectMajor;