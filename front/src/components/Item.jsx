import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { fetchDeleteItemData, fetchGetItemsData, fetchUpdateCompletedData } from '../redux/slices/apiSlice';
import { openModal } from '../redux/slices/modalSlice';

import { MdEditDocument } from 'react-icons/md';
import { FaTrash } from 'react-icons/fa';

import { toast } from 'react-toastify';

const Item = ({ task }) => {
  // task 객체를 props로 받아온다
  // console.log(task);
  const { _id, title, description, date, iscompleted, isimportant, userid } = task;
  // console.log({ title });

  const dispatch = useDispatch();

  const [isCompleted, setIsCompleted] = useState(iscompleted);

  const deleteItem = async () => {
    const confirm = window.confirm('아이템을 삭제하시겠습니까?');
    console.log(confirm);

    if (!confirm) return;

    if (!_id) {
      toast.error('잘못된 요청입니다');
      return;
    }

    try {
      await dispatch(fetchDeleteItemData(_id)).unwrap();
      toast.success('아이템이 삭제되었습니다');
      await dispatch(fetchGetItemsData(userid)).unwrap();
    } catch (error) {
      toast.error('아이템 삭제에 실패했습니다');
      console.error(error);
    }
  };

  const changeCompleted = async () => {
    // setIsCompleted(!isCompleted)을 호출하면 상태 업데이트가 비동기적으로 이루어지기 때문에, isCompleted의 값이 즉시 변경되지 않는다.
    // 따라서 updateCompletedData 객체를 생성할 때 isCompleted의 이전 값이 사용된다. 이로 인해 true/false가 한 단계씩 밀리게 된다.
    const newIsCompleted = !iscompleted;
    setIsCompleted(newIsCompleted);
    // console.log(isCompleted);
    const updateCompletedData = {
      itemId: _id,
      isCompleted: newIsCompleted,
    };

    const options = {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(updateCompletedData),
    };

    await dispatch(fetchUpdateCompletedData(options)).unwrap();
    newIsCompleted ? toast.success('완료 처리되었습니다.') : toast.success('미완료 처리되었습니다');
    await dispatch(fetchGetItemsData(userid)).unwrap();
  };

  const handleOpenModal = () => {
    dispatch(openModal({ modalType: 'update', task }));
  };

  const handleDetail = () => {
    dispatch(openModal({ modalType: 'detail', task }));
  };

  return (
    <div className="item w-1/3 h-[25vh] p-[0.25rem]">
      <div className="w-full h-full border border-gray-500 rounded-md flex flex-col py-3 px-4 justify-between bg-gray-950">
        <div className="upper">
          <h2 className="text-xl font-normal mb-3 relative pb-2 flex justify-between">
            <span className="w-full h-[1px] bg-gray-500 absolute bottom-0"></span>
            {title}
            <span
              className="text-sm py-1 px-3 border border-gray-500 rounded-dm hover:bg-gray-700 cursor-pointer"
              onClick={handleDetail}
            >
              자세히
            </span>
          </h2>

          <p style={{ whiteSpace: 'pre-wrap' }}>{description}</p>
        </div>
        <div className="lower">
          <p className="text-sm mb-1">{date}</p>
          <div className="item-footer flex justify-between">
            <div className="item-footer-left flex gap-x-2">
              {iscompleted ? (
                <button
                  className="block py-1 px-4 bg-green-400 text-sm text-white rounded-md"
                  onClick={changeCompleted}
                >
                  Completed
                </button>
              ) : (
                <button className="block py-1 px-4 bg-sky-700 text-sm text-white rounded-md" onClick={changeCompleted}>
                  InCompleted
                </button>
              )}
              {isimportant ? (
                <button className="block py-1 px-4 bg-red-400 text-sm text-white rounded-md">Important</button>
              ) : (
                ''
              )}
            </div>
            <div className="item-footer-right flex gap-x-3 items-center">
              <button>
                <MdEditDocument className="w-5 h-5" onClick={handleOpenModal} />
              </button>
              <button>
                <FaTrash className="delete" onClick={deleteItem} />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Item;
