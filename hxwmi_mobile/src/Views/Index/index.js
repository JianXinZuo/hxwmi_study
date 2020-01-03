import React, { Component } from 'react'
// import { HocApp } from './../../UnitTest/index'
import { Route, Switch, Redirect, withRouter } from 'react-router-dom'
import { indexRouter } from '../../Routes';
import MyFooter from '../../Components/MyFooter';
import './index.less';

@withRouter
class Index extends Component {

    constructor(props) {
        super(props);
        this.state = {
            selectedTab: '/index/content',
            hidden: false,
            fullScreen: false,
        };
    }

    componentDidMount(){
        console.log(this.props);
    }

    onChange_SelectTab = (txt)=>{
        console.log(txt);
        
        this.setState({
            selectedTab:txt
        });

        //跳转页面
        if(txt !== this.state.selectedTab){
            console.log(this.props);
            this.props.history.push(txt);
        }
    }

    render() {
        return (
            <div>
                <div className="my_container">
                    <Switch>
                        {
                            indexRouter.map((route)=>{
                                return (
                                    <Route key={ route.pathname } path={ route.pathname } exact={ route.exact } title={ route.title || "" }
                                        render={ (routerProps) => {
                                            return <route.component { ...routerProps } />
                                        }
                                    }/>
                                )
                            })
                        }
                        <Redirect to="/index/content" from="/index" exact />
                        <Redirect to="/404" />
                    </Switch>
                </div>
                <MyFooter selectedTab={ this.state.selectedTab } onChange={ this.onChange_SelectTab } />
            </div>
        )
    }
}

export default Index;
