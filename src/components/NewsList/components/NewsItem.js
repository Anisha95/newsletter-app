import React from 'react';
import './NewsItem.css';

const NewsItem = ({
    itemData
}) => {
  return (
    <div className='news-item-wrapper' onClick={() => itemData?.url && window.open(itemData?.url)}>
       {itemData?.urlToImage && <img src={itemData?.urlToImage} className='img-space' />}
        <h3 >{itemData?.title}</h3>
        {itemData?.url && <p>Click to know more</p>}
        <p className='desc-space'>{itemData?.description}</p>
        <div className='author-space'><b>{`${itemData?.type ? 'Type:' : 'Author:'}`}</b> {itemData?.type ? itemData?.type : itemData?.author || 'Unknown'}</div>
    </div>
  )
}

export default NewsItem