import React, { useEffect, useState } from 'react';
import { GoogleLogin } from '@react-oauth/google';
import { jwtDecode } from 'jwt-decode';
import { useDispatch, useSelector } from 'react-redux';
import { login, logout } from '../redux/slices/authSlice';

const Navbar = () => {
  const dispatch = useDispatch();
  const userInfo = useSelector((state) => state.auth); // useSelector로 state.auth를 가져옴, auth: store.js에서 등록한 reducer 객체요소의 키

  const [isAuth, setIsAuth] = useState(!userInfo); // userInfo가 없는 상태 초기화

  useEffect(() => {
    const storedName = localStorage.getItem('userName');
    const storedImage = localStorage.getItem('userImage');
    const storedToken = localStorage.getItem('userToken');
    const storedEmail = localStorage.getItem('userEmail');

    if (storedToken) {
      dispatch(
        login({
          userName: storedName,
          userImage: storedImage,
          userToken: storedToken,
          userEmail: storedEmail,
        })
      );
      setIsAuth(true);
    }
  }, [dispatch]);

  const handleLoginSuccess = (credentialResponse) => {
    const userData = jwtDecode(credentialResponse.credential);
    // console.log(userData);
    // userData.jti

    dispatch(
      login({
        userName: userData.given_name,
        userImage: userData.picture,
        userToken: credentialResponse.credential,
        userEmail: userData.email,
      })
    );
    setIsAuth(true);
  };

  if (window.google) {
    window.google.accounts.id.initialize({
      client_id: process.env.REACT_APP_AUTH_CLIENT_ID,
      callback: handleLoginSuccess,
    });
  }

  const handleLogin = () => {
    window.google.accounts.id.prompt();
  };

  const handleLogout = () => {
    dispatch(logout());
    setIsAuth(false);
  };

  localStorage.removeItem('token');
  return (
    <div className="navi">
      {/* <GoogleLogin
        onSuccess={handleLoginSuccess}
        onError={() => {
          console.log('Login Failed');
        }}
      /> */}

      {userInfo.userToken ? (
        <div>
          <h2>{userInfo.userName}님 로그인</h2>
          <button onClick={handleLogout}>LOGOUT</button>
        </div>
      ) : (
        <div>
          <h2>로그인이 필요합니다.</h2>
          <button onClick={handleLogin}>LOGIN</button>
        </div>
      )}
    </div>
  );
};

export default Navbar;

//   (credentialResponse) => {
//   const userInfo = jwtDecode(credentialResponse.credential);
//   // console.log(credentialResponse);
//   console.log(userInfo.jti);
//   console.log(userInfo.email);
//   console.log(userInfo.given_name);
//   console.log(userInfo.picture);
// }
