import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const AuthRedirect = ({ setIsLogin }) => {
  const navigate = useNavigate();

  useEffect(() => {
    const isLoggedIn = sessionStorage.getItem("isLogin");
    if (isLoggedIn === "true") {
      setIsLogin(true);
      // navigate('/dashboard');
    }else{
      setIsLogin(false)
      navigate('/')
    }
  }, [navigate, setIsLogin]);

  return null; // ⚠️ Ye component UI mein kuch return nahi karega
};

export default AuthRedirect;
