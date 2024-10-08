import { createSlice } from '@reduxjs/toolkit'; // slice 생성

const initialState = {
  authData: JSON.parse(localStorage.getItem('authData')) || null, // 초기 상태 설정
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    login: (state, action) => {
      // update 상태값 변경
      state.authData = action.payload.authData;

      localStorage.setItem('authData', JSON.stringify(action.payload.authData));
    },
    logout: (state) => {
      // 상태값 비움
      state.authData = null;

      localStorage.removeItem('authData');
    },
  },
}); // slice 생성

export const { login, logout } = authSlice.actions; // action 생성
export default authSlice.reducer; // export 된 함수들을 store에 등록
