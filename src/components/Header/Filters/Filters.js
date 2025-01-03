import React, { useEffect } from 'react';
import './Filters.css';
import DateFilters from './components/DateFilters/DateFilters';
import { useDispatch, useSelector } from 'react-redux';
import { fetchGuardianCategoriesResult, fetchNews, setSelectedDateRange, setSelectedOption } from '../../../redux/news/newsSlice';
import { apiKeyList } from '../../../key';
import Categories from './components/Categories/Categories';
import { newsUrl } from '../../../redux/apiUrl';

const categoriesNewsApi = [
    { id: 'business', title: 'Business' },
    { id: 'entertainment', title: 'Entertainment' },
    { id: 'general', title: 'General' },
    { id: 'health', title: 'Health' },
    { id: 'science', title: 'Science' },
    { id: 'sports', title: 'Sports' },
    { id: 'technology', title: 'Technology' },
]

const Filters = () => {

    const dispatch = useDispatch();
    const newsState = useSelector((state) => state.news);
    const categoriesList = newsState?.newsTab === 'news-api' ? categoriesNewsApi
        : newsState.guardianCategories?.map((category) => ({
            ...category,
            title: category?.webTitle
        }))


    const apiCallDateFilter = (startDate, endDate) => {
        dispatch(setSelectedDateRange({
            from: startDate,
            to: endDate
        }))
        dispatch(fetchNews({
            apiSign: newsState?.newsTab === 'news-api' ? 'newsapi-search' : 'guardian-search',
            q: newsState?.newsTab === 'news-api' ? 'a' : '',
            newsAPIKey: apiKeyList[newsState?.newsTab],
            newsAPIParam: newsState?.newsTab === 'news-api' ? 'apiKey' : 'api-key',
            newsTab: newsState?.newsTab,
            from: startDate,
            to: endDate
        }));
    }

    useEffect(() => {
        dispatch(setSelectedOption(null))
      }, [newsState?.newsTab, newsState?.dateFrom])

    const apiCallCategoryFilter = (selectedCategoryId) => {
        dispatch(setSelectedOption(selectedCategoryId));
        if (newsState?.newsTab === 'news-api') {
            dispatch(fetchNews({
                apiSign: 'newsapi-categories-sources',
                q: 'a',
                newsAPIKey: apiKeyList[newsState?.newsTab],
                newsAPIParam: 'apiKey',
                newsTab: 'news-api',
                category: selectedCategoryId
            }));
        } else {
           
            const selectedCategory = categoriesList?.filter((ct) => ct?.id === selectedCategoryId);
            if (selectedCategory?.length) {
                dispatch(fetchGuardianCategoriesResult({
                    url: selectedCategory[0]?.apiUrl
                }))
            }
        }
    }

    return (
        <div className='filters-css'>
            <DateFilters onDateChangeFn={apiCallDateFilter} />
            {categoriesList?.length &&
                <Categories 
                selectedDateRange={newsState?.newsTab?.dateFrom} 
                newsTab={newsState?.newsTab} onSelectionFn={apiCallCategoryFilter} 
                dataList={categoriesList} 
                selectedOption={newsState?.selectedOption}
                />}
        </div>
    )
}

export default Filters