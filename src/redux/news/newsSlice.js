import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { newsUrl } from '../apiUrl';
import { apiKeyList } from '../../key';



export const fetchNews = createAsyncThunk('fetchNews', async (payload) => {
  const apiSignature = newsUrl[payload?.apiSign] || `https://newsapi.org/v2/everything/`
  const searchQ = payload?.q;
  const newsApiKey = payload?.newsAPIKey;
  const newsAPIParam = payload?.newsAPIParam;
  const response = await fetch(`${apiSignature
    }?${searchQ ? `q=${searchQ}` : ''}&${newsAPIParam}=${newsApiKey
    }${payload?.from ? `&${payload?.newsTab === 'news-api' ? 'from' : 'from-date'}=${payload?.from}` : ''}${payload?.from ? `&${payload?.newsTab === 'news-api' ? 'to' : 'to-date'}=${payload?.to}` : 
      ''}${payload?.category ? `&category=${payload?.category}` : ''}&pageSize=${payload?.pageSize || '10'}`)
    return response.json();
})


export const fetchGuardianCategories = createAsyncThunk('fetchGuardianCategories', async () => {
  const response = await fetch(`${newsUrl['guardian-categories']}?api-key=${apiKeyList['the-guardians']}`)
    return response.json();
})
export const fetchGuardianCategoriesResult = createAsyncThunk('fetchGuardianCategoriesResult', async (payload) => {
  const response = await fetch(`${payload?.url}?api-key=${apiKeyList['the-guardians']}`)
    return response.json();
})

export const newsSlice = createSlice({
  name: 'news',
   initialState: {
    newsList: null,
    isNewsApiLoading: false,
    errMessage: null,
    newsTab: 'news-api',
    dateTo: null,
    dateFrom: null,
    guardianCategories: null,
    selectedOption: null,
  },
  reducers: {
    setNewsTab: (state, action) => ({
    ...state,
    newsTab: action.payload
    }),
    setSelectedDateRange: (state, action) => ({
      ...state,
      dateFrom: action.payload.from,
      dateTo: action.payload.to,
      }),
      setSelectedOption: (state, action) => ({
        ...state,
        selectedOption: action.payload
        }),
  },
  extraReducers: (builder) => {
    // fetchNews

    builder.addCase(fetchNews.pending, (state, action) => ({
        ...state,
        isNewsApiLoading: true
    }));
    builder.addCase(fetchNews.fulfilled , (state, action) => ({
        ...state,
        isNewsApiLoading: false,
        newsList: action.payload?.articles ? action?.payload?.articles : 
        action?.payload?.response?.results?.map((dataItem) => ({
          ...dataItem,
          title: dataItem?.webTitle,
          url: dataItem?.webUrl
        }))
    }));
    builder.addCase(fetchNews.rejected , (state, action) => ({
        ...state,
        isNewsApiLoading: false,
        errMessage: action.payload
    }));

    //fetchGuardianCategories

    builder.addCase(fetchGuardianCategories.pending, (state, action) => ({
      ...state,
      isNewsApiLoading: true
  }));
  builder.addCase(fetchGuardianCategories.fulfilled , (state, action) => ({
      ...state,
      isNewsApiLoading: false,
      guardianCategories: action.payload?.response?.results?.slice(0,25)
  }));
  builder.addCase(fetchGuardianCategories.rejected , (state, action) => ({
      ...state,
      isNewsApiLoading: false,
      errMessage: action.payload
  }));

  //fetchGuardianCategoriesResult

    builder.addCase(fetchGuardianCategoriesResult.pending, (state, action) => ({
      ...state,
      isNewsApiLoading: true
  }));
    builder.addCase(fetchGuardianCategoriesResult.fulfilled , (state, action) => ({
        ...state,
        isNewsApiLoading: false,
        newsList: action?.payload?.response?.results?.map((dataItem) => ({
          ...dataItem,
          title: dataItem?.webTitle,
          url: dataItem?.webUrl
        }))
    }));
    builder.addCase(fetchGuardianCategoriesResult.rejected , (state, action) => ({
        ...state,
        isNewsApiLoading: false,
        errMessage: action.payload
    }));

  }
})

// Action creators are generated for each case reducer function
export const { setNewsList, onGetApiLoaded , setNewsTab, setSelectedDateRange, setSelectedOption} = newsSlice.actions

export default newsSlice.reducer