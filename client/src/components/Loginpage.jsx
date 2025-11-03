import React, { useState, useEffect } from 'react';

export default function KarmicCanteenLogin() {
  const [isLoaded, setIsLoaded] = useState(false);
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    password: ''
  });

  useEffect(() => {
    setIsLoaded(true);
  }, []);

  const handleSubmit = () => {
    console.log('Login submitted:', formData);
  };

  const handleChange = (field, value) => {
    setFormData({
      ...formData,
      [field]: value
    });
  };

  return (
    <div className="min-h-screen flex items-center justify-center relative overflow-hidden" style={{ background: '#0a0a0a' }}>
      {/* Animated background particles */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-20 left-20 w-72 h-72 rounded-full opacity-20 blur-3xl animate-pulse" 
             style={{ background: 'radial-gradient(circle, #d946ef 0%, transparent 70%)' }}></div>
        <div className="absolute bottom-20 right-20 w-96 h-96 rounded-full opacity-15 blur-3xl animate-pulse" 
             style={{ background: 'radial-gradient(circle, #8b5cf6 0%, transparent 70%)', animationDelay: '1s' }}></div>
        <div className="absolute top-1/2 left-1/2 w-80 h-80 rounded-full opacity-10 blur-3xl animate-pulse" 
             style={{ background: 'radial-gradient(circle, #c026d3 0%, transparent 70%)', animationDelay: '2s' }}></div>
      </div>

      {/* Login Card */}
      <div 
        className={`relative z-10 w-full max-w-md mx-4 p-8 rounded-2xl transition-all duration-700 ${
          isLoaded ? 'opacity-100 scale-100' : 'opacity-0 scale-95'
        }`}
        style={{
          background: 'rgba(26, 26, 26, 0.7)',
          backdropFilter: 'blur(20px)',
          border: '1px solid rgba(139, 92, 246, 0.3)',
          boxShadow: '0 8px 32px rgba(217, 70, 239, 0.1)'
        }}
      >
        {/* Logo/Title */}
        <div className="text-center mb-8">
          <h1 
            className="text-4xl font-bold mb-2 bg-clip-text text-transparent"
            style={{
              backgroundImage: 'linear-gradient(45deg, #d946ef 30%, #8b5cf6 90%)',
              fontFamily: "'Poppins', sans-serif"
            }}
          >
            Karmic Canteen
          </h1>
          <p className="text-sm" style={{ color: 'rgba(255, 255, 255, 0.7)' }}>
            Welcome back! Please login to continue
          </p>
        </div>

        {/* Login Inputs */}
        <div className="space-y-5">
          {/* Full Name Input */}
          <div className="relative group">
            <input
              type="text"
              value={formData.fullName}
              onChange={(e) => handleChange('fullName', e.target.value)}
              placeholder="Full Name"
              className="w-full px-4 py-3 rounded-lg outline-none transition-all duration-300"
              style={{
                background: 'rgba(26, 26, 26, 0.5)',
                border: '1px solid rgba(139, 92, 246, 0.3)',
                color: '#ffffff',
                fontFamily: "'Inter', sans-serif"
              }}
              onFocus={(e) => {
                e.target.style.borderColor = '#8b5cf6';
                e.target.style.boxShadow = '0 0 20px rgba(139, 92, 246, 0.3)';
              }}
              onBlur={(e) => {
                e.target.style.borderColor = 'rgba(139, 92, 246, 0.3)';
                e.target.style.boxShadow = 'none';
              }}
            />
          </div>

          {/* Email Input */}
          <div className="relative group">
            <input
              type="email"
              value={formData.email}
              onChange={(e) => handleChange('email', e.target.value)}
              placeholder="Email Address"
              className="w-full px-4 py-3 rounded-lg outline-none transition-all duration-300"
              style={{
                background: 'rgba(26, 26, 26, 0.5)',
                border: '1px solid rgba(139, 92, 246, 0.3)',
                color: '#ffffff',
                fontFamily: "'Inter', sans-serif"
              }}
              onFocus={(e) => {
                e.target.style.borderColor = '#8b5cf6';
                e.target.style.boxShadow = '0 0 20px rgba(139, 92, 246, 0.3)';
              }}
              onBlur={(e) => {
                e.target.style.borderColor = 'rgba(139, 92, 246, 0.3)';
                e.target.style.boxShadow = 'none';
              }}
            />
          </div>

          {/* Password Input */}
          <div className="relative group">
            <input
              type="password"
              value={formData.password}
              onChange={(e) => handleChange('password', e.target.value)}
              placeholder="Password"
              className="w-full px-4 py-3 rounded-lg outline-none transition-all duration-300"
              style={{
                background: 'rgba(26, 26, 26, 0.5)',
                border: '1px solid rgba(139, 92, 246, 0.3)',
                color: '#ffffff',
                fontFamily: "'Inter', sans-serif"
              }}
              onFocus={(e) => {
                e.target.style.borderColor = '#8b5cf6';
                e.target.style.boxShadow = '0 0 20px rgba(139, 92, 246, 0.3)';
              }}
              onBlur={(e) => {
                e.target.style.borderColor = 'rgba(139, 92, 246, 0.3)';
                e.target.style.boxShadow = 'none';
              }}
            />
          </div>

          {/* Login Button */}
          <button
            onClick={handleSubmit}
            className="w-full py-3 rounded-lg font-semibold transition-all duration-300 transform hover:scale-105"
            style={{
              background: 'linear-gradient(45deg, #d946ef 30%, #8b5cf6 90%)',
              color: '#ffffff',
              fontFamily: "'Poppins', sans-serif",
              boxShadow: '0 4px 15px rgba(217, 70, 239, 0.3)'
            }}
            onMouseEnter={(e) => {
              e.target.style.boxShadow = '0 0 30px rgba(217, 70, 239, 0.6), 0 0 60px rgba(139, 92, 246, 0.4)';
            }}
            onMouseLeave={(e) => {
              e.target.style.boxShadow = '0 4px 15px rgba(217, 70, 239, 0.3)';
            }}
          >
            Login
          </button>
        </div>

        {/* Footer Text */}
        <p className="text-center mt-6 text-sm" style={{ color: 'rgba(255, 255, 255, 0.7)' }}>
          Don't have an account?{' '}
          <span 
            className="font-semibold cursor-pointer transition-colors duration-300"
            style={{ color: '#d946ef' }}
            onMouseEnter={(e) => e.target.style.color = '#c026d3'}
            onMouseLeave={(e) => e.target.style.color = '#d946ef'}
          >
            Sign Up
          </span>
        </p>
      </div>

      {/* Google Fonts */}
      <link href="https://fonts.googleapis.com/css2?family=Poppins:wght@400;600;700&family=Inter:wght@400;500;600&display=swap" rel="stylesheet" />
    </div>
  );
}