import { createSlice } from '@reduxjs/toolkit'; // 1. slice 생성

const initialState = {
  // 2. 초기 상태 정의
  userName: localStorage.getItem('userName') || null,
  userImage: localStorage.getItem('userImage') || null,
  userToken: localStorage.getItem('userToken') || null,
  userEmail: localStorage.getItem('userEmail') || null,
};

export const authSlice = createSlice({
  // 3. slice 생성
  name: 'auth', // 4. slice 이름 정의
  initialState,
  reducers: {
    login: (state, action) => {
      // 5. reducer 정의
      state.userName = action.payload.userName; // action.payload로 전달된 값으로 상태 변경
      state.userImage = action.payload.userImage; // action.payload로 전달된 값으로 상태 변경
      state.userToken = action.payload.userToken; // action.payload로 전달된 값으로 상태 변경
      state.userEmail = action.payload.userEmail; // action.payload로 전달된 값으로 상태 변경
      localStorage.setItem('userName', action.payload.userName);
      localStorage.setItem('userImage', action.payload.userImage);
      localStorage.setItem('userToken', action.payload.userToken);
      localStorage.setItem('userEmail', action.payload.userEmail);
    },
    logout: (state) => {
      // 6. reducer 정의
      state.userName = null;
      state.userImage = null;
      state.userToken = null;
      state.userEmail = null;
      localStorage.removeItem('userName');
      localStorage.removeItem('userImage');
      localStorage.removeItem('userToken');
      localStorage.removeItem('userEmail');
    },
  },
});

// const a= {abc:1, def:2};
// console.log(a);
// const {abc,def}=a; 구조분해 할당

// export const authActions = authSlice.actions;
export const { login, logout } = authSlice.actions;
export default authSlice.reducer; // 7. export 된 함수들을 store에 등록
