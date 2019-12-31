import React, { Component } from 'react';
import './index.less';
import { withRouter } from 'react-router-dom';
import { 
    WingBlank,
    Carousel,
    WhiteSpace,
    Icon
} from 'antd-mobile';

@withRouter
class HotNews extends Component {
    
    constructor(props) {
        super(props);
    }
    
    click_Handler =(e)=>{
        console.log(e);
    }

    //热门头条：跳转到更多页面
    GotoMoreIndex = (e)=>{
        this.props.history.push('/hotnews');
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
                            <a onClick={ this.GotoMoreIndex }>
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