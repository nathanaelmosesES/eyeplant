import React from 'react';
import { useNavigate } from 'react-router-dom';
import Layout from '../components/Layout';

const Login: React.FC = () => {
  const navigate = useNavigate();

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    navigate('/home');
  };

  return (
    <Layout>
      <div style={{ flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
        <h1 className="title-text">Welcome Back !</h1>
        
        <div className="card">
          <form onSubmit={handleLogin}>
            <div className="input-group">
              <label>Email</label>
              <input type="email" placeholder="Type your email here" required />
            </div>
            
            <div className="input-group">
              <label>Password</label>
              <input type="password" placeholder="Type your password here" required />
            </div>
            
            <button type="submit" className="btn btn-primary">Log In</button>
          </form>
        </div>
        
        <p style={{ textAlign: 'center', marginTop: '20px', fontSize: '14px' }}>
          Don't have an account? <span onClick={() => navigate('/register')} style={{ color: '#5BA2D4', cursor: 'pointer', fontWeight: 600 }}>Sign Up</span>
        </p>

        <div className="footer-text">
          Eye on Green, Care with Precision
        </div>
      </div>
    </Layout>
  );
};

export default Login;
