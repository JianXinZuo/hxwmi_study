import React, { Component } from 'react'

//自定义Lazy懒加载器
const MyLoaderPlugin = ({
    loader,
    loading
})=>{

    return class MyLoader extends Component {
        constructor(props) {
            super(props);
            this.state ={ LoadedComponent:null }
        }

        //按需加载
        componentDidMount(){
    
            loader()
                .then((res)=>{
                    // console.log(res);
                    this.setState({ LoadedComponent:res.default });
                })
                .catch((err)=>{
                    console.log('加载器出错：',err);
                })
        }
        
        render() {
            const { LoadedComponent } = this.state;
            const SuccessComponent = LoadedComponent ? LoadedComponent:loading;
            return (
                <SuccessComponent />
            )
        }
    }
}

export default MyLoaderPlugin;
