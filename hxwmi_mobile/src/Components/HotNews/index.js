import React, { Component } from 'react';
import './index.less';
import { 
    WingBlank,
    Carousel,
    WhiteSpace,
    Icon
} from 'antd-mobile';


class HotNews extends Component {
    
    constructor(props) {
        super(props);
    }
    
    click_Handler =(e)=>{
        console.log(e);
    }

    render() {
        const { list } = this.props;
        
        const span_list = list.map((item)=>{

            return (
                <span className="v-item" key={item.id} 
                    onClick={ 
                        ()=>{
                            this.click_Handler(item)
                        }
                    }
                >
                    {
                        item.article_title
                    }
                </span>
            )
        });

        return (
            <div>
                <WingBlank>
                    <WhiteSpace/>
                    <div className="hot_news">
                        <span className="hot_news_title">热门头条</span>
                        <div className="hot_news_carousel">
                            <Carousel 
                                vertical
                                dots={false}
                                dragging={false}
                                swiping={false}
                                autoplay
                                infinite
                                speed={300}
                                autoplayInterval={1000}
                                resetAutoplay={false}
                            >
                            {
                                span_list
                            }
                            </Carousel>
                        </div>
                        <div className="hot_news_more">
                            <a href="">
                                <div className="hot_news_more_txt">更多</div>
                                <Icon type="right" />
                            </a>
                        </div>
                    </div>
                </WingBlank>
            </div>
        )
    }
}

export default HotNews;