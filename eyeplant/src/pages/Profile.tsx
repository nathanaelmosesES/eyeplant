import React from 'react';
import { ArrowLeft, Settings, UserCircle } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import BottomNav from '../components/BottomNav';
import Layout from '../components/Layout';

const Profile: React.FC = () => {
  const navigate = useNavigate();

  return (
    <Layout>
      <div className="profile-page">
        <section className="profile-hero">
          <div className="profile-actions">
            <button className="icon-btn" onClick={() => navigate(-1)} aria-label="Back">
              <ArrowLeft size={42} strokeWidth={3} />
            </button>
            <button className="icon-btn" aria-label="Settings">
              <Settings size={28} strokeWidth={3} />
            </button>
          </div>

          <UserCircle size={92} strokeWidth={2.8} className="profile-avatar" />
          <h1>User 1</h1>
        </section>

        <main className="profile-content">
          <button className="profile-edit-btn">Edit Profile</button>

          <div className="profile-field">
            <label>Email :</label>
            <div className="profile-email">xxxyyyzz@gmail.com</div>
          </div>

          <button className="profile-logout-btn" onClick={() => navigate('/login')}>
            Log Out
          </button>
        </main>
      </div>
      <BottomNav />
    </Layout>
  );
};

export default Profile;
