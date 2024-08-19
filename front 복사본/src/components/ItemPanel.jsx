import React from 'react';
import { useSelector } from 'react-redux';

const ItemPanel = () => {
  const userInfo = useSelector((state) => state.auth);

  console.log(userInfo);

  return (
    <div className="panel">
      {userInfo ? (
        <div>
          <h2>{userInfo.userName}님 로그인 되었습니다.</h2>
        </div>
      ) : (
        <div>
          <h2>로그인을 해주세요.</h2>
        </div>
      )}
    </div>
  );
};

export default ItemPanel;
