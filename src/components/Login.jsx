import React, { useState } from 'react';
import bgImage from '../assets/login.png';
import logoImage from '../assets/logo.webp';
import { Mail, Lock, EyeOff, Eye, ArrowRight, UserPlus, Leaf, ArrowLeft } from 'lucide-react';

const Login = ({ onLogin, onRegisterClick, onBack }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(true);

  // Main brand color
  const brandGreen = '#3e6b36';
  const textDark = '#1a1a1a';
  const textLight = '#6b7280';
  const inputBg = '#ffffff';
  const inputBorder = '#e5e7eb';
  const panelBg = '#faf9f6';

  return (
    <div 
      className="fullscreen-login-wrapper"
      style={{
        backgroundImage: `url(${bgImage})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center 75%',
        backgroundRepeat: 'no-repeat',
        backgroundColor: '#f4f4f9',
        width: '100vw',
        height: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'flex-end',
        boxSizing: 'border-box',
        paddingRight: '6%', // Adjusted for a bit closer to edge like image
        margin: 0,
        position: 'fixed',
        top: 0,
        left: 0,
        fontFamily: '"Inter", "Segoe UI", Roboto, Helvetica, Arial, sans-serif'
      }}
    >
      <div 
        className="login-panel"
        style={{
          background: panelBg,
          borderRadius: '32px',
          padding: '32px 40px 20px 40px',
          width: '100%',
          maxWidth: '460px',
          maxHeight: '90vh',
          overflowY: 'auto',
          boxShadow: '0 20px 40px rgba(0,0,0,0.15)',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          boxSizing: 'border-box',
          scrollbarWidth: 'none', // hide scrollbar for firefox
          msOverflowStyle: 'none',  // hide scrollbar for IE 10+
        }}
      >
        <style>{`
          .login-panel::-webkit-scrollbar { display: none; }
          .custom-checkbox {
            appearance: none;
            background-color: #fff;
            margin: 0;
            font: inherit;
            color: currentColor;
            width: 1.15em;
            height: 1.15em;
            border: 1px solid ${inputBorder};
            border-radius: 4px;
            display: grid;
            place-content: center;
            cursor: pointer;
          }
          .custom-checkbox::before {
            content: "";
            width: 0.65em;
            height: 0.65em;
            transform: scale(0);
            transition: 120ms transform ease-in-out;
            box-shadow: inset 1em 1em white;
            background-color: white;
            transform-origin: center;
            clip-path: polygon(14% 44%, 0 65%, 50% 100%, 100% 16%, 80% 0%, 43% 62%);
          }
          .custom-checkbox:checked {
            background-color: ${brandGreen};
            border-color: ${brandGreen};
          }
          .custom-checkbox:checked::before {
            transform: scale(1);
          }
        `}</style>

        {/* Back Button */}
        {onBack && (
          <button 
            type="button" 
            onClick={onBack}
            style={{
              alignSelf: 'flex-start',
              display: 'flex',
              alignItems: 'center',
              gap: '6px',
              background: 'none',
              border: 'none',
              color: textLight,
              fontSize: '14px',
              fontWeight: '600',
              cursor: 'pointer',
              padding: '0',
              marginBottom: '16px',
              transition: 'color 0.2s'
            }}
            onMouseOver={(e) => e.currentTarget.style.color = brandGreen}
            onMouseOut={(e) => e.currentTarget.style.color = textLight}
          >
            <ArrowLeft size={18} />
            Back to Home
          </button>
        )}

        {/* Logo Section */}
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', marginBottom: '16px' }}>
          <img src={logoImage} alt="Feed Logo" style={{ height: '180px', objectFit: 'contain' }} />
        </div>

       

       

        {/* Form */}
        <form 
          onSubmit={(e) => { e.preventDefault(); onLogin(); }}
          style={{ width: '100%', display: 'flex', flexDirection: 'column', gap: '16px' }}
        >
          {/* Email Input */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
            <label style={{ fontSize: '13px', fontWeight: '600', color: textDark }}>Email or Phone Number</label>
            <div style={{ position: 'relative', display: 'flex', alignItems: 'center' }}>
              <div style={{ position: 'absolute', left: '14px', color: '#9ca3af', display: 'flex' }}>
                <Mail size={18} strokeWidth={2} />
              </div>
              <input 
                type="text" 
                placeholder="Enter your email or phone number" 
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                style={{
                  width: '100%',
                  padding: '12px 16px 12px 42px',
                  borderRadius: '8px',
                  border: `1px solid ${inputBorder}`,
                  background: inputBg,
                  fontSize: '14px',
                  outline: 'none',
                  boxSizing: 'border-box',
                  color: textDark,
                  transition: 'border-color 0.2s'
                }}
                onFocus={(e) => e.target.style.borderColor = brandGreen}
                onBlur={(e) => e.target.style.borderColor = inputBorder}
              />
            </div>
          </div>

          {/* Password Input */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
            <label style={{ fontSize: '13px', fontWeight: '600', color: textDark }}>Password</label>
            <div style={{ position: 'relative', display: 'flex', alignItems: 'center' }}>
              <div style={{ position: 'absolute', left: '14px', color: '#9ca3af', display: 'flex' }}>
                <Lock size={18} strokeWidth={2} />
              </div>
              <input 
                type={showPassword ? "text" : "password"} 
                placeholder="Enter your password" 
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                style={{
                  width: '100%',
                  padding: '12px 42px 12px 42px',
                  borderRadius: '8px',
                  border: `1px solid ${inputBorder}`,
                  background: inputBg,
                  fontSize: '14px',
                  outline: 'none',
                  boxSizing: 'border-box',
                  color: textDark,
                  transition: 'border-color 0.2s'
                }}
                onFocus={(e) => e.target.style.borderColor = brandGreen}
                onBlur={(e) => e.target.style.borderColor = inputBorder}
              />
              <button 
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                style={{ 
                  position: 'absolute', 
                  right: '14px', 
                  background: 'none', 
                  border: 'none', 
                  cursor: 'pointer', 
                  color: '#9ca3af',
                  display: 'flex',
                  padding: 0
                }}
              >
                {showPassword ? <Eye size={18} strokeWidth={2} /> : <EyeOff size={18} strokeWidth={2} />}
              </button>
            </div>
          </div>

          {/* Remember me & Forgot Password */}
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: '-4px' }}>
            <label style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '13px', color: textLight, cursor: 'pointer' }}>
              <input 
                type="checkbox" 
                className="custom-checkbox"
                checked={rememberMe}
                onChange={() => setRememberMe(!rememberMe)}
              />
              Remember me
            </label>
            <a href="#" style={{ fontSize: '13px', color: brandGreen, textDecoration: 'none', fontWeight: '600' }}>
              Forgot Password?
            </a>
          </div>

          {/* Login Button */}
          <button 
            type="submit"
            style={{
              width: '100%',
              padding: '14px 20px',
              borderRadius: '8px',
              border: 'none',
              background: brandGreen,
              color: 'white',
              fontSize: '16px',
              fontWeight: '600',
              cursor: 'pointer',
              marginTop: '8px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              transition: 'background 0.2s',
              boxShadow: '0 4px 12px rgba(62, 107, 54, 0.2)'
            }}
            onMouseOver={(e) => e.currentTarget.style.background = '#2c5225'}
            onMouseOut={(e) => e.currentTarget.style.background = brandGreen}
          >
            
            <span style={{ flex: 1, textAlign: 'center' }}>Login</span>
            <ArrowRight size={20} />
          </button>
        </form>

        {/* OR Divider */}
        <div style={{ display: 'flex', alignItems: 'center', width: '100%', margin: '16px 0', color: textLight, fontSize: '12px', fontWeight: '600' }}>
          <div style={{ flex: 1, height: '1px', backgroundColor: '#e5e7eb' }}></div>
          <span style={{ margin: '0 16px' }}>OR</span>
          <div style={{ flex: 1, height: '1px', backgroundColor: '#e5e7eb' }}></div>
        </div>

        {/* Registration Section */}
        <div style={{ 
          width: '100%', 
          background: '#f1f4ed', 
          borderRadius: '12px', 
          padding: '20px 24px', 
          display: 'flex', 
          flexDirection: 'column', 
          alignItems: 'center',
          gap: '12px',
          boxSizing: 'border-box'
        }}>
          <span style={{ fontSize: '14px', color: textLight }}>Don't have an account?</span>
          <button 
            type="button"
            onClick={onRegisterClick}
            style={{
              width: '100%',
              padding: '12px 20px',
              borderRadius: '8px',
              border: `1px solid ${brandGreen}`,
              background: 'transparent',
              color: brandGreen,
              fontSize: '15px',
              fontWeight: '600',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '10px',
              transition: 'all 0.2s',
            }}
            onMouseOver={(e) => {
              e.currentTarget.style.background = brandGreen;
              e.currentTarget.style.color = 'white';
            }}
            onMouseOut={(e) => {
              e.currentTarget.style.background = 'transparent';
              e.currentTarget.style.color = brandGreen;
            }}
          >
            <UserPlus size={18} />
            Register Now
          </button>
        </div>

      </div>
    </div>
  );
};

export default Login;
