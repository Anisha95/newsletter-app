import React from 'react';
import { Spin } from "antd";
import './NewsList.css';
import NewsItem from './components/NewsItem';



const NewsList = ({
    newsData,
    isNewsApiLoading
}) => {

  return (
   
    <div className='news-list-wrapper'>
        { isNewsApiLoading ?  <Spin fullscreen size="large" /> : newsData?.map((newsItem) => {
            return <NewsItem itemData={newsItem} />
        })}
    </div>
   
  )
}

export default NewsList