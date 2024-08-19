import { createSlice } from '@reduxjs/toolkit'; // slice 생성

const modalSlice = createSlice({
  name: 'modal',
  initialState: {
    isOpen: false,
    modalType: 'create',
    task: null,
  },
  reducers: {
    openModal: (state, action) => {
      state.isOpen = true;
      state.modalType = action.payload.modalType;
      state.task = action.payload.task;
      // console.log(state.modalType, state.task);
    },
    closeModal: (state) => {
      state.isOpen = false;
    },
  },
}); // slice 생성

export const { openModal, closeModal } = modalSlice.actions;
export default modalSlice.reducer;
