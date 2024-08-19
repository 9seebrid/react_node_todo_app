import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'; // 툴킷에서 제공하는 함수를 사용하기 위해 import
import {
  DELETE_TASKS_API_URL,
  GET_TASKS_API_URL,
  POST_TASKS_API_URL,
  UPDATE_COMPLETED_TASK_API_URL,
  UPDATE_TASK_API_URL,
} from '../../utils/apiUrl'; // api url을 가져오기 위해 import
import { getRequest, postRequest, deleteRequest, patchRequest, putRequest } from '../../utils/requestMethods'; // get request 함수를 가져오기 위해 import

// 공통된 비동기 액션 생성 로직을 별도의 함수로 분리
const getItemsFetchThunk = (actionType, apiURL) => {
  return createAsyncThunk(actionType, async (userId) => {
    // console.log(apiURL, userId);
    const fullPath = `${apiURL}/${userId}`;
    return await getRequest(fullPath);
  });
};

const postItemFetchThunk = (actionType, apiURL) => {
  return createAsyncThunk(actionType, async (postData) => {
    // console.log(postData);
    const options = {
      body: JSON.stringify(postData), // 표준 json 문자열로 변환
    };
    return await postRequest(apiURL, options);
  });
};

const deleteItemFetchThunk = (actionType, apiURL) => {
  return createAsyncThunk(actionType, async (id) => {
    // console.log(id);
    const options = {
      method: 'DELETE',
    };
    const fullPath = `${apiURL}/${id}`;
    console.log(fullPath);
    return await deleteRequest(fullPath, options);
  });
};

const updateItemFetchThunk = (actionType, apiURL) => {
  return createAsyncThunk(actionType, async (updateData) => {
    console.log(updateData);
    const options = {
      body: JSON.stringify(updateData), // 표준 json 문자열로 변환
    };
    return await putRequest(apiURL, options);
  });
};

const updateCompletedFetchThunk = (actionType, apiURL) => {
  return createAsyncThunk(actionType, async (options) => {
    // console.log(options);
    return await patchRequest(apiURL, options);
  });
};

export const fetchGetItemsData = getItemsFetchThunk('fetchGetItems', GET_TASKS_API_URL);

export const fetchPostItemData = postItemFetchThunk('fetchPostItem', POST_TASKS_API_URL);

export const fetchDeleteItemData = deleteItemFetchThunk('fetchDeleteItem', DELETE_TASKS_API_URL);

export const fetchPutItemData = updateItemFetchThunk('fetchPutItem', UPDATE_TASK_API_URL);

export const fetchUpdateCompletedData = updateCompletedFetchThunk(
  'fetchUpdateCompleted',
  UPDATE_COMPLETED_TASK_API_URL
);

const handleFulfilled = (stateKey) => (state, action) => {
  state[stateKey] = action.payload;
};

const handleRejected = (state, action) => {
  console.log('Error', action.payload);
  state.isError = true;
};

const apisSlice = createSlice({
  name: 'api',
  initialState: {
    getItemsData: null,
    postItemData: null,
    deleteItemData: null,
    updateCompletedData: null,
    updatePutData: null,
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchGetItemsData.fulfilled, handleFulfilled('getItemsData'))
      .addCase(fetchGetItemsData.rejected, handleRejected)
      .addCase(fetchPostItemData.fulfilled, handleFulfilled('postItemData'))
      .addCase(fetchPostItemData.rejected, handleRejected)
      .addCase(fetchDeleteItemData.fulfilled, handleFulfilled('deleteItemData'))
      .addCase(fetchDeleteItemData.rejected, handleRejected)
      .addCase(fetchUpdateCompletedData.fulfilled, handleFulfilled('updateCompletedData'))
      .addCase(fetchUpdateCompletedData.rejected, handleRejected)
      .addCase(fetchPutItemData.fulfilled, handleFulfilled('updatePutData'))
      .addCase(fetchPutItemData.rejected, handleRejected);
  },
});

export default apisSlice.reducer;
