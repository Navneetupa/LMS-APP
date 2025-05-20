import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const AuthComponent = () => {
  const [isLogin, setIsLogin] = useState(true); // State to toggle between Login and Register

  const toggleForm = () => {
    setIsLogin(!isLogin);
  };

  return (
    <div className="flex min-h-screen font-sans">
      {/* Left Section - Hidden on mobile */}
      <div
        className="hidden sm:flex w-full sm:w-1/2 bg-cover bg-center rounded-r-3xl text-white flex-col justify-center p-10"
        style={{ backgroundImage: "url('https://cdn.pixabay.com/photo/2018/09/10/12/19/school-3666924_1280.jpg')" }}
      >
        <h1 className="text-4xl font-bold mb-4">Empower your learning journey</h1>
        <p className="text-lg">Unlock new skills, anytime, anywhere</p>
      </div>

      {/* Right Section - Full width on mobile */}
      <div className="w-full sm:w-1/2 flex flex-col justify-center items-center bg-gray-100 p-6 sm:p-10">
        <h2 className="text-2xl font-semibold mb-2 text-center">Welcome back to LMS!</h2>

        {/* Tabs */}
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

        <p className="text-gray-600 mb-6 text-center">
          {isLogin
            ? 'Sign in to continue your learning journey.'
            : 'Create an account to start your learning journey.'}
        </p>

        {/* Form */}
        <div className="w-full max-w-sm">
          {isLogin ? (
            // Login Form
            <>
              <div className="mb-4">
                <label className="block text-gray-700 mb-2">User name</label>
                <input
                  type="text"
                  placeholder="Enter your User name"
                  className="w-full p-3 border border-teal-500 rounded-md focus:outline-none focus:ring-2 focus:ring-teal-500"
                />
              </div>
              <div className="mb-4">
                <label className="block text-gray-700 mb-2">Password</label>
                <input
                  type="password"
                  placeholder="Enter your Password"
                  className="w-full p-3 border border-teal-500 rounded-md focus:outline-none focus:ring-2 focus:ring-teal-500"
                />
              </div>
              <div className="flex justify-between items-center mb-6">
                <label className="flex items-center">
                  <input type="checkbox" className="mr-2" />
                  <span className="text-gray-600">Remember me</span>
                </label>
                <a href="#" className="text-teal-500 hover:underline">
                  Forget Password?
                </a>
                
              </div>
              <Link to={"/"}> <button className="w-full py-3 mb-5 bg-teal-500 text-white rounded-md hover:bg-teal-600">
                Login
              </button>
              </Link>
              <a href="https://adminn-lms.netlify.app/" className="text-teal-500 py-2 hover:underline">
                  Login as Admin
                </a> <br></br>
                <a href="https://lmsinstructor.vercel.app/" className="text-teal-500 py-2  hover:underline">
                  Login as Instructor
                </a>
              
            </>
          ) : (
            // Register Form
            <>
              <div className="mb-4">
                <label className="block text-gray-700 mb-2">Full Name</label>
                <input
                  type="text"
                  placeholder="Enter your Full Name"
                  className="w-full p-3 border border-teal-500 rounded-md focus:outline-none focus:ring-2 focus:ring-teal-500"
                />
              </div>
              <div className="mb-4">
                <label className="block text-gray-700 mb-2">Email</label>
                <input
                  type="email"
                  placeholder="Enter your Email"
                  className="w-full p-3 border border-teal-500 rounded-md focus:outline-none focus:ring-2 focus:ring-teal-500"
                />
              </div>
              <div className="mb-4">
                <label className="block text-gray-700 mb-2">Password</label>
                <input
                  type="password"
                  placeholder="Create a Password"
                  className="w-full p-3 border border-teal-500 rounded-md focus:outline-none focus:ring-2 focus:ring-teal-500"
                />
              </div>
              <button className="w-full py-3 bg-teal-500 text-white rounded-md hover:bg-teal-600">
                Register
              </button>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default AuthComponent;