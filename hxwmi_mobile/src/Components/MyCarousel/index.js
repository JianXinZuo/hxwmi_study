import React, { Component } from 'react';
import { 
    WingBlank,
    WhiteSpace,
    Carousel 
} from 'antd-mobile';

class MyCarousel extends Component {
    constructor(props) {
        super(props);
        this.state = {
            imgHeight: 176,
        }
    }

    componentDidMount(){
        
    }
    
    render() {
        return (
            <div>
                <WingBlank>
                    <WhiteSpace/>
                    <WhiteSpace/>
                    <Carousel
                        autoplay={true}
                        infinite
                    >
                        {
                            
                            this.props.list.map(item => (
                                <a
                                    key={ item.id } 
                                    href={ item.article_url }
                                    style={{ display: 'inline-block', width: '100%', height: this.state.imgHeight }}
                                >
                                    <img
                                        src={ item.file_path }
                                        alt={ item.article_author }
                                        style={{ width: '100%', verticalAlign: 'top', borderRadius:"6px" }}
                                        onLoad={() => {
                                        // fire window resize event to change height
                                            window.dispatchEvent(new Event('resize'));
                                            this.setState({ imgHeight: 'auto' });
                                        }}
                                    />
                                </a>
                            ))
                        }
                    </Carousel>
                </WingBlank>
            </div>
        )
    }
}


export default MyCarousel