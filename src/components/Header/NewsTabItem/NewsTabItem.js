import React from 'react';
import './NewsTabItem.css';

const NewsTabItem = ({
  data,
  setNewsTab,
  isActive
}) => {
  return (
    <div className={`news-tab-item ${isActive && 'active-tab'}`}
    onClick={() => setNewsTab(data?.id)}
    >{data?.name}</div>
  )
}

export default NewsTabItem