import React, { useEffect, useState } from 'react';
import './Header.css';
import NewsTabItem from './NewsTabItem/NewsTabItem';
import { useDispatch, useSelector } from 'react-redux';
import { fetchNews } from '../../redux/news/newsSlice';
import { apiKeyList } from '../../key';
import Search from './Search/Search';
import Filters from './Filters/Filters';

const Header = ({
  newsTabSources,
  setNewsTab,
  newsTab
}) => {
  
  return (
    <div className='header-wrapper'>
        <h1 className='header-text'>NewsCorp.</h1>
        <div className='search-filter-section'>
          <Search newsTab={newsTab} />
          <div className='filter-source-wrapper'>
            <Filters />
          <div className='news-tab'>
              {newsTabSources?.map((newsItem) => 
               <NewsTabItem data={newsItem} isActive={newsTab === newsItem?.id} 
               setNewsTab={setNewsTab}
               />
              )}
          </div>
          </div>
        
        </div>
    </div>
  )
}

export default Header