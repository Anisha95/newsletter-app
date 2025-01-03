import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchNews } from '../../../redux/news/newsSlice';
import { apiKeyList } from '../../../key';

const Search = ({newsTab}) => {
const [search, setSearch] = useState('');
const [debouncedTerm, setDebouncedTerm] = useState("");
  const dispatch  = useDispatch();
  const newsState = useSelector((state) => state.news);

  useEffect(() => {
    setSearch('')
  }, [newsTab])

  useEffect(() => {
    let timerId;
    // Set up a debounce timer
    // if (search) {
         timerId = setTimeout(() => {
            setDebouncedTerm(search);
          }, 750); // Adjust delay as needed (500ms in this case)      
    
   
    // Cleanup function to clear the timer
    return () => clearTimeout(timerId);
  }, [search]);

  useEffect(() => {
    // Trigger search API call when debouncedTerm changes
    if (debouncedTerm) {
      
        dispatch(fetchNews({
          apiSign: newsTab === 'news-api' ? newsState?.selectedOption? 'newsapi-categories-sources' : 'newsapi-search' 
          : 'guardian-search',
          q: search?.length ? search : newsTab === 'news-api' && 'a',
          newsAPIKey: apiKeyList[newsTab],
          newsAPIParam: newsTab === 'news-api' ? 'apiKey' : 'api-key',
          newsTab,
          category: newsState?.selectedOption,
          pageSize: 100
         }));
    }
  }, [debouncedTerm]);


  return (
    <div className='search-wrapper'>
              <input  
              value={search}
              placeholder={newsState?.selectedOption && newsTab === 'the-guardians' 
                ? `Search won't work for Guardian Category Section`
                :'Search with keyword'}
              className='search-input'
              onChange={(e) => {
                setSearch(e?.target?.value);
               
              }}
              disabled={newsState?.selectedOption && newsTab === 'the-guardians'}
              />
          </div>
  )
}

export default Search