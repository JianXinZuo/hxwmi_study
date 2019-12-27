import React, { Component } from 'react'

export const HocApp = (WarpComponent)=>{
    return class HocApp extends Component{
        render(){
            // console.log(this.props);
           return (
             <>
                <WarpComponent/>
                {/* <div>采用装饰器进行单元测试</div> */}
             </>
           )
        }
    }
} 
