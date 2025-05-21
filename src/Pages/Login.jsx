import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const AuthComponent = () => {
  const [isLogin, setIsLogin] = useState(true);

  const [registerData, setRegisterData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    password: '',
  });

  const [loginData, setLoginData] = useState({
    email: '',
    password: '',
  });

  const [showOtpPopup, setShowOtpPopup] = useState(false);
  const [otp, setOtp] = useState('');
  const [registeredEmail, setRegisteredEmail] = useState('');

  const navigate = useNavigate();

  const handleRegisterChange = (e) => {
    setRegisterData({ ...registerData, [e.target.name]: e.target.value });
  };

  const handleLoginChange = (e) => {
    setLoginData({ ...loginData, [e.target.name]: e.target.value });
  };

  const handleRegister = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post('https://lms-backend-flwq.onrender.com/api/v1/auth/register', {
        ...registerData,
        role: 'student',
      });
      alert('Registration successful! Please check your email for the OTP.');
      setRegisteredEmail(registerData.email);
      setShowOtpPopup(true); // Show OTP popup
    } catch (err) {
      alert('Registration failed: ' + (err.response?.data?.message || err.message));
    }
  };

  const handleVerifyOtp = async () => {
    try {
      await axios.post('https://lms-backend-flwq.onrender.com/api/v1/auth/verify-email', {
        email: registeredEmail,
        otp,
      });
      alert('Email verified successfully!');
      setIsLogin(true); // Switch to login
      setShowOtpPopup(false); // Hide popup
      setRegisterData({ firstName: '', lastName: '', email: '', phone: '', password: '' });
    } catch (err) {
      alert('OTP verification failed: ' + (err.response?.data?.message || err.message));
    }
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post('https://lms-backend-flwq.onrender.com/api/v1/auth/login', loginData);
      localStorage.setItem('authToken', res.data.token);
      alert('Login successful!');
      const redirectPath = localStorage.getItem('redirectAfterLogin') || '/';
      localStorage.removeItem('redirectAfterLogin');
      navigate("/");
    } catch (err) {
      alert('Login failed: ' + (err.response?.data?.message || err.message));
    }
  };

  return (
    <div className="flex min-h-screen font-sans">
      <div
        className="hidden sm:flex w-full sm:w-1/2 bg-cover bg-center rounded-r-3xl text-white flex-col justify-center p-10"
        style={{
          backgroundImage:
            "url('https://cdn.pixabay.com/photo/2018/09/10/12/19/school-3666924_1280.jpg')",
        }}
      >
        <h1 className="text-4xl font-bold mb-4">Empower your learning journey</h1>
        <p className="text-lg">Unlock new skills, anytime, anywhere</p>
      </div>

      <div className="w-full sm:w-1/2 flex flex-col justify-center items-center bg-gray-100 p-6 sm:p-10">
        <h2 className="text-2xl font-semibold mb-2 text-center">Welcome back to LMS!</h2>

        <div className="flex mb-6">
          <button
            className={`px-6 py-2 text-white rounded-l-md ${isLogin ? 'bg-teal-500' : 'bg-teal-300'}`}
            onClick={() => setIsLogin(true)}
          >
            LOGIN
          </button>
          <button
            className={`px-6 py-2 text-white rounded-r-md ${!isLogin ? 'bg-teal-500' : 'bg-teal-300'}`}
            onClick={() => setIsLogin(false)}
          >
            REGISTER
          </button>
        </div>

        <div className="w-full max-w-sm">
          {isLogin ? (
            <form onSubmit={handleLogin}>
              <div className="mb-4">
                <label className="block text-gray-700 mb-2">Email</label>
                <input
                  type="email"
                  name="email"
                  value={loginData.email}
                  onChange={handleLoginChange}
                  className="w-full p-3 border border-teal-500 rounded-md"
                  required
                />
              </div>
              <div className="mb-4">
                <label className="block text-gray-700 mb-2">Password</label>
                <input
                  type="password"
                  name="password"
                  value={loginData.password}
                  onChange={handleLoginChange}
                  className="w-full p-3 border border-teal-500 rounded-md"
                  required
                />
              </div>
              <button type="submit" className="w-full py-3 mb-5 bg-teal-500 text-white rounded-md hover:bg-teal-600">
                Login
              </button>
              <a
                href="https://adminn-lms.netlify.app/"
                target="_blank"
                rel="noopener noreferrer"
                className="block text-center text-teal-600"
              >
                Login as Admin
              </a>
              <a
                href="https://lmsinstructor.vercel.app/"
                target="_blank"
                rel="noopener noreferrer"
                className="block text-center text-teal-600 mt-1"
              >
                Login as Instructor
              </a>
            </form>
          ) : (
            <form onSubmit={handleRegister}>
              {['firstName', 'lastName', 'email', 'phone', 'password'].map((field, idx) => (
                <div className="mb-4" key={idx}>
                  <label className="block text-gray-700 mb-2 capitalize">{field}</label>
                  <input
                    type={field === 'email' ? 'email' : field === 'phone' ? 'tel' : field === 'password' ? 'password' : 'text'}
                    name={field}
                    value={registerData[field]}
                    onChange={handleRegisterChange}
                    className="w-full p-3 border border-teal-500 rounded-md"
                    required
                  />
                </div>
              ))}
              <button type="submit" className="w-full py-3 bg-teal-500 text-white rounded-md hover:bg-teal-600">
                Register
              </button>
            </form>
          )}
        </div>
      </div>

      {showOtpPopup && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
          <div className="bg-white p-6 rounded-lg shadow-lg max-w-sm w-full text-center">
            <h3 className="text-xl font-bold mb-4">Verify Your Email</h3>
            <p className="mb-4 text-gray-600">Enter the OTP sent to <strong>{registeredEmail}</strong></p>
            <input
              type="text"
              value={otp}
              onChange={(e) => setOtp(e.target.value)}
              className="w-full mb-4 p-2 border border-gray-300 rounded-md"
              placeholder="Enter OTP"
            />
            <div className="flex justify-center gap-4">
              <button
                onClick={handleVerifyOtp}
                className="bg-teal-500 text-white px-4 py-2 rounded hover:bg-teal-600"
              >
                Verify
              </button>
              <button
                onClick={() => setShowOtpPopup(false)}
                className="bg-gray-300 text-gray-800 px-4 py-2 rounded hover:bg-gray-400"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AuthComponent;
