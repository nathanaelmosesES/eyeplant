import React from 'react';
import { useNavigate } from 'react-router-dom';
import Layout from '../components/Layout';

const Register: React.FC = () => {
  const navigate = useNavigate();

  const handleSignUp = (e: React.FormEvent) => {
    e.preventDefault();
    navigate('/onboarding');
  };

  return (
    <Layout>
      <div style={{ flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
        <h1 className="title-text">Let's create your account !</h1>
        
        <div className="card">
          <form onSubmit={handleSignUp}>
            <div className="input-group">
              <label>Username</label>
              <input type="text" placeholder="Type your username here" required />
            </div>
            
            <div className="input-group">
              <label>Email</label>
              <input type="email" placeholder="Type your email here" required />
            </div>
            
            <div className="input-group">
              <label>Password</label>
              <input type="password" placeholder="Type your password here" required />
            </div>
            
            <button type="submit" className="btn btn-primary">Sign Up</button>
          </form>
        </div>
        
        <p style={{ textAlign: 'center', marginTop: '20px', fontSize: '14px' }}>
          Already have an account? <span onClick={() => navigate('/login')} style={{ color: '#5BA2D4', cursor: 'pointer', fontWeight: 600 }}>Log In</span>
        </p>

        <div className="footer-text">
          Eye on Green, Care with Precision
        </div>
      </div>
    </Layout>
  );
};

export default Register;
