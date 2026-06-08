import React from 'react';
import { ArrowLeft, Leaf, ShieldCheck, Sprout } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import BottomNav from '../components/BottomNav';
import Layout from '../components/Layout';

const plantSummary = {
  total: 24,
  healthy: 17,
  sick: 5,
  needCare: 2,
};

const statusItems = [
  { label: 'Sehat', value: plantSummary.healthy, color: '#6FCF57' },
  { label: 'Sakit', value: plantSummary.sick, color: '#E66A6A' },
  { label: 'Perlu Dicek', value: plantSummary.needCare, color: '#F2C94C' },
];

const PlantStatus: React.FC = () => {
  const navigate = useNavigate();
  const maxValue = Math.max(...statusItems.map((item) => item.value));

  return (
    <Layout>
      <div className="plant-status-page">
        <header className="page-header">
          <button className="icon-btn" onClick={() => navigate(-1)} aria-label="Back">
            <ArrowLeft size={32} strokeWidth={3} />
          </button>
          <div>
            <p>Status Tanaman</p>
            <h1>Kesehatan Saat Ini</h1>
          </div>
        </header>

        <section className="status-highlight">
          <div>
            <p>Tanaman sakit</p>
            <strong>{plantSummary.sick}</strong>
            <span>dari {plantSummary.total} tanaman</span>
          </div>
          <div className="status-highlight-icon">
            <Leaf size={54} />
          </div>
        </section>

        <section className="status-card">
          <div className="status-card-title">
            <h2>Grafik Jumlah Tanaman</h2>
            <span>Hari ini</span>
          </div>

          <div className="bar-chart">
            {statusItems.map((item) => (
              <div className="bar-row" key={item.label}>
                <div className="bar-label">{item.label}</div>
                <div className="bar-track">
                  <div
                    className="bar-fill"
                    style={{
                      width: `${(item.value / maxValue) * 100}%`,
                      backgroundColor: item.color,
                    }}
                  />
                </div>
                <strong>{item.value}</strong>
              </div>
            ))}
          </div>
        </section>

        <section className="status-grid">
          <div className="mini-status-card">
            <ShieldCheck size={24} />
            <span>{plantSummary.healthy}</span>
            <p>Tanaman sehat</p>
          </div>
          <div className="mini-status-card warning">
            <Sprout size={24} />
            <span>{plantSummary.needCare}</span>
            <p>Butuh perawatan</p>
          </div>
        </section>
      </div>
      <BottomNav />
    </Layout>
  );
};

export default PlantStatus;
