import React from 'react';
import { useNavigate } from 'react-router-dom';
import { User, MessageSquare, Info } from 'lucide-react';
import Layout from '../components/Layout';

const Home: React.FC = () => {
  const navigate = useNavigate();

  const chatHistory = [
    { id: '1', date: '23 September 2024 / 10:00', title: 'About disease A' },
    { id: '2', date: '10 September 2024 / 12:00', title: 'About disease B' },
  ];

  return (
    <Layout>
      <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: '20px' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '15px' }}>
          <div style={{ background: 'white', padding: '10px', borderRadius: '50%' }}>
            <User size={32} color="#2C5F2D" />
          </div>
          <div>
            <p style={{ fontSize: '12px', opacity: 0.7 }}>User</p>
            <p style={{ fontSize: '20px', fontWeight: 800 }}>User 1</p>
          </div>
        </div>

        <div 
          onClick={() => navigate('/chat')}
          style={{ 
            background: '#B8E492', 
            padding: '20px', 
            borderRadius: '20px', 
            display: 'flex', 
            justifyContent: 'space-between', 
            alignItems: 'center',
            cursor: 'pointer'
          }}
        >
          <span style={{ fontWeight: 700, color: '#2C5F2D' }}>Ask PlantyAI</span>
          <img src="/planty.png" alt="Planty" style={{ width: '60px' }} />
        </div>

        <div>
          <h3 style={{ background: '#B8E492', display: 'inline-block', padding: '5px 15px', borderRadius: '10px', fontSize: '14px', marginBottom: '15px' }}>
            Chat History
          </h3>
          
          <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
            {chatHistory.map((chat) => (
              <div 
                key={chat.id}
                onClick={() => navigate(`/chat/${chat.id}`)}
                style={{ 
                  background: '#B8E492', 
                  padding: '15px', 
                  borderRadius: '15px',
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  cursor: 'pointer'
                }}
              >
                <div>
                  <p style={{ fontSize: '12px', fontWeight: 600 }}>Date/Time: {chat.date}</p>
                  <p style={{ fontSize: '12px' }}>{chat.title}</p>
                </div>
                <div style={{ display: 'flex', gap: '8px' }}>
                  <MessageSquare size={18} />
                  <Info size={18} />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Home;
