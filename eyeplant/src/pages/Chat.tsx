import React, { useState, useRef, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { ArrowLeft, Camera, Upload, Send } from 'lucide-react';
import Layout from '../components/Layout';
import { getGeminiResponse } from '../lib/gemini';

interface Message {
  role: 'user' | 'ai';
  text: string;
  image?: string;
}

const Chat: React.FC = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [messages, setMessages] = useState<Message[]>([
    { role: 'ai', text: 'How can I assist you?' }
  ]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages]);

  const handleSend = async (text: string, image?: string) => {
    if (!text && !image) return;

    const userMsg: Message = { role: 'user', text, image };
    setMessages(prev => [...prev, userMsg]);
    setInput('');
    setLoading(true);

    const response = await getGeminiResponse(text || "What is in this image?", image);
    
    setMessages(prev => [...prev, { role: 'ai', text: response }]);
    setLoading(false);
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        handleSend("", reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const triggerUpload = () => fileInputRef.current?.click();

  const title = id ? (id === '1' ? 'Disease A' : 'Disease B') : 'Chatroom';

  return (
    <Layout>
      <div style={{ display: 'flex', alignItems: 'center', gap: '15px', padding: '10px 0', borderBottom: '1px solid rgba(0,0,0,0.1)' }}>
        <button onClick={() => navigate(-1)} className="icon-btn">
          <ArrowLeft size={24} />
        </button>
        <h2 style={{ fontSize: '20px', fontWeight: 800 }}>{title}</h2>
      </div>

      <div 
        ref={scrollRef}
        style={{ 
          flex: 1, 
          overflowY: 'auto', 
          display: 'flex', 
          flexDirection: 'column', 
          padding: '20px 0',
          gap: '12px'
        }}
      >
        {messages.map((msg, index) => (
          <div key={index} style={{ display: 'flex', flexDirection: 'column', alignItems: msg.role === 'user' ? 'flex-end' : 'flex-start' }}>
            <div style={{ display: 'flex', gap: '10px', alignItems: 'flex-start' }}>
              {msg.role === 'ai' && <img src="/planty.png" alt="Planty" style={{ width: '30px' }} />}
              <div className={`chat-bubble ${msg.role}`}>
                {msg.image && <img src={msg.image} alt="Upload" style={{ width: '100%', borderRadius: '8px', marginBottom: '8px' }} />}
                {msg.text}
              </div>
            </div>
          </div>
        ))}
        {loading && <div className="chat-bubble ai">Typing...</div>}
      </div>

      <div className="chat-input-area" style={{ borderRadius: '15px', marginBottom: '10px' }}>
        <input 
          type="text" 
          className="chat-input" 
          placeholder="Ask EyePlant AI about your plant"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyPress={(e) => e.key === 'Enter' && handleSend(input)}
        />
        <button onClick={triggerUpload} className="icon-btn">
          <Camera size={20} />
        </button>
        <button onClick={triggerUpload} className="icon-btn">
          <Upload size={20} />
        </button>
        <button onClick={() => handleSend(input)} className="icon-btn">
          <Send size={20} />
        </button>
        <input 
          type="file" 
          ref={fileInputRef} 
          style={{ display: 'none' }} 
          accept="image/*" 
          onChange={handleFileChange} 
        />
      </div>
    </Layout>
  );
};

export default Chat;
