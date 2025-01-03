import logo from './logo.svg';
import './App.css';
import NewsList from './components/NewsList/NewsList';
import Header from './components/Header/Header';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchGuardianCategories, fetchNews, setNewsTab } from './redux/news/newsSlice';
import { apiKeyList } from './key';

const newsTabSources = [
  {id: 'news-api', name: 'News API'},
  {id: 'the-guardians', name: 'The Guardians'}
]

function App() {

  const dispatch  = useDispatch();
  const newsState = useSelector((state) => state.news);


  useEffect(() => {
    dispatch(fetchNews({
      apiSign: newsState?.newsTab === 'news-api' ? 'newsapi-search' : 'guardian-search',
      q:  newsState?.newsTab === 'news-api' ? 'a' : '',
      newsAPIKey: apiKeyList[newsState?.newsTab],
      newsAPIParam: newsState?.newsTab === 'news-api' ? 'apiKey' : 'api-key',
      newsTab: newsState?.newsTab
    }));
    if (newsState?.newsTab === 'the-guardians') {
      dispatch(fetchGuardianCategories())
    }
  }, [newsState?.newsTab])
  

  return (
    <div className="App">
    <Header newsTabSources={newsTabSources} setNewsTab={(val) => dispatch(setNewsTab(val))} newsTab={newsState?.newsTab}  />
     <NewsList newsData={newsState?.newsList} isNewsApiLoading={newsState?.isNewsApiLoading} />
    </div>
  );
}

export default App;
