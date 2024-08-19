import React, { useCallback, useEffect, useState } from 'react';

import { jwtDecode } from 'jwt-decode';

import { useDispatch, useSelector } from 'react-redux';
import { login, logout } from '../redux/slices/authSlice';

import { navMenus } from '../utils/data';
import { Link } from 'react-router-dom';
import { FcGoogle } from 'react-icons/fc';

const Navbar = ({ menuIdx }) => {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.auth.authData);
  const { name } = user || {};

  const gooleClientId = process.env.REACT_APP_AUTH_CLIENT_ID;
  const [isAuthentication, setIsAuthentication] = useState(false);

  const handleLoginSuccess = useCallback(
    (response) => {
      const decoded = jwtDecode(response.credential); // 구글에서 받아온 값 json으로 디코딩

      dispatch(login({ authData: decoded }));
      setIsAuthentication(true);
    },
    [dispatch]
  );

  useEffect(() => {
    const storedData = JSON.parse(localStorage.getItem('authData'));

    if (storedData) {
      dispatch(login({ authData: storedData }));
      setIsAuthentication(true);
    }
  }, [dispatch]);

  useEffect(() => {
    if (window.google) {
      // 구글 아이디가 가져와 졌을 때
      window.google.accounts.id.initialize({
        // 구글 값 초기화
        client_id: gooleClientId,
        callback: handleLoginSuccess,
        use_fedcm_for_prompt: false,
      });
    }
  }, [gooleClientId, handleLoginSuccess]);

  const handleLoginClick = () => {
    window.google.accounts.id.prompt(); // 로그인 팝업 띄우기
  };

  const handleLogoutClick = () => {
    dispatch(logout());
    setIsAuthentication(false);
  };

  return (
    <nav className="navi bg-[#212121] w-1/5 h-full rounded-md border border-gray-500 py-10 px-4 flex flex-col justify-between items-center text-center">
      <div className="logo-wrapper flex w-full items-center justify-center gap-6">
        <div className="logo"></div>
        <h2 className="font-semibold">
          <Link to="/" className="font-customFontEN">
            9SEEBIRD
          </Link>
        </h2>
      </div>
      <ul className="menus">
        {navMenus.map((menu, idx) => (
          <li
            key={idx}
            className={`${
              menu.idx === menuIdx ? 'bg-gray-900' : ''
            } border border-gray-600 rounded-sm mb-1 hover:bg-gray-900 transition-all duration-200 w-full`}
          >
            <Link to={menu.to} className="flex justify-stretch items-center gap-4 py-2 px-10 rounded-sm">
              {menu.icon} {menu.label}
            </Link>
          </li>
        ))}
      </ul>

      {isAuthentication ? (
        <div className="w-4/5">
          <button
            onClick={handleLogoutClick}
            className="font-customFontKR flex justify-center items-center gap-2 bg-gray-300 text-gray-900 py-2 px-4 rounded-md w-full"
          >
            <FcGoogle className="h-5 w-5" />
            <span className="text-sm">{name}님 Logout</span>
          </button>
        </div>
      ) : (
        <div className="w-4/5">
          <button
            onClick={handleLoginClick}
            className="font-customFontKR flex justify-center items-center gap-2 bg-gray-300 text-gray-900 py-2 px-4 rounded-md w-full"
          >
            <FcGoogle className="h-5 w-5" />
            Login With Google
          </button>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
