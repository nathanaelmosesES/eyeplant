import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Layout from '../components/Layout';

const slides = [
  {
    text: "Hi I'm PlantyAI",
    image: "/planty.png"
  },
  {
    text: "EyePlant is an AI-powered app that helps you diagnose plant health, detect diseases, and provide expert-backed care tips in real time.",
    image: "/planty.png"
  },
  {
    text: "With a database of 10000 plant species and some common diseases, EyePlant ensures accurate identification and tailored recommendations. Studies show that over 80% of houseplant deaths are due to improper care—",
    image: "/planty.png"
  },
  {
    text: "EyePlant eliminates the guesswork, making plant care effortless. Just snap a photo, and let our AI do the rest. Say goodbye to struggling plants and hello to a thriving green space! ✨",
    image: "/planty.png"
  }
];

const Onboarding: React.FC = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const navigate = useNavigate();

  const handleNext = () => {
    if (currentSlide < slides.length - 1) {
      setCurrentSlide(currentSlide + 1);
    } else {
      navigate('/home');
    }
  };

  return (
    <Layout>
      <div style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', textAlign: 'center', padding: '0 20px' }}>
        <div style={{ 
          position: 'relative', 
          background: '#B8E492', 
          padding: '20px', 
          borderRadius: '20px', 
          marginBottom: '40px',
          maxWidth: '300px',
          boxShadow: '0 4px 6px rgba(0,0,0,0.05)'
        }}>
          <p style={{ fontSize: '14px', fontWeight: 600, color: '#2C5F2D', lineHeight: 1.5 }}>
            {slides[currentSlide].text}
          </p>
          <div style={{
            position: 'absolute',
            bottom: '-10px',
            right: '20px',
            width: '20px',
            height: '20px',
            background: '#B8E492',
            transform: 'rotate(45deg)'
          }}></div>
        </div>

        <img 
          src={slides[currentSlide].image} 
          alt="Planty AI" 
          style={{ width: '180px', height: 'auto', marginBottom: '60px' }} 
        />

        <button 
          onClick={handleNext} 
          className="btn btn-primary" 
          style={{ width: '180px' }}
        >
          {currentSlide === slides.length - 1 ? "Start" : "Next"}
        </button>
      </div>
    </Layout>
  );
};

export default Onboarding;
