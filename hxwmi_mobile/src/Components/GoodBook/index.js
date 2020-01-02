import './index.less';
import React, { Component } from 'react';
import DividingLine from '../DividingLine';
import IndexTitle from '../IndexTitle';
import { 
    WingBlank,
} from 'antd-mobile';
import notfound from './images/notfound.png';

class GoodBook extends Component {
    render() {
        // console.log(this.props);
        const { list } = this.props;
        const bookList = list.map((item)=>{  
            return (
                <div className="good_book_list_item" key={ item.id }>
                    <img src={ item.cover || notfound } alt={ item.name } />
                    <div className="good_book_item_title">{ item.name }</div>
                    <div className="good_book_item_desc">
                        <span className="good_book_item_desc_price">￥{ item.price }</span>
                        <span className="good_book_item_desc_buy_num"> /{ item.shopper }人购买</span>
                    </div>
                </div>
            )
        })

        return (
            <div>
                <DividingLine></DividingLine>
                <WingBlank>
                    <IndexTitle Text="好书推荐" MoreUrl="/good_book" />
                </WingBlank>
                <div className="good_book_list">
                    {                
                        bookList
                    }
                </div>
            </div>
        )
    }
}

export default GoodBook;